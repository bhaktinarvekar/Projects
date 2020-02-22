package com.example.demo;

import org.json.simple.parser.ParseException;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.concurrent.TimeoutException;

import static com.example.service.SessionService.receiveMessages;

@EnableScheduling
@SpringBootApplication
@ComponentScan({"com.example.controller"})
@ComponentScan({"com.example.service"})
public class DemoApplication {

	public static void main(String[] args) throws IOException, TimeoutException, ParseException, InterruptedException {
		SpringApplication.run(DemoApplication.class, args);
        receiveMessages();
	}

}
