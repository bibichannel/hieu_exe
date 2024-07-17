package com.v2p.swp391.application.request;

import com.v2p.swp391.common.enums.JobSortBy;
import com.v2p.swp391.common.enums.SortOrder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class JobFilterRequest {
    private String jobTitle;
    private String city;
    private String country;
    private Double minimumSalary;
    private Double maximumSalary;
    private String industry;
    private String jobRole;
    private Pageable pageable;
    private JobSortBy sortBy;
    private SortOrder sortOrder;
}