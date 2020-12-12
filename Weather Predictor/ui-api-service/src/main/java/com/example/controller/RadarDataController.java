package com.example.controller;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;

import com.mongodb.client.MongoClients;
import com.mongodb.Block;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.BsonValue;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.gridfs.*;
import com.mongodb.client.gridfs.model.*;
import java.io.*;
import static com.mongodb.client.model.Filters.eq;



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
        factory.setHost("rabbitmq-test");
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
	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/getPlots", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public void results(HttpServletResponse response) {
		MongoClient mongoClient = MongoClients.create("mongodb://sgaUser:sga123@cluster0-shard-00-00-moj0w.mongodb.net:27017,cluster0-shard-00-01-moj0w.mongodb.net:27017,cluster0-shard-00-02-moj0w.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority");
		MongoDatabase myDatabase = mongoClient.getDatabase("plots");
		GridFSBucket gridFSBucket = GridFSBuckets.create(myDatabase);
		String username = userController.getUsername();
		GridFSFindIterable files = gridFSBucket.find(eq("username", username));
		
		//for(GridFSFile file:files) {
		gridFSBucket.find(eq("username", username)).sort(eq("uploadDate",-1)).forEach(new Block<GridFSFile>() {
			   @Override
			   public void apply(final GridFSFile file) {
			System.out.println(file.getFilename());
			BsonValue fileId=file.getId(); //The id of a file uploaded to GridFS, initialize to valid file id 

			try {
			    FileOutputStream streamToDownloadTo = new FileOutputStream("/plots/"+file.getFilename()+".png");
			    gridFSBucket.downloadToStream(fileId, streamToDownloadTo);
			    streamToDownloadTo.close();
			    System.out.println(streamToDownloadTo.toString());
			} catch (IOException e) {
			    // handle exception
			}
			try {
			GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(fileId);
			int fileLength = (int) downloadStream.getGridFSFile().getLength();
			byte[] bytesToWriteTo = new byte[fileLength];
			
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			int nRead; 
			while ((nRead = downloadStream.read(bytesToWriteTo, 0, bytesToWriteTo.length)) != -1) {
                buffer.write(bytesToWriteTo, 0, nRead);
            }
			
			buffer.flush();
			byte[]imagenEnBytes = buffer.toByteArray();
			
			response.setHeader("Accept-ranges","bytes");
            response.setContentType( "image/jpeg" );
            response.setContentLength(imagenEnBytes.length);
            response.setHeader("Expires","0");
            response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
            response.setHeader("Content-Description","File Transfer");
            response.setHeader("Content-Transfer-Encoding:","binary");

            OutputStream out = response.getOutputStream();
            out.write( imagenEnBytes );
            out.flush();
            out.close();
			
			downloadStream.close();
			
			

		
			
			
			}
			catch(Exception e) {
				
			}
			
		}
	});
		
	}
	
}
