package com.oosd.project.courserater;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@EnableWebMvc
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository){
        this.repository = repository;
    }

    @GetMapping("/allusers")
    @CrossOrigin(origins = "*")
    public List<User> allUsers(){
        return repository.findAll();
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/users")
    public User findUser()
    {   Optional<User> userOptional = repository.findById("5dc77b090cbb325607da2370");
        User user = userOptional.get();
        return user;
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/userid")
    public User findUserById(@RequestBody String id){
        System.out.println("Reached find by user id");
        User user=repository.findUserById(id);
        return user;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/user/coins")
    public int coins(@RequestBody String id){
        System.out.println("Reached find by user id: " + id);
        User user=repository.findUserById(id.substring(0,id.length()-1));
        return user.getCoins();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/user/addcoins")
    public int addcoins(@RequestBody String id){
        System.out.println("Reached find by user id: " + id);
        User user=repository.findUserById(id.substring(0,id.length()-1));
        user.setCoins(user.getCoins()+30);
        repository.save(user);
        return user.getCoins();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/users")
    public User addUsers(@RequestBody User user){
        user.setCoins(100);
        return repository.save(user);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public String login(@RequestBody User user){
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        //System.out.println(user.getId());
        User u=repository.findUserByEmail(user.getEmail());
        System.out.println(u.getId());
        if(u!=null && u.getPassword().equals(user.getPassword())){
            return u.getId();
        }

        return null;
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/testlogin/{email}")
    public String login(@PathVariable String email,@RequestBody String password){
        System.out.println(email);
        System.out.println(password);
        User u=repository.findUserByEmail(email);
        System.out.println(u.getId());
        if(u==null)
            System.out.println("It is null ");
        else if(u.getPassword().equals(password)){
            return u.getId();
        }

        return null;
    }


    @CrossOrigin(origins = "*")
    @PutMapping("users/{userId}/subscribe")
    public User subscribeToCourse(@RequestBody String courseId, @PathVariable String userId){
        ArrayList<String> courses = new ArrayList<>();

        Optional<User> userOptional = repository.findById(userId);
        System.out.println(userOptional);
        if(!userOptional.isPresent()){
            return null;
        }
        User user = userOptional.get();

        courses = (ArrayList<String>) user.getCoursesSubscribed();
        if(courses.contains(courseId))
        {
            return user;
        }
        else {
            user.subscribeCourse(courseId);
            user.setCoins(user.getCoins() - 10);
            repository.save(user);
            return user;
        }
    }



}