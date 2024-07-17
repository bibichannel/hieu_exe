package com.v2p.swp391.application.model;

import com.fasterxml.jackson.annotation.*;
import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fullName;

    @Column
    private String phoneNumber;

    @Email
    @Column
    private String email;

    @JsonIgnore
    private String password;

    @Column
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private Boolean isActive;

    @Column
    private Boolean emailVerified;

    @Column
    private Boolean isSetup;

    @Column
    private Boolean canPost;

    @Enumerated(EnumType.STRING)
    private SocialProvider socialProvider;

    @Column
    private String providerId;

    @OneToMany(mappedBy = "user")
    private List<SocialLinkEntity> socialLinks = new ArrayList<>();

    @OneToMany(mappedBy = "employer")
    private List<JobEntity> jobs;

    @ManyToMany
    @JoinTable(
            name = "favorite_jobs",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id")
    )
    private List<JobEntity> favoriteJobs = new ArrayList<>();

    @OneToMany(mappedBy = "freelancer")
    private List<ApplicationEntity> applications = new ArrayList<>();

    @OneToMany(mappedBy = "freelancer")
    private List<CVEntity> cvs = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "user_packages", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "package_name")
    private List<String> purchasedPackages;
}
