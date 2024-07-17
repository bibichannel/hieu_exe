package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.*;
import com.v2p.swp391.application.repository.ApplicationRepository;
import com.v2p.swp391.application.repository.CvRepository;
import com.v2p.swp391.application.repository.JobRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.application.request.ApplyJobRequest;
import com.v2p.swp391.application.response.ApplicationResponse;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.common.enums.ApplicationStatus;
import com.v2p.swp391.exception.AppException;
import com.v2p.swp391.exception.ResourceNotFoundException;
import com.v2p.swp391.utils.UploadUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CvRepository cvRepository;
    private final ModelMapper modelMapper;

    public ApplicationService(
            JobRepository jobRepository,
            ModelMapper modelMapper,
            ApplicationRepository applicationRepository,
            CvRepository cvRepository,
            UserRepository userRepository) {
        this.userRepository = userRepository;
        this.cvRepository = cvRepository;
        this.jobRepository = jobRepository;
        this.modelMapper = modelMapper;
        this.applicationRepository = applicationRepository;

    }


    public void applyToJob(Long jobId, Long userId, ApplyJobRequest request) {
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        UserEntity freelancer = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Kiểm tra xem người dùng có quyền nộp đơn hay không (có thể thêm điều kiện kiểm tra nếu cần)
        // Nếu không cần kiểm tra, bạn có thể bỏ phần này
        if(request.getCvId() == null && request.getCvFile() == null){
            throw new AppException(HttpStatus.BAD_REQUEST,"Không có CV nộp lên");
        }
        Optional<ApplicationEntity> hasApplied = applicationRepository.findByJobIdAndFreelancerId(jobId, userId);
        if (hasApplied.isPresent()) {
            if(hasApplied.get().getStatus().equals(ApplicationStatus.PENDING)){
                throw new AppException(HttpStatus.BAD_REQUEST, "Đơn của bạn đang chờ duyệt");
            }
        }

        // Tạo đối tượng ApplicationEntity
        ApplicationEntity application = new ApplicationEntity();
        application.setJob(job);
        application.setFreelancer(freelancer);
        application.setStatus(ApplicationStatus.PENDING);


        if (request.getCvId() != null) {
             CVEntity cv = cvRepository.findById(request.getCvId())
                   .orElseThrow(() -> new ResourceNotFoundException("CV", "id", request.getCvId()));
             application.setCvUrl(cv.getCvUrl());
        } else {
            String cvPath = UploadUtils.storePDF(request.getCvFile(), Path.USER_CV_PATH);
            application.setCvUrl(cvPath);
        }

        applicationRepository.save(application);
    }

    public List<ApplicationResponse> findJobsByCandidateId(Long candidateId) {
        List<ApplicationEntity> applications = applicationRepository.findByFreelancerId(candidateId);
        return applications.stream()
                .map(applicationEntity -> modelMapper.map(applicationEntity, ApplicationResponse.class))
                .collect(Collectors.toList());
    }


}
