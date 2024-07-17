package com.v2p.swp391.application.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponse {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EmployerDto {
        private Long id;
        private String fullName;
    }
    private Long id;
    private String jobTitle;
    private String jobDescription;
    private String requirementDescription;
    private String desirableDescription;
    private String benefitDescription;
    private List<String> tags;
    private List<String> jobBenefits;
    private String jobRole;
    private List<String> jobTypes;
    private Double minimumSalary;
    private Double maximumSalary;
    private String education;
    private String experience;
    private Integer vacancies;
    private Date expirationDate;
    private String jobLevel;
    private String country;
    private String city;
    private String logoPath;
    private EmployerDto employer;
    private LocalDateTime createdAt;
}

