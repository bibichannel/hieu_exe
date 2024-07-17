package com.v2p.swp391.payment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.v2p.swp391.application.model.BaseEntity;
import com.v2p.swp391.application.model.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "payments")
public class PaymentEntity extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

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

}
