package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.JobRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRoleRepository extends JpaRepository<JobRoleEntity,Long> {
    @Query(value = "SELECT i.id, i.name AS name, COALESCE(COUNT(jr.id), 0) AS jobCount " +
            "FROM IndustryEntity i " +
            "LEFT JOIN JobRoleEntity jr ON i.id = jr.industry.id " +
            "GROUP BY i.id, i.name " +
            "ORDER BY jobCount DESC"
    )
    List<Object[]> findIndustriesWithJobCount();
}
