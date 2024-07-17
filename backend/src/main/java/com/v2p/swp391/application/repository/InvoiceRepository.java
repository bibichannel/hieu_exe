package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long> {
    List<InvoiceEntity> findByUserId(Long userId);
}