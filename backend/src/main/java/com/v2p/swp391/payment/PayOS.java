package com.v2p.swp391.payment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.v2p.swp391.payment.type.PaymentData;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

public class PayOS {
    private final String clientId;
    private final String apiKey;
    private final String checksumKey;
    private static final String PAYOS_BASE_URL = "https://api-merchant.payos.vn";

    public PayOS(String clientId, String apiKey, String checksumKey) {
        this.clientId = clientId;
        this.apiKey = apiKey;
        this.checksumKey = checksumKey;
    }

    public JsonNode createPaymentLink(PaymentData paymentData) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String url = PAYOS_BASE_URL + "/v2/payment-requests";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", this.clientId);
        headers.set("x-api-key", this.apiKey);

        paymentData.setSignature(Utils.createSignatureOfPaymentRequest(paymentData, this.checksumKey));
        String paymentDataJson = objectMapper.writeValueAsString(paymentData);

        HttpEntity<String> requestEntity = new HttpEntity<>(paymentDataJson, headers);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            JsonNode res = objectMapper.readTree(responseEntity.getBody());
            if (!Objects.equals(res.get("code").asText(), "00")) {
                throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
            } else {
                String paymentLinkResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                if (!paymentLinkResSignature.equals(res.get("signature").asText())) {
                    throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                } else {
                    return res.get("data");
                }
            }
        } else {
            throw new Exception("Failed with HTTP error code: " + responseEntity.getStatusCode());
        }
    }

    public JsonNode getPaymentLinkInformation(int orderId) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String url = PAYOS_BASE_URL + "/v2/payment-requests/" + orderId;
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-client-id", this.clientId);
        headers.set("x-api-key", this.apiKey);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            JsonNode res = objectMapper.readTree(responseEntity.getBody());
            if (!Objects.equals(res.get("code").asText(), "00")) {
                throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
            } else {
                String paymentLinkResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                if (!paymentLinkResSignature.equals(res.get("signature").asText())) {
                    throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                } else {
                    return res.get("data");
                }
            }
        } else {
            throw new Exception("Failed with HTTP error code: " + responseEntity.getStatusCode());
        }
    }

    public String confirmWebhook(String webhookUrl) throws Exception {
        if (webhookUrl != null && !webhookUrl.isEmpty()) {
            String url = PAYOS_BASE_URL + "/confirm-webhook";
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-client-id", this.clientId);
            headers.set("x-api-key", this.apiKey);

            String requestBody = "{\"webhookUrl\":\"" + webhookUrl + "\"}";
            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                return webhookUrl;
            } else if (responseEntity.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new PayOSError((String) Constants.ERROR_CODE.get("INTERNAL_SERVER_ERROR"), (String) Constants.ERROR_MESSAGE.get("INTERNAL_SERVER_ERROR"));
            } else if (responseEntity.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new PayOSError((String) Constants.ERROR_CODE.get("UNAUTHORIZED"), (String) Constants.ERROR_MESSAGE.get("UNAUTHORIZED"));
            } else {
                throw new PayOSError((String) Constants.ERROR_CODE.get("INTERNAL_SERVER_ERROR"), (String) Constants.ERROR_MESSAGE.get("INTERNAL_SERVER_ERROR"));
            }
        } else {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("INVALID_PARAMETER"));
        }
    }

    public JsonNode cancelPaymentLink(int orderId, String cancellationReason) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String url = PAYOS_BASE_URL + "/v2/payment-requests/" + orderId + "/cancel";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", this.clientId);
        headers.set("x-api-key", this.apiKey);

        String requestBody = "{\"cancellationReason\":\"" + cancellationReason + "\"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            JsonNode res = objectMapper.readTree(responseEntity.getBody());
            if (!Objects.equals(res.get("code").asText(), "00")) {
                throw new PayOSError(res.get("code").asText(), res.get("desc").asText());
            } else {
                String paymentLinkInfoResSignature = Utils.createSignatureFromObj(res.get("data"), this.checksumKey);
                if (!paymentLinkInfoResSignature.equals(res.get("signature").asText())) {
                    throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
                } else {
                    return res.get("data");
                }
            }
        } else {
            throw new Exception("Failed with HTTP error code: " + responseEntity.getStatusCode());
        }
    }

    public JsonNode verifyPaymentWebhookData(JsonNode webhookBody) throws Exception {
        JsonNode data = webhookBody.get("data");
        String signature = webhookBody.get("signature").asText();
        if (data == null || data.isNull()) {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("NO_DATA"));
        } else if (signature == null || signature.isEmpty()) {
            throw new Exception((String) Constants.ERROR_MESSAGE.get("NO_SIGNATURE"));
        } else {
            String signData = Utils.createSignatureFromObj(data, this.checksumKey);
            if (!signData.equals(signature)) {
                throw new Exception((String) Constants.ERROR_MESSAGE.get("DATA_NOT_INTEGRITY"));
            } else {
                return data;
            }
        }
    }
}
