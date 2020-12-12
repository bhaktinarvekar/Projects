package com.randomerror.usermanagement.receive.controller;

import com.randomerror.usermanagement.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.randomerror.usermanagement.receive.repository.UserRepository;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@EnableWebMvc
@ComponentScan({"com.randomerror.usermanagement.repository"})
public class RegisterReceiveUserController {
    @Autowired
    private static UserRepository repository;

    @RequestMapping(value = "/home/register")
    String home(){
        System.out.print("In Register Receiver home");
        return "register receiver Welcome";
    }
    public RegisterReceiveUserController(UserRepository repository){
        System.out.print("In receiver usercontroller");
        this.repository = repository;
    }
    @RequestMapping(value = "/userRegister", method = RequestMethod.POST)
    public static ResponseEntity<String> receiverRegister(@RequestBody LinkedHashMap map) {
        Pattern pattern = Pattern.compile("[a-zA-Z]*");
        String fname = ((String)map.get("firstName")).trim();
        String lname = ((String)map.get("lastName")).trim();
        String uname = ((String)map.get("username")).trim();
        String pwd = ((String)map.get("password")).trim();
        if(fname.isEmpty() || lname.isEmpty() || uname.isEmpty() || pwd.isEmpty()){
            System.out.println("in empty if");
            return ResponseEntity.ok("empty");
        }
        Matcher fnameMatcher = pattern.matcher(fname);
        Matcher lnameMatcher = pattern.matcher(lname);
        if(!fnameMatcher.matches() || !lnameMatcher.matches()){
            return ResponseEntity.ok("invalid");
        }
        System.out.println(map.keySet());
        System.out.println(map.values());
        String s = (String) map.get("firstName");
        System.out.println("s"+ s);
        Users user = new Users();
        user.setFirstName((String)map.get("firstName"));
        user.setLastName((String)map.get("lastName"));
        user.setUsername((String)map.get("username"));
        user.setPassword((String)map.get("password"));
        Users user1 = repository.findByUsername((String)map.get("username"));
        System.out.println("User1 :" +user1);
        if(user1!=null){
            System.out.println("in exist if");
            return ResponseEntity.ok("exist");
        }
        else {
            repository.save(user);
            System.out.println("user saved");
            return null;
        }
    }
}
