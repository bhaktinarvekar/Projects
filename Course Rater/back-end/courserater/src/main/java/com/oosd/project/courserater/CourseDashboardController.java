package com.oosd.project.courserater;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.oosd.project.courserater.CourseDashboardRepository;
import com.oosd.project.courserater.User;
import org.apache.tomcat.util.digester.ArrayStack;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseDashboardController
{
    CourseDashboardRepository repository;
    CourseDashboardController(CourseDashboardRepository repository)
    {
        this.repository = repository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/getallcourses")
    public List<String> getAllCourses(@RequestBody String id)
    {
        User u = null;
//        String[] allcourses = new String[10];
        List<String> allcourses = new ArrayList<String>();
        User user = new User();
        user.setId(id);
        System.out.println(user.getId());
        Optional<User> values = repository.findById(id);
        User user1 = values.get();
         return user1.getCoursesSubscribed();
    }
}
