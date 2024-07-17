package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository  extends JpaRepository<ApplicationEntity, Long> {
    List<ApplicationEntity> findByFreelancerId(Long candidateId);
    Optional<ApplicationEntity> findByJobIdAndFreelancerId(Long jobId, Long freelancerId);
    List<ApplicationEntity> findByJobId(Long jobId);
}
