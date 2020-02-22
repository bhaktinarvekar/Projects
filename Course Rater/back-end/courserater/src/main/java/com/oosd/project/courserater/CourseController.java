package com.oosd.project.courserater;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CourseController {
    private final CourseRepository repository;
    public CourseController(CourseRepository repository){
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/allcourses")
    public List<Course> allCourses(){
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/postcourse")
    public Course addTest(@RequestBody Course c1){
        return repository.save(c1);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/filterCourses")
    public List<Course> filteredCourses(String query){
        query = query.toUpperCase();
        // List<Course> cn = repository.findCoursesByCourseNumberEquals()
        return repository.findCoursesByCourseNameContainingOrCourseNumberContainingOrDepartmentContainingOrSubjectContaining(query,query,query,query);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/courseid")
    public Course findCourseById(@RequestBody String id){
        Course course=repository.findCourseById(id);
        return course;
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/coursenumber")
    public Course findCourseByCourseNumber(@RequestBody String courseNumber){
        Course course=repository.findCourseByCourseNumber(courseNumber);
        return course;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/courseobjects")
    public List<Course> getCoursesByIds(@RequestBody String[] courseIds){

        for(String str: courseIds){
            System.out.println("dashboard : "+str);
        }
        List<Course> courses = new ArrayList<Course>();
        for (String courseId: courseIds){
            courses.add(repository.findCourseById(courseId));
        }
        return courses;
    }
}