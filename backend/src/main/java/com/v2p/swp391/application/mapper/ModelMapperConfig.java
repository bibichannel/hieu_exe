package com.v2p.swp391.application.mapper;

import com.v2p.swp391.application.model.*;
import com.v2p.swp391.application.request.CreateJobRequest;
import com.v2p.swp391.application.response.ApplicationResponse;
import com.v2p.swp391.application.response.JobResponse;
import com.v2p.swp391.application.response.PaymentResponse;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.payment.PaymentEntity;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.getConfiguration().setPropertyCondition(context -> context.getSource() != null);
        configCreateJobRequestToJobEntity(modelMapper);
        configJobEntityToJobResponse(modelMapper);
        configUserEntityToUserResponse(modelMapper);
        configPaymentEntityToPaymentResponse(modelMapper);

        Converter<ApplicationEntity, ApplicationResponse> applicationToResponseConverter = new Converter<ApplicationEntity, ApplicationResponse>() {
            @Override
            public ApplicationResponse convert(MappingContext<ApplicationEntity, ApplicationResponse> context) {
                ApplicationEntity source = context.getSource();
                ApplicationResponse destination = context.getDestination();
                destination.setFreelancerName(source.getFreelancer().getFullName());
                destination.setJobTitle(source.getJob().getJobTitle());
                destination.setJobId(source.getJob().getId());
                destination.setDateApplied(source.getCreatedAt().toLocalDate());
                destination.setStatus(source.getStatus());

                return destination;
            }
        };

        TypeMap<ApplicationEntity, ApplicationResponse> typeMap = modelMapper.createTypeMap(ApplicationEntity.class, ApplicationResponse.class);
        typeMap.setPostConverter(applicationToResponseConverter);

        return modelMapper;
    }
    private void configPaymentEntityToPaymentResponse(ModelMapper modelMapper) {
        TypeMap<PaymentEntity, PaymentResponse> typeMap = modelMapper.createTypeMap(PaymentEntity.class, PaymentResponse.class);

        Converter<UserEntity, PaymentResponse.UserDto> userConverter = context -> {
            UserEntity userEntity = context.getSource();
            return new PaymentResponse.UserDto(userEntity.getId(), userEntity.getFullName());
        };
        typeMap.addMappings(mapper -> {
            mapper.using(userConverter).map(PaymentEntity::getUser, PaymentResponse::setUser);
        });

    }
    private void configJobEntityToJobResponse(ModelMapper modelMapper) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TypeMap<JobEntity, JobResponse> typeMap = modelMapper.createTypeMap(JobEntity.class, JobResponse.class);


        Converter<List<JobTypeEntity>, List<String>> jobTypeConverter = context -> {
            List<JobTypeEntity> jobTypeEntities = context.getSource();
            return jobTypeEntities.stream()
                    .map(JobTypeEntity::getName)
                    .collect(Collectors.toList());
        };


        typeMap.addMappings(mapper -> {
            mapper.map(src -> src.getJobRole().getName(), JobResponse::setJobRole);
            mapper.using(jobTypeConverter).map(JobEntity::getJobTypes, JobResponse::setJobTypes);
            mapper.map(src -> src.getEducation().getLevel(), JobResponse::setEducation);
            mapper.map(src -> src.getJobLevel().getLevel(), JobResponse::setJobLevel);
        });
    }
    public void configUserEntityToUserResponse(ModelMapper modelMapper){
        TypeMap<UserEntity, UserResponse> typeMap = modelMapper.createTypeMap(UserEntity.class, UserResponse.class);


        Converter<List<SocialLinkEntity>, List<UserResponse.SocialLinkDto>> socialLinkConverter = context -> {
            List<SocialLinkEntity> socialLinkEntities = context.getSource();
            return socialLinkEntities.stream()
                    .map(socialLink -> modelMapper.map(socialLink, UserResponse.SocialLinkDto.class))
                    .collect(Collectors.toList());
        };

        typeMap.addMappings(mapper -> {
            mapper.using(socialLinkConverter).map(UserEntity::getSocialLinks, UserResponse::setSocialLinks);

        });
    }

    public void configCreateJobRequestToJobEntity(ModelMapper modelMapper){
        TypeMap<CreateJobRequest, JobEntity> typeMap = modelMapper.createTypeMap(CreateJobRequest.class, JobEntity.class);

        Converter<List<Long>, List<JobTypeEntity>> jobTypeConverter = context -> {
            List<Long> jobTypeId = context.getSource();
            // Chuyển đổi từ tên thành đối tượng JobTypeEntity
            return jobTypeId.stream()
                    .map(id -> {
                        JobTypeEntity jobTypeEntity = new JobTypeEntity();
                        jobTypeEntity.setId(id);
                        return jobTypeEntity;
                    })
                    .collect(Collectors.toList());
        };


        Converter<Long, JobRoleEntity> idJobRoleConverter = context -> {
            Long id = context.getSource();
            JobRoleEntity o =  new JobRoleEntity();
            o.setId(id);
            return o;
        };

        Converter<Long, EducationEntity> idEducationConverter = context -> {
            Long id = context.getSource();
            EducationEntity o =  new EducationEntity();
            o.setId(id);
            return o;
        };

        Converter<Long, JobLevelEntity> idJobLevelConverter = context -> {
            Long id = context.getSource();
            JobLevelEntity o =  new JobLevelEntity();
            o.setId(id);
            return o;
        };

        typeMap.addMappings(mapper -> {
            mapper.using(jobTypeConverter).map(CreateJobRequest::getJobTypesId, JobEntity::setJobTypes);
            mapper.using(idJobRoleConverter).map(CreateJobRequest::getJobRoleId, JobEntity::setJobRole);
            mapper.using(idEducationConverter).map(CreateJobRequest::getEducationId, JobEntity::setEducation);
            mapper.using(idJobLevelConverter).map(CreateJobRequest::getJobLevelId, JobEntity::setJobLevel);
        });
    }


}
