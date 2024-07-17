package com.v2p.swp391.common.enums;

public enum JobSortBy {
    JOB_TITLE("jobTitle"),
    SALARY("minimumSalary"),
    CREATED_AT("createdAt");

    private final String fieldName;

    JobSortBy(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }
}
