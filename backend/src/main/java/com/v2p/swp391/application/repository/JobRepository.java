package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.JobEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<JobEntity, Long>, JpaSpecificationExecutor<JobEntity> {
    List<JobEntity> findByEmployerId(Long employerId);

    @Query("SELECT j FROM JobEntity j " +
            "JOIN j.jobRole jr " +
            "JOIN jr.industry ind " +
            "WHERE " +
            "(:jobTitle IS NULL OR LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :jobTitle, '%'))) AND " +
            "(:city IS NULL OR LOWER(j.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(:country IS NULL OR LOWER(j.country) = LOWER(:country)) AND " +
            "(:minimumSalary IS NULL OR j.minimumSalary >= :minimumSalary) AND " +
            "(:maximumSalary IS NULL OR j.maximumSalary <= :maximumSalary) AND " +
            "(:industryName IS NULL OR LOWER(ind.name) LIKE LOWER(CONCAT('%', :industryName, '%'))) AND " +
            "(:jobRoleName IS NULL OR LOWER(jr.name) LIKE LOWER(CONCAT('%', :jobRoleName, '%')))")
    Page<JobEntity> search(String jobTitle, String city, String country, Double minimumSalary, Double maximumSalary, String industryName, String jobRoleName, Pageable pageable);
}
