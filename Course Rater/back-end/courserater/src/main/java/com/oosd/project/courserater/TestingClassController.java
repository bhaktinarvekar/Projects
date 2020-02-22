package com.oosd.project.courserater;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class TestingClassController {

    private final TestingRepository repository;

    public TestingClassController(TestingRepository repository){
        this.repository = repository;
    }

    @GetMapping("/alltest")
    public List<TestingClass> allTesting(){
        return repository.findAll();
    }
}