package com.oosd.project.courserater;

import org.springframework.data.annotation.Id;

public class TestingClass {
    @Id
    private String id;

    public String getTestTitle() {
        return testTitle;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    private String testTitle;
    private int counter;

}