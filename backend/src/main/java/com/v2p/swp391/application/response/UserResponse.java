package com.v2p.swp391.application.response;

import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SocialLinkDto {
        private String platform;
        private String link;
    }


    private Long id;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String imageUrl;
    private Role role;
    private Boolean isActive;
    private Boolean emailVerified;
    private Boolean isSetup;
    private SocialProvider socialProvider;
    private String providerId;
    private List<SocialLinkDto> socialLinks;
    private List<String> purchasedPackages;
}


