package com.v2p.swp391.application.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IndustryWithJobCountDto {
    private Long id;
    private String name;
    private Long jobCount;
}
