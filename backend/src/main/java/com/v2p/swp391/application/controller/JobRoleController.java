package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.JobRoleEntity;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.application.service.JobRoleService;
import com.v2p.swp391.application.service.UserService;
import com.v2p.swp391.common.api.PagedResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/jobroles")
public class JobRoleController {
    private final JobRoleService jobRoleService;
    private final UserService userService;
    @GetMapping("/popular")
    public ResponseEntity<PagedResponse<JobRoleEntity>> getPopularJobRole(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobRoleEntity> jobRolePage = jobRoleService.getPopularJobRole(pageable);
        return ResponseEntity.ok(new PagedResponse<>(jobRolePage));
    }
}
