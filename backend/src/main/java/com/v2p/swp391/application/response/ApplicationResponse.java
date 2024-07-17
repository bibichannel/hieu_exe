package com.v2p.swp391.application.response;

import com.v2p.swp391.common.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String freelancerName;
    private String cvUrl;
    private LocalDate dateApplied;
    private ApplicationStatus status;
}