package com.oosd.project.courserater;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "courses", path = "courses")
public interface CourseRepository extends MongoRepository<Course,String>
{
    public List<Course> findCoursesByCourseNameContainingOrCourseNumberContainingOrDepartmentContainingOrSubjectContaining(String courseName, String courseNumber, String department, String subject);
    public List<Course> findCoursesByCourseNumberEquals(String courseNumber);
    public Course findCourseById(String id);
    public Course findCourseByCourseNumber(String courseNumber);

}
