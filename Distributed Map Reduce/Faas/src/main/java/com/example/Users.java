package com.example;

import java.io.Serializable;

public class Users implements Serializable {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    public Users(String username, String password, String firstName, String lastName){
        this.username = username;
        this.password = password;
        this.firstName=firstName;
        this.lastName=lastName;
    }
}
