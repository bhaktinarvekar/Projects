package com.example.controller;

import com.example.Users;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
	

    public String username="";

    @GetMapping("/")
    String login() {
        System.out.print("In Register home");
        return "Register";
    }
    @GetMapping("/home")
    String homeRegister() {
        System.out.print("In Register home");
        return "Register";
    }

    @GetMapping("/homeLogin")
    String homeLogin() {
        System.out.print("In Login home");
        return "Login";
    }

    public UserController() {
        System.out.print("In usercontroller");
    }

    @PostMapping("/register")
    public String register(ModelMap model, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("password") String password,@RequestParam("username") String username)  {
        System.out.println("In register user");
        System.out.println(firstName);
        System.out.println(lastName);
        System.out.println(username);
        System.out.println(password);
//        Users user = new Users(username,password,firstName, lastName);
        HttpHeaders headers = new HttpHeaders();
        // set `content-type` header
        headers.setContentType(MediaType.APPLICATION_JSON);
        // set `accept` header
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // create a map for post parameters
        Map<String, Object> map = new HashMap<>();
        map.put("firstName", firstName);
        map.put("lastName", lastName);
        map.put("password",password);
        map.put("username", username);

        String url = "http://localhost:8081/userRegister";
        RestTemplate restTemplate = new RestTemplate();
        // build the request
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);

        // send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
        System.out.println("resp body in reg:"+ response.getBody());
        // check response status code
        if (response.getBody()!=null) {
            if(response.getBody().equals("empty"))
                model.put("errorMessage","None of the fields can be empty or contain only spaces");
            else if(response.getBody().equals("exist"))
                model.put("errorMessage","Username already Exist");
            else if(response.getBody().equals("invalid"))
                model.put("errorMessage","Name must contain letters only");
            return "Register";
        }
        return "Login";
    }

    @PostMapping(value = "/login")
//    @ResponseBody
    public String login(HttpSession session, ModelMap  model, @RequestParam("username") String username, @RequestParam("password") String password)  {
        System.out.println("Username:"+username+" password:"+password);
        HttpHeaders headers = new HttpHeaders();
        // set `content-type` header
        headers.setContentType(MediaType.APPLICATION_JSON);
        // set `accept` header
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // create a map for post parameters
        Map<String, Object> map = new HashMap<>();
        map.put("username", username);
        map.put("password",password);


        String url = "http://localhost:8081/userLogin";
        RestTemplate restTemplate = new RestTemplate();
        // build the request
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);

        // send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
        System.out.println("response: "+response);
        System.out.println("response body: "+response.getBody());
        System.out.println("response code:" +response.getStatusCode());
        System.out.println("response headers:" +response.getHeaders().get("Set-Cookie").get(0).getClass());
        if(response.getBody()!=null){
            if(response.getBody().equals("empty")){
                model.put("errorMessage","None of the fields can be empty or contain only spaces");
                return "Login";
            }
            else {
                String username1 = response.getBody();
                session.setAttribute("username", username1);
                System.out.println("valid :" + username1);
                isValidUser(username1);
                return "RadarData";
            }
        }
        else{
            model.put("errorMessage","Invalid Credentials");
            return "Login";
        }
    }
    public String isValidUser(String username){
        this.username = username;
        return username;
    }

    public String getUsername() {
        return username;
    }

    @GetMapping("/homeLogout")
    String homeLogout(HttpServletRequest request) {
        System.out.println("In Login out");
        System.out.println("logout: " + request.getSession().getAttribute("username"));
        System.out.println("logout: " + request.getSession().getId());
        request.getSession().invalidate();
        return "Login";
    }

}
