package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
}

