package com.v2p.swp391.application.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobWithApplicationsResponse {
    private Long jobId;
    private String jobTitle;
    private String status;
    private List<ApplicationResponse> applications;
}