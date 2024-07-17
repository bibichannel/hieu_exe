package com.v2p.swp391.payment;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long userId;
    private String productName;
    private String description;
    private String returnUrl;
    private Integer price;
    private String cancelUrl;
    private String packages;
}
