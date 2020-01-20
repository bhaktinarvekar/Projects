package com.oosd.project.courserater;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Course {
    public void setId(String id) {
        this.id = id;
    }
    @Id
    private String id;
    private String courseName;
    private String courseNumber;

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    private String department;
    private String subject;
    public String getId() {
        return id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
