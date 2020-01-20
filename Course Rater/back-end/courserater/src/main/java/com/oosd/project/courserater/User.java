package com.oosd.project.courserater;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;

    public List<String> getCoursesSubscribed() {
        if (coursesSubscribed!=null)
            return coursesSubscribed;
        else
            return new ArrayList<String>();
    }

    public void setCoursesSubscribed(List<String> coursesSubscribed) {
        this.coursesSubscribed = coursesSubscribed;
    }
    public void subscribeCourse(String courseId){
        if(coursesSubscribed==null) {
            coursesSubscribed = new ArrayList<String>();
        }

        coursesSubscribed.add(courseId);
    }

    private List<String> coursesSubscribed;
    public int getCoins() {
        return coins;
    }
    public void setCoins(int coins) {
        this.coins = coins;
    }

    private int coins;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
