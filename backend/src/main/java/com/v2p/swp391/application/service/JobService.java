package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.*;
import com.v2p.swp391.application.repository.ApplicationRepository;
import com.v2p.swp391.application.repository.JobRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.application.request.JobFilterRequest;
import com.v2p.swp391.application.response.ApplicationResponse;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.response.JobWithApplicationsResponse;
import com.v2p.swp391.common.api.PagedResponse;
import com.v2p.swp391.common.enums.ApplicationStatus;
import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SortOrder;
import com.v2p.swp391.common.query.JobSpecifications;
import com.v2p.swp391.exception.AppException;
import com.v2p.swp391.exception.ResourceNotFoundException;
import com.v2p.swp391.utils.Helpers;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    public void addFavoriteJob(Long userId, Long jobId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "Job not found"));
//        if (user.getFavoriteJobs().contains(job)) {
//            throw new AppException(HttpStatus.BAD_REQUEST, "Bạn đã thích job này");
//        }
        user.getFavoriteJobs().add(job);
        userRepository.save(user);
    }
    public void removeFavoriteJob(Long userId, Long jobId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "Job not found"));

        user.getFavoriteJobs().remove(job);
        userRepository.save(user);
    }

    public List<JobResponse> getFavoriteJobs(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));

        return user.getFavoriteJobs().stream()
                .map(job -> modelMapper.map(job, JobResponse.class))
                .collect(Collectors.toList());
    }

    public void updateApplicationStatus(Long employerId, Long applicationId, ApplicationStatus status) {
        ApplicationEntity applicationEntity = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        if(!applicationEntity.getJob().getEmployer().getId().equals(employerId)) {
            throw  new AppException(HttpStatus.BAD_REQUEST,"Bạn không có quyền thay đổi");
        }

        applicationEntity.setStatus(status);
        applicationRepository.save(applicationEntity);
    }
    public List<JobResponse> findJobsByEmployerId(Long employerId) {
        List<JobEntity> jobs = jobRepository.findByEmployerId(employerId);
        Type listType = new TypeToken<List<JobResponse>>() {}.getType();
        return modelMapper.map(jobs, listType);
    }

    public List<JobResponse> findAllJobs() {
        List<JobEntity> jobs = jobRepository.findAll();
        Type listType = new TypeToken<List<JobResponse>>() {}.getType();
        return modelMapper.map(jobs, listType);
    }

    public JobResponse findJobById(Long id) {
        JobEntity jobEntity = jobRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Job","id",id));
        return modelMapper.map(jobEntity, JobResponse.class);
    }

    public JobResponse createJob(JobEntity jobEntity) {
        JobEntity savedJobEntity = jobRepository.save(jobEntity);
        return modelMapper.map(savedJobEntity, JobResponse.class);
    }

    public JobResponse updateJob(Long id, JobEntity jobDetails) {
        JobEntity jobEntity = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        modelMapper.map(jobDetails, jobEntity);
        JobEntity uppdatedJobEntity = jobRepository.save(jobEntity);
        return modelMapper.map(uppdatedJobEntity, JobResponse.class);
    }
    public List<JobWithApplicationsResponse> findJobsWithApplicationsByEmployerId(Long employerId) {
        List<JobEntity> jobs = jobRepository.findByEmployerId(employerId);
        return jobs.stream().map(job -> {
            List<ApplicationEntity> applications = applicationRepository.findByJobId(job.getId());
            List<ApplicationResponse> applicationResponses = applications.stream()
                    .map(application -> modelMapper.map(application, ApplicationResponse.class))
                    .collect(Collectors.toList());
            String status = calculateJobStatus(job.getExpirationDate());
            return JobWithApplicationsResponse.builder()
                    .jobId(job.getId())
                    .status(status)
                    .jobTitle(job.getJobTitle())
                    .applications(applicationResponses)
                    .build();
        }).collect(Collectors.toList());
    }
    public Page<JobResponse> searchJobs(JobFilterRequest filterRequest) {
        Specification<JobEntity> specification = JobSpecifications.withFilters(filterRequest);
        Pageable pageable = filterRequest.getPageable();

        Page<JobEntity> jobPage = jobRepository.findAll(specification, pageable);
        return jobPage.map(job -> modelMapper.map(job, JobResponse.class));
//        Page<JobEntity> filteredJobs = jobRepository.search(
//                filterRequest.getJobTitle(),
//                filterRequest.getCity(),
//                filterRequest.getCountry(),
//                filterRequest.getMinimumSalary(),
//                filterRequest.getMaximumSalary(),
//                filterRequest.getIndustry(),
//                filterRequest.getJobRole(),
//                filterRequest.getPagable()
//        );
//        return filteredJobs.map(job -> modelMapper.map(job, JobResponse.class));

    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    private String calculateJobStatus(Date expirationDate) {
        if (expirationDate == null) {
            return "No Expiration Date";
        }

        Date currentDate = new Date();
        if (currentDate.after(expirationDate)) {
            return "Expired";
        } else {
            return "Active";
        }
    }

}
