package com.v2p.swp391.payment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.response.PaymentResponse;
import com.v2p.swp391.common.api.PagedResponse;
import com.v2p.swp391.exception.ResourceNotFoundException;
import com.v2p.swp391.payment.type.ItemData;
import com.v2p.swp391.payment.type.PaymentData;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${app.api.version.v1}/payment")
public class PaymentController {
    private final PayOS payOS;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @GetMapping("/today")
    public ObjectNode getTodayDashboard() {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfYesterday = yesterday.atTime(LocalTime.MAX);

        // Lấy danh sách payments hôm nay
        List<PaymentEntity> paymentsToday = paymentRepository.findAllByTransactionDateBetween(startOfDay, endOfDay);
        List<PaymentEntity> paymentsYesterday = paymentRepository.findAllByTransactionDateBetween(startOfYesterday, endOfYesterday);

        double revenueToday = paymentsToday.stream().mapToDouble(PaymentEntity::getAmount).sum();
        int paymentCountToday = paymentsToday.size();

        double revenueYesterday = paymentsYesterday.stream().mapToDouble(PaymentEntity::getAmount).sum();

        // Tính lợi nhuận theo phần trăm so với ngày hôm trước
        double revenueChangePercent = revenueYesterday == 0 ? 100 : ((revenueToday - revenueYesterday) / revenueYesterday) * 100;

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        respon.put("revenueToday",revenueToday);
        respon.put("profitToday",revenueChangePercent);
        respon.put("paymentCountToday",paymentCountToday);
        return respon;

    }
    @GetMapping("/monthly-revenue")
    public List<Double> getMonthlyRevenue() {
        int year = LocalDate.now().getYear();
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        List<PaymentEntity> payments = paymentRepository.findAllByTransactionDateBetween(startOfYear.atStartOfDay(), endOfYear.atTime(LocalTime.MAX));

        Map<Integer, Double> revenueByMonth = payments.stream()
                .collect(Collectors.groupingBy(payment -> payment.getTransactionDate().getMonthValue(),
                        Collectors.summingDouble(PaymentEntity::getAmount)));

        return IntStream.rangeClosed(1, 12)
                .mapToObj(month -> revenueByMonth.getOrDefault(month, 0.0))
                .collect(Collectors.toList());
    }
    @GetMapping("/weekly-revenue")
    public List<Double> getWeeklyRevenue() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<PaymentEntity> payments = paymentRepository.findAllByTransactionDateBetween(startOfWeek.atStartOfDay(), endOfWeek.atTime(LocalTime.MAX));

        Map<DayOfWeek, Double> revenueByDay = payments.stream()
                .collect(Collectors.groupingBy(payment -> payment.getTransactionDate().getDayOfWeek(),
                        Collectors.summingDouble(PaymentEntity::getAmount)));

        return Arrays.stream(DayOfWeek.values())
                .map(day -> revenueByDay.getOrDefault(day, 0.0))
                .collect(Collectors.toList());
    }

    @GetMapping
    public ResponseEntity<PagedResponse<PaymentResponse>> getAllPayments(@RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "10") int size) {

        if(page > 0){
            page =page -1;
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<PaymentResponse> paymentPage = paymentRepository.findAll(pageable).map(job -> mapper.map(job, PaymentResponse.class));


        return ResponseEntity.ok( new PagedResponse<>(paymentPage));
    }

    @PostMapping(path = "/create")
    public ObjectNode createPaymentLink(@RequestBody PaymentRequest RequestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            final Long userId = RequestBody.getUserId();
            final String productName = RequestBody.getProductName();
            final String description = RequestBody.getDescription();
            final String returnUrl = RequestBody.getReturnUrl();
            final String cancelUrl = RequestBody.getCancelUrl();
            final String packages  = RequestBody.getPackages();
            final int price = RequestBody.getPrice();

            PaymentEntity pendingPayment = paymentRepository.findLatestPendingPaymentByUserIdAndPackage(userId,packages).orElse(null);
            if (pendingPayment != null && "PENDING".equals(pendingPayment.getStatus())) {
                ObjectNode respon = objectMapper.createObjectNode();
                ObjectNode dataNode = objectMapper.createObjectNode();

                dataNode.put("accountName", pendingPayment.getAccountName());
                dataNode.put("accountNumber", pendingPayment.getAccountNumber());
                dataNode.put("amount", pendingPayment.getAmount());
                dataNode.put("bin", pendingPayment.getBin());
                dataNode.put("checkoutUrl", pendingPayment.getCheckoutUrl());
                dataNode.put("currency", pendingPayment.getCurrency());
                dataNode.put("description", pendingPayment.getDescription());
                dataNode.put("orderCode", pendingPayment.getOrderCode());
                dataNode.put("paymentLinkId", pendingPayment.getPaymentLinkId());
                dataNode.put("qrCode", pendingPayment.getQrCode());
                dataNode.put("status", pendingPayment.getStatus());
                respon.put("error", 0);
                respon.put("message", "success");
                respon.put("data",dataNode);
                return respon;
            }
            //Gen order code
            String currentTimeString = String.valueOf(String.valueOf(new Date().getTime()));
            int orderCode =
                    Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));

            ItemData item = new ItemData(packages, 1, price);
            List<ItemData> itemList = new ArrayList<ItemData>();
            itemList.add(item);

            PaymentData paymentData = new PaymentData(orderCode, price, description,
                    itemList, cancelUrl, returnUrl);

            JsonNode data = payOS.createPaymentLink(paymentData);

            UserEntity user = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
            PaymentEntity paymentEntity = PaymentEntity.builder()
                    .user(user)
                    .packages(packages)
                    .accountName(data.get("accountName").asText())
                    .accountNumber(data.get("accountNumber").asText())
                    .paymentLinkId(data.get("paymentLinkId").asText())
                    .bin(data.get("bin").asText())
                    .description(data.get("description").asText())
                    .amount(data.get("amount").asInt())
                    .status(data.get("status").asText())
                    .orderCode(data.get("orderCode").asInt())
                    .checkoutUrl(data.get("checkoutUrl").asText())
                    .qrCode(data.get("qrCode").asText())
                    .currency(data.get("currency").asText())
                    .build();
            paymentRepository.save(paymentEntity);

            ObjectNode respon = objectMapper.createObjectNode();
            respon.put("error", 0);
            respon.put("message", "success");
            respon.set("data", data);
            return respon;

        } catch (Exception e) {
            e.printStackTrace();
            ObjectNode respon = objectMapper.createObjectNode();
            respon.put("error", -1);
            respon.put("message", "fail");
            respon.set("data", null);
            return respon;

        }
    }

    private String formatterDateTimeFromArray(JsonNode dateTimeArray) {
        int year = dateTimeArray.get(0).asInt();
        int month = dateTimeArray.get(1).asInt();
        int day = dateTimeArray.get(2).asInt();
        int hour = dateTimeArray.get(3).asInt();
        int minute = dateTimeArray.get(4).asInt();
        int second = dateTimeArray.get(5).asInt();

        return String.format("%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
    }

    @GetMapping(path = "/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();


        try {
            JsonNode order = payOS.getPaymentLinkInformation(orderId);

            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }

    }
    @PutMapping(path = "/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId, HttpServletRequest request) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            JsonNode order = payOS.cancelPaymentLink(orderId, null);
            PaymentEntity paymentEntity = paymentRepository.findByOrderCode(order.get("orderCode").asInt())
                    .orElse(null);
            if(paymentEntity != null){

                if(!order.get("canceledAt").isNull()){
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
                    LocalDateTime dateTime = LocalDateTime.parse(order.get("canceledAt").asText(), formatter);
                    paymentEntity.setTransactionDate(dateTime);
                }
                paymentEntity.setStatus(order.get("status").asText());

                paymentRepository.save(paymentEntity);
            }
            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }
    @PostMapping(path = "/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            respon.set("data", null);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }

    @PostMapping(path = "/ipn")
    public ObjectNode payosTransferHandler(@RequestBody ObjectNode body,HttpServletRequest request) {

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        System.out.println(body);
        try {
            //Init Response
            respon.put("error", 0);
            respon.put("message", "Ok");
            respon.set("data", null);

            JsonNode data = payOS.verifyPaymentWebhookData(body);

            if (Objects.equals(data.get("desc").asText(), "Thành công")){
                return respon;
            }
            PaymentEntity paymentEntity = paymentRepository.findByOrderCode(data.get("orderCode").asInt())
                    .orElse(null);

            if(paymentEntity != null){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime dateTime = LocalDateTime.parse(data.get("transactionDateTime").asText(), formatter);
                paymentEntity.setStatus("PAID");
                paymentEntity.setTransactionDate(dateTime);
                paymentEntity.setReference(data.get("reference").asText());
                paymentRepository.save(paymentEntity);

                UserEntity user = userRepository.findById(paymentEntity.getUser().getId()).orElseThrow(()-> new ResourceNotFoundException("User","id",paymentEntity.getUser().getId()));
                if (user.getPurchasedPackages().contains(paymentEntity.getPackages())) {
                    user.getPurchasedPackages().remove(paymentEntity.getPackages());
                }
                user.getPurchasedPackages().add(paymentEntity.getPackages());
                userRepository.save(user);
            }
            System.out.println(data);
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }
}
