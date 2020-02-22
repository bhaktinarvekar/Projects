package com.oosd.project.courserater;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

public class UserClassTests extends CourseRaterTests {


    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void alUsers() throws Exception {
        mockMvc.perform(get("/allusers")).andExpect(status().isOk());
    }
    @Test
    public void users() throws Exception {
        mockMvc.perform(get("/users")).andExpect(status().isOk());
    }
    @Test
    public void subscribeToCourse() throws Exception {
        mockMvc.perform(put("/users/5dc77b090cbb325607da2370/subscribe")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString("5de2f7a9b06372ae439d54ed"))).
                andExpect(status().isOk());
    }


}
