package com.oosd.project.courserater;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CourseraterApplication extends SpringBootServletInitializer{
        public static void main(String[] args) {
            SpringApplication.run(CourseraterApplication.class, args);
        }

    }