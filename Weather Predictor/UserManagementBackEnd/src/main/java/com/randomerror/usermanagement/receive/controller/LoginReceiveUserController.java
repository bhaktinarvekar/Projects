package com.randomerror.usermanagement.receive.controller;


import com.randomerror.usermanagement.Users;
import com.randomerror.usermanagement.receive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import javax.servlet.http.HttpSession;
import java.util.LinkedHashMap;


@RestController
@EnableWebMvc
@ComponentScan({"com.randomerror.usermanagement.repository"})
public class LoginReceiveUserController {
    @Autowired
    private static UserRepository repository;

    @RequestMapping(value = "/home/login")
    String home(){
        System.out.print("In Login Receiver home");
        return "login receiver Welcome";
    }

    public LoginReceiveUserController(UserRepository repository){
        System.out.print("In login receiver usercontroller");
        this.repository = repository;
    }
    @RequestMapping(value = "/userLogin", method = RequestMethod.POST)
    public static ResponseEntity<String> receiverLogin(HttpSession session, @RequestBody LinkedHashMap map) {

        System.out.println(map.keySet());
        System.out.println(map.values());
        String username = (String)map.get("username");
        String password = (String)map.get("password");
        if(username.trim().isEmpty() || password.trim().isEmpty()){
            System.out.println("in empty");
            return ResponseEntity.ok("empty");
        }
        String result = authenticateUser(username,password);
        if(result.equals("OK")){
            session.setAttribute("username", username);
            session.setAttribute("password", password);
            return ResponseEntity.ok(username);
        }
        return null;
    }

    private static String authenticateUser(String username, String password)  {
        String validUser = "NOK";
        System.out.print("in auth: " + username + password);
        Users user = repository.findByUsername(username);
        if(user!=null){
            if(user.getPassword().equals(password)){
                System.out.print("Here");
                validUser = "OK";
                return validUser;
            }
        }
        System.out.println("valid user: " +validUser);
        return validUser;
    }
}
