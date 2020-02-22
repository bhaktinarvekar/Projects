package com.example.controller;


import java.io.IOException;
import java.util.concurrent.TimeoutException;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;



@Controller
public class RadarDataController {
	@Autowired
	UserController userController;
	private final static String QUEUE_NAME = "getData";
	private final static String QUEUE1 = "receiveData";
	
	@GetMapping("/searchData")
    public String home() {
    	System.out.println("searchData");
       
        return "RadarData";
    }
	@PostMapping("/getData") 
	public String getRadarData(@RequestParam("date") String date,
		               	@RequestParam("radarId") String radarId, @RequestParam("scans") String scans,ModelMap modelMap)  {
		System.out.println(date);
		String[] dt =date.split("/");
		System.out.println(dt[0]+" "+dt[1]+" "+dt[2]);
		ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
             channel.queueDeclare(QUEUE_NAME, false, false, false, null);

             Channel channel1 = connection.createChannel();
             channel1.queueDeclare(QUEUE1, false, false, false, null);
             String username = userController.getUsername();
             JSONObject data = new JSONObject();
             try {
             	data.put("username", username);
				data.put("year", dt[2]);
				data.put("month", dt[0]);
	            data.put("day", dt[1]);
	            data.put("radar_Id", radarId);
	            data.put("n", scans);

			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

             JSONObject saveData = new JSONObject();
             try {
             	saveData.put("username", username);
				 saveData.put("year", dt[2]);
				 saveData.put("month", dt[0]);
				 saveData.put("day", dt[1]);
				 saveData.put("radar", radarId);
				 saveData.put("noOfScans", scans);
				 
			 }
             catch(JSONException ex1) {
				 ex1.printStackTrace();
			 }
            //byte[] message = data.tobyteArray();
            try {
				channel.basicPublish("", QUEUE_NAME, null, data.toString().getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println(" [x] Sent '" + data + "'");
			try{
				channel1.basicPublish("", QUEUE1,null, saveData.toString().getBytes());
			}
			catch(IOException ex){
				ex.printStackTrace();
			}
			System.out.println("Data saved to database");
			} catch (IOException | TimeoutException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

        return "RadarData";
		
	}
}
