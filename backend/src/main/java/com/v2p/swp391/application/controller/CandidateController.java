package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.ApplicationEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.request.ApplyJobRequest;
import com.v2p.swp391.application.response.ApplicationResponse;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.service.ApplicationService;
import com.v2p.swp391.application.service.JobService;
import com.v2p.swp391.common.api.CoreApiResponse;
import com.v2p.swp391.utils.Helpers;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/candidates")
@PreAuthorize("hasRole('CANDIDATE')")
public class CandidateController {

    private final ApplicationService applicationService;
    private final JobService jobService;
    private final ModelMapper modelMapper;

    @PostMapping(value="/apply/{jobId}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public CoreApiResponse<String> applyJob(@PathVariable Long jobId, @ModelAttribute ApplyJobRequest request) {
        UserEntity user = Helpers.getUserFromAuth();
        applicationService.applyToJob(jobId,user.getId(),request);

        return CoreApiResponse.success("Nộp đơn thành công");
    }
    @GetMapping("/jobs")
    public List<ApplicationResponse> getAppliedJobs() {
        UserEntity user = Helpers.getUserFromAuth();
        return applicationService.findJobsByCandidateId(user.getId());
    }

    @PostMapping("/favorites")
    public CoreApiResponse<String> addFavoriteJob(@RequestBody Long jobId) {
        UserEntity user = Helpers.getUserFromAuth();
        jobService.addFavoriteJob(user.getId(), jobId);
        return CoreApiResponse.success("Thêm job vào danh sách yêu thích");
    }
    @DeleteMapping("/favorites/remove")
    public CoreApiResponse<String> removeFavoriteJob(@RequestParam Long jobId) {
        UserEntity user = Helpers.getUserFromAuth();
        jobService.removeFavoriteJob(user.getId(), jobId);
        return CoreApiResponse.success("Job removed from favorites");
    }

    @GetMapping("/favorites")
    public CoreApiResponse<List<JobResponse>> getFavoriteJobs() {
        UserEntity user = Helpers.getUserFromAuth();
        List<JobResponse> favoriteJobs = jobService.getFavoriteJobs(user.getId());
        return CoreApiResponse.success(favoriteJobs);
    }
}
