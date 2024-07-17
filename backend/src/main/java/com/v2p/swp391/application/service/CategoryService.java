package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.IndustryEntity;
import com.v2p.swp391.application.repository.JobRoleRepository;
import com.v2p.swp391.application.response.IndustryWithJobCountDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class CategoryService {

    private final JobRoleRepository jobRoleRepository;

    @Transactional(readOnly = true)
    public List<IndustryWithJobCountDto> getPopularCategoriesWithJobCount() {
        // Fetch all industries with job count
        List<Object[]> industryJobCounts = jobRoleRepository.findIndustriesWithJobCount();

        // Map to DTOs
        return industryJobCounts.stream()
                .map(result -> {
                    Long industryId = ((Number) result[0]).longValue();
                    String industryName = (String) result[1];
                    Long jobCount = ((Number) result[2]).longValue();
                    return new IndustryWithJobCountDto(industryId, industryName, jobCount);
                })
                .limit(6)
                .collect(Collectors.toList());
    }
}