package com.v2p.swp391.application.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jobs")
public class JobEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @Column(columnDefinition = "TEXT")
    private String requirementDescription;

    @Column(columnDefinition = "TEXT")
    private String desirableDescription;

    @Column(columnDefinition = "TEXT")
    private String benefitDescription;

    @ElementCollection
    @CollectionTable(name = "job_tags", joinColumns = @JoinColumn(name = "job_id"))
    private List<String> tags;

    @ElementCollection
    @CollectionTable(name = "job_benefits", joinColumns = @JoinColumn(name = "job_id"))
    private List<String> jobBenefits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_role_id")
    private JobRoleEntity jobRole;

    @JsonManagedReference
    @ManyToMany
    @JoinTable(
            name = "job_job_types",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "job_type_id")
    )
    private List<JobTypeEntity> jobTypes  = new ArrayList<>();

    private Double minimumSalary;

    private Double maximumSalary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "education_id")
    private EducationEntity education;

    private String experience;

    private Integer vacancies;

    @Temporal(TemporalType.DATE)
    private Date expirationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_level_id")
    private JobLevelEntity jobLevel;

    private String country;

    private String city;

    private String logoPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private UserEntity employer;

    @OneToMany(mappedBy = "job")
    private List<ApplicationEntity> applications = new ArrayList<>();

    @ManyToMany(mappedBy = "favoriteJobs")
    private List<UserEntity> favoritedByUsers = new ArrayList<>();
}


