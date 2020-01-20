<<<<<<< HEAD
package com.oosd.project.courserater;

import ch.qos.logback.core.net.SyslogOutputStream;
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
//            u = values.get(0);
//            for(int i=0; i<u.getCoursesSubscribed().size();i++)
//            {
//                allcourses.set(i, u.getCoursesSubscribed().get(i));
////                System.out.println(allcourses[i]);
//            }
//        return u.getCoursesSubscribed();


    }
}
=======
//package com.oosd.project.courserater;
//
//import ch.qos.logback.core.net.SyslogOutputStream;
//import org.apache.tomcat.util.digester.ArrayStack;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@CrossOrigin(origins = "*")
//@RestController
//public class CourseDashboardController
//{
//    CourseDashboardRepository repository;
//    CourseDashboardController(CourseDashboardRepository repository)
//    {
//        this.repository = repository;
//    }
//    @CrossOrigin(origins = "*")
//    @GetMapping("/getallcourses")
//    public String[] getAllCourses()
//=======
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/getallcourses")
//    public List<String> getAllCourses(@RequestBody String id)
//>>>>>>> c9fcb5394a65d7a53f123b3483ece7142dce1e65
//    {
//        User u = null;
////        String[] allcourses = new String[10];
//        List<String> allcourses = new ArrayList<String>();
//        User user = new User();
//        user.setId(id);
//        System.out.println(user.getId());
//        Optional<User> values = repository.findById(id);
//        User user1 = values.get();
//         return user1.getCoursesSubscribed();
////            u = values.get(0);
////            for(int i=0; i<u.getCoursesSubscribed().size();i++)
////            {
////                allcourses.set(i, u.getCoursesSubscribed().get(i));
//////                System.out.println(allcourses[i]);
////            }
////        return u.getCoursesSubscribed();
//
//
//    }
//}
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
