package com.v2p.swp391.application.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "invoices")
public class InvoiceEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private PackageEntity packagee;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    @Column
    private Double totalAmount;
}
