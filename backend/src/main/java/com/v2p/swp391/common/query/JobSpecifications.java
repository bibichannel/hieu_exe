package com.v2p.swp391.common.query;

import com.v2p.swp391.application.model.JobEntity;
import com.v2p.swp391.application.model.IndustryEntity;
import com.v2p.swp391.application.model.JobRoleEntity;
import com.v2p.swp391.application.request.JobFilterRequest;
import com.v2p.swp391.common.enums.SortOrder;
import com.v2p.swp391.common.enums.JobSortBy;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class JobSpecifications {

    public static Specification<JobEntity> withFilters(JobFilterRequest filterRequest) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Example: Filter by jobTitle
            if (filterRequest.getJobTitle() != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("jobTitle")),
                        "%" + filterRequest.getJobTitle().toLowerCase() + "%"));
            }

            // Example: Filter by city
            if (filterRequest.getCity() != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("city")),
                        "%" + filterRequest.getCity().toLowerCase() + "%"));
            }

            // Example: Filter by country
            if (filterRequest.getCountry() != null) {
                predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get("country")),
                        filterRequest.getCountry().toLowerCase()));
            }

            // Example: Filter by minimumSalary
            if (filterRequest.getMinimumSalary() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("minimumSalary"),
                        filterRequest.getMinimumSalary()));
            }

            // Example: Filter by maximumSalary
            if (filterRequest.getMaximumSalary() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("maximumSalary"),
                        filterRequest.getMaximumSalary()));
            }

            // Example: Filter by industryName
            if (filterRequest.getIndustry() != null) {
                Join<JobEntity, IndustryEntity> industryJoin = root.join("jobRole").join("industry");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(industryJoin.get("name")),
                        "%" + filterRequest.getIndustry().toLowerCase() + "%"));
            }

            // Example: Filter by jobRoleName
            if (filterRequest.getJobRole() != null) {
                Join<JobEntity, JobRoleEntity> jobRoleJoin = root.join("jobRole");
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(jobRoleJoin.get("name")),
                        "%" + filterRequest.getJobRole().toLowerCase() + "%"));
            }
            if (filterRequest.getSortBy() != null && filterRequest.getSortOrder() != null) {
                Path<Object> sortByField = root.get(filterRequest.getSortBy().getFieldName());
                query.orderBy(filterRequest.getSortOrder() == SortOrder.ASC ?
                        criteriaBuilder.asc(sortByField) : criteriaBuilder.desc(sortByField));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}

