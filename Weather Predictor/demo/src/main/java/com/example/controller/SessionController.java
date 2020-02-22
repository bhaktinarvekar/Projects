package com.example.controller;

import com.example.service.SessionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import com.rabbitmq.client.DeliverCallback;

import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.apache.naming.factory.BeanFactory;
import org.json.JSONException;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import static com.example.service.SessionService.result;

@Controller
@RequestMapping
public class SessionController {

    @Autowired
    UserController userController;
    public final static String QUEUE_NAME = "session";
    public final static String QUEUE_NAME2 = "test";

    @Autowired
    SessionService sessionService;

    @RequestMapping(value = "/session")
    public String session() {
        System.out.println("In Session");
        return "session";
    }

    @RequestMapping(value = "/getsession")
    public ModelAndView getSession(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws IOException, TimeoutException, ParseException, InterruptedException, org.json.simple.parser.ParseException
    {
        final String[] result = {""};
        ModelAndView mv = new ModelAndView("result");
        System.out.println("In Session Controller");
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String username = userController.getUsername();
            JSONObject data = new JSONObject();
            try {
                data.put("username", username);
                data.put("startDate", startDate);
                data.put("endDate", endDate);
            } catch (JSONException ex) {
                ex.printStackTrace();
            }
            mv.addObject("startDate", startDate);
            mv.addObject("endDate", endDate);
            channel.basicPublish("", QUEUE_NAME, null, data.toString().getBytes());
            System.out.println(" [x] Sent '" + data + "'");
            System.out.println("--------------------------------------------------------------------");
            System.out.println("Receiving Data");
            sessionService = new SessionService();
            String result2 = sessionService.receiveMessages();
            JSONParser parser = new JSONParser();
            JSONArray jsonArray=null;
            System.out.println("Result 2 : "+result2);
            if(result2!="") {
                jsonArray = (JSONArray) parser.parse(result2);
                System.out.println("JSON Array : " + jsonArray.toString());
                mv.addObject("jsonArray", jsonArray);
                mv.addObject("username", username);
            }
            return mv;
        }
    }


        @RequestMapping("/results")
        public static String sendResults()
        {
            System.out.println("In results");
            return "result";
        }
    }

