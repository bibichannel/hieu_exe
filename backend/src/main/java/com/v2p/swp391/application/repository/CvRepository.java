package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.CVEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository  extends JpaRepository<CVEntity, Long> {
}