package com.randomerror.usermanagement.receive.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.randomerror.usermanagement.receive.repository.UserRepository;

@SpringBootApplication
@ComponentScan({"com.randomerror.usermanagement.receive"})
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
public class Receiver {
    public static void main(String[] args){
        System.out.print("in Main");
        SpringApplication.run(Receiver.class, args);
    }

}

