package main.java.com.example.controller;


import org.springframework.stereotype.Controller;

@Controller
public class SessionController
{
    @PostMapping(value="/fetchBook")
    public void fetchBook(@RequestParam("bookurl") String book)
    {

    }


}

