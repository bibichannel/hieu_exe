package com.v2p.swp391.utils;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class Helpers {
    public static UserEntity getUserFromAuth(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UserEntity user = userPrincipal.getUserEntity();
        return user;
    }
}
