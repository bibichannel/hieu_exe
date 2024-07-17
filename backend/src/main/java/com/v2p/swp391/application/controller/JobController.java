package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.JobEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.request.CreateJobRequest;
import com.v2p.swp391.application.request.JobFilterRequest;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.service.JobService;
import com.v2p.swp391.common.api.PagedResponse;
import com.v2p.swp391.common.enums.JobSortBy;
import com.v2p.swp391.common.enums.SortOrder;
import com.v2p.swp391.exception.AppException;
import com.v2p.swp391.utils.Helpers;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("${app.api.version.v1}/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;
    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
       JobResponse job = jobService.findJobById(id);
        return ResponseEntity.ok(job);
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobResponse> createJob(@RequestBody CreateJobRequest request) {
        UserEntity user = Helpers.getUserFromAuth();
        if (!Boolean.TRUE.equals(user.getCanPost())) {
            throw new AppException(HttpStatus.BAD_REQUEST, "You must purchase a package to post a job");
        }
        JobEntity jobEntity = modelMapper.map(request, JobEntity.class);
        jobEntity.setEmployer(user);
        JobResponse createdJob = jobService.createJob(jobEntity);
        return ResponseEntity.ok(createdJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PagedResponse<JobResponse>> searchJobs(
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Double minimumSalary,
            @RequestParam(required = false) Double maximumSalary,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) String jobRole,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size,
            @RequestParam(required = false) JobSortBy sortBy,
            @RequestParam(required = false) SortOrder sortOrder
            ) {
        JobFilterRequest filterRequest = new JobFilterRequest();
        filterRequest.setJobTitle(jobTitle);
        filterRequest.setCity(city);
        filterRequest.setCountry(country);
        filterRequest.setMinimumSalary(minimumSalary);
        filterRequest.setMaximumSalary(maximumSalary);
        filterRequest.setJobRole(jobRole);
        filterRequest.setIndustry(industry);
        filterRequest.setPageable( PageRequest.of(page, size));
        filterRequest.setSortBy(sortBy != null ? sortBy : JobSortBy.CREATED_AT); // Default sorting
        filterRequest.setSortOrder(sortOrder != null ? sortOrder : SortOrder.DESC); // Default sorting order
        Page<JobResponse> jobPage = jobService.searchJobs(filterRequest);
        return ResponseEntity.ok(new PagedResponse<>(jobPage));
    }
}