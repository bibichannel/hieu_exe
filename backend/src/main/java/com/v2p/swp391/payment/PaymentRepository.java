package com.v2p.swp391.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity,Long> {
    @Query("SELECT p FROM PaymentEntity p " +
            "WHERE p.status = 'PENDING' " +
            "AND p.user.id = :userId " +
            "AND p.packages = :packages " +
            "AND (p.expiredAt > CURRENT_TIMESTAMP OR p.expiredAt IS NULL) " +
            "ORDER BY p.createdAt DESC")
    Optional<PaymentEntity> findLatestPendingPaymentByUserIdAndPackage(
            @Param("userId") Long userId,
            @Param("packages") String packages);

    Optional<PaymentEntity> findByOrderCode(int orderCode);
    List<PaymentEntity> findAllByTransactionDateBetween(LocalDateTime start, LocalDateTime end);
}
