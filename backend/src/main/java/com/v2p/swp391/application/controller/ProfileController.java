package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.application.service.UserService;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.utils.Helpers;
import com.v2p.swp391.utils.UploadUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/profile")
public class ProfileController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getProfile() {
        UserEntity user = Helpers.getUserFromAuth();
        ModelMapper mapper = new ModelMapper();
        return userService.findUserById(user.getId())
                .map(userEntity -> mapper.map(userEntity, UserResponse.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @PutMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<UserResponse> updateProfile(@ModelAttribute UpdateProfileRequest request) {
//        UserEntity user = Helpers.getUserFromAuth();
//        ModelMapper modelMapper = new ModelMapper();
//        UserEntity userDetails = modelMapper.map(request, UserEntity.class);
//
//        if(request.getImgFile() != null){
//            String imgPath = UploadUtils.storeImage(request.getImgFile(), Path.USER_IMAGE_PATH);
//            userDetails.setImageUrl(imgPath);
//        }
//        UserEntity updatedUser = userService.updateUser(user.getId(), modelMapper.map(request,UserEntity.class));
//        return ResponseEntity.ok(modelMapper.map(updatedUser, UserResponse.class));
//    }
}
