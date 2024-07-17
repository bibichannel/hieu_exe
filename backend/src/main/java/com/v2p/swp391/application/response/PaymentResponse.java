package com.v2p.swp391.application.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDto {
        private Long id;
        private String fullName;
    }
    private PaymentResponse.UserDto user;
    private Long id;

    private String packages;

    private LocalDateTime expiredAt;

    private String accountName;

    private String accountNumber;

    private String paymentLinkId;

    private String bin;

    private String description;

    private Integer amount;

    private String status;

    private LocalDateTime transactionDate;

    private String reference;

    private Integer orderCode;

    private String checkoutUrl;

    private String qrCode;

    private String currency;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
