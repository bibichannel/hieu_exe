package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.response.JobWithApplicationsResponse;
import com.v2p.swp391.application.service.InvoiceService;
import com.v2p.swp391.application.service.JobService;
import com.v2p.swp391.common.api.CoreApiResponse;
import com.v2p.swp391.common.enums.ApplicationStatus;
import com.v2p.swp391.utils.Helpers;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/employers")
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerController {

    private final InvoiceService invoiceService;
    private final JobService jobService;

    @GetMapping("/jobs")
    public ResponseEntity<List<JobResponse>> getEmployerJobs() {
        UserEntity employer = Helpers.getUserFromAuth();
        List<JobResponse> employerJobs = jobService.findJobsByEmployerId(employer.getId());
        return ResponseEntity.ok(employerJobs);
    }
    @GetMapping("/applications")
    public ResponseEntity<List<JobWithApplicationsResponse>> getEmployerJobsWithApplications() {
        UserEntity employer = Helpers.getUserFromAuth();
        List<JobWithApplicationsResponse> jobsWithApplications = jobService.findJobsWithApplicationsByEmployerId(employer.getId());
        return ResponseEntity.ok(jobsWithApplications);
    }

    @PutMapping("/status/{applicationId}")
    public CoreApiResponse<String> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam("status") ApplicationStatus status) {
        UserEntity employer = Helpers.getUserFromAuth();
        jobService.updateApplicationStatus(employer.getId(), applicationId, status);
        return CoreApiResponse.success("Application status updated successfully.");
    }

    @PutMapping("/purchase/{packageId}")
    public CoreApiResponse<String> purchasePackage(@PathVariable Long packageId) {
        UserEntity employer = Helpers.getUserFromAuth();
        invoiceService.createInvoice(employer.getId(),packageId);
        return CoreApiResponse.success("Purchased successfully.");
    }
}
