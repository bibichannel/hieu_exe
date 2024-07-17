package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.response.IndustryWithJobCountDto;
import com.v2p.swp391.application.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/popular")
    public List<IndustryWithJobCountDto> getPopularCategoriesWithJobCount() {
        return categoryService.getPopularCategoriesWithJobCount();
    }
}
