package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.InvoiceEntity;
import com.v2p.swp391.application.model.PackageEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.repository.InvoiceRepository;
import com.v2p.swp391.application.repository.PackageRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final UserRepository userRepository;

    private final PackageRepository packageRepository;

    public void createInvoice(Long userId, Long packageId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User","id",userId));
        PackageEntity packageEntity = packageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Package","id",packageId));

        Date purchaseDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(purchaseDate);
        cal.add(Calendar.DAY_OF_MONTH, packageEntity.getDurationInDays());
        Date expirationDate = cal.getTime();

        InvoiceEntity invoice = InvoiceEntity.builder()
                .user(user)
                .packagee(packageEntity)
                .purchaseDate(purchaseDate)
                .expirationDate(expirationDate)
                .totalAmount(packageEntity.getPrice())
                .build();

        user.setCanPost(true);

        invoiceRepository.save(invoice);
    }

    public List<InvoiceEntity> getUserInvoices(Long userId) {
        return invoiceRepository.findByUserId(userId);
    }
}
