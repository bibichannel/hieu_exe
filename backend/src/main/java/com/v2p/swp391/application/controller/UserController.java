package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.request.ChangePasswordRequest;
import com.v2p.swp391.application.response.AuthResponse;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.application.service.UserService;
import com.v2p.swp391.common.api.CoreApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/users")
public class UserController {
    private final AuthService authService;

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        Optional<UserEntity> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/admin")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('STAFF')")
//    public String userAccess() {
//        return "User Content.";
//    }
//
//    @GetMapping("/customer")
//    @PreAuthorize("hasRole('CUSTOMER')")
//    public String customerAccess()
//    {
//
//        return "Customer Content.";
//    }


}
