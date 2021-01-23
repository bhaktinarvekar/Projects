package com.example.service;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
public class SessionService
{
    public final static String QUEUE_NAME2 = "test";
    public boolean flag = false;
    public static String[] result = {""};

    public static String receiveMessages() throws IOException, TimeoutException, InterruptedException, ParseException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection1 = factory.newConnection();
        
        Channel channel1 = connection1.createChannel();
        channel1.queueDeclare(QUEUE_NAME2, false, false, false, null);
        DeliverCallback deliverCallback = (consumerTag, delivery) ->
        {
            System.out.println("in deliver callback....");
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("message : "+message);
            result[0] = message;
        };
        channel1.basicConsume(QUEUE_NAME2, true, deliverCallback, consumerTag -> { });
        TimeUnit.SECONDS.sleep(2);
        System.out.println("Result obtained : "+result[0]);
        return result[0];
    }
}
