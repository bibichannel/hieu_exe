package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.request.*;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.common.api.CoreApiResponse;
import com.v2p.swp391.application.response.AuthResponse;
import com.v2p.swp391.config.AppProperties;
import com.v2p.swp391.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "/send-otp")
    public CoreApiResponse<?> generateOTP(@RequestParam("email") String email)
    {
        authService.sendOTP(email);
        return CoreApiResponse.success("generate successfully");
    }

    @PostMapping("/signin")
    public CoreApiResponse<AuthResponse> signin(
            @Valid @RequestBody LoginRequest loginRequest
//            HttpServletResponse response
    ) {
        AuthResponse res = authService.signIn(loginRequest);
        return CoreApiResponse.success(res);
    }

    @PostMapping("/signup")
    public CoreApiResponse<?> signup(@Valid @RequestBody SignUpRequest signUpRequest) {
        authService.signUp(signUpRequest);
        return CoreApiResponse.success("User registered successfully");
    }

    @PostMapping("/reset-password")
//    @PreAuthorize("hasRole('CUSTOMER')")
    public CoreApiResponse<?> changePassword(@Valid @RequestBody ChangePasswordRequest request)
    {
        authService.changePassword(request);
        return CoreApiResponse.success("Password has been changed");
    }

    @GetMapping("/verify")
    public CoreApiResponse<?> verify(
            @RequestParam String email,
            @RequestParam Integer otp
    ) {
        authService.verify(email,otp);
        return CoreApiResponse.success("User verified successfully");
    }
}
