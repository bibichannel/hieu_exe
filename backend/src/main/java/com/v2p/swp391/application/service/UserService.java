package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public List<UserResponse> findAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        Type listType = new TypeToken<List<UserResponse>>() {}.getType();
        return modelMapper.map(users, listType);
    }

    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserEntity createUser(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    public UserEntity updateUser(Long id, UserEntity userDetails) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User","id",id));

        modelMapper.map(userDetails, userEntity);
        return userRepository.save(userEntity);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }





}
