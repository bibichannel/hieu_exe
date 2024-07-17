package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.JobRoleEntity;
import com.v2p.swp391.application.repository.JobRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobRoleService {

    private final JobRoleRepository jobRoleRepository;

    public Page<JobRoleEntity> getPopularJobRole(Pageable pageable) {
        // Implement your logic to fetch popular job roles with pagination.
        // This might involve calling a repository method that supports pagination.
        return jobRoleRepository.findAll(pageable);
    }
}
