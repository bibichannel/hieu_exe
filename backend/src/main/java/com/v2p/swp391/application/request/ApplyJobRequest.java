package com.v2p.swp391.application.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Data
public class ApplyJobRequest {
    private MultipartFile cvFile;
    private Long cvId;
}
