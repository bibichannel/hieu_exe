package com.v2p.swp391.application.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CreateJobRequest {
    private String jobTitle;
    private String jobDescription;
    private String requirementDescription;
    private String desirableDescription;
    private String benefitDescription;
    private List<String> tags;
    private List<String> jobBenefits;
    private Long jobRoleId;
    private List<Long> jobTypesId;
    private Double minimumSalary;
    private Double maximumSalary;
    private Long educationId;
    private String experience;
    private Integer vacancies;
    private Date expirationDate;
    private Long jobLevelId;
    private String country;
    private String city;
//    private MultipartFile logoFile;
}
