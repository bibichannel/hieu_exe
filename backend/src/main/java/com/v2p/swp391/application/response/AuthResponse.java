package com.v2p.swp391.application.response;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.common.enums.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
//    private String refreshToken;
    private String accessToken;
    private Long userId;
    private Role role;
    private String imageUrl;
    private String fullName;

}
