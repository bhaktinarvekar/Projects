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
public class FeedbackClassTests  extends CourseRaterTests {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
    @Test
    public void overallResponses() throws Exception {
        mockMvc.perform(get("/overallresponse/5de2f7a9b06372ae439d5511")).andExpect(status().isOk());

    }
    @Test
    public void assignResponses() throws Exception {
        mockMvc.perform(get("/assignresponse/5de2f7a9b06372ae439d5511")).andExpect(status().isOk());

    }
    @Test
    public void midtermresponse() throws Exception {
        mockMvc.perform(get("/midtermresponse/5de2f7a9b06372ae439d5511")).andExpect(status().isOk());

    }
    @Test
    public void retrievefeedback() throws Exception {
        mockMvc.perform(get("/retrievefeedback/5de2f7a9b06372ae439d5511")).andExpect(status().isOk());

    }
    @Test
    public void timeconsumedperweek() throws Exception {
        mockMvc.perform(get("/timeconsumedperweek/5de2f7a9b06372ae439d5511")).andExpect(status().isOk());

    }

//    @Test
//    public void addFeedback() throws Exception {
//        mockMvc.perform(post("/addfeedback")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString(new Feedback("5de2f7a9b06372ae439d5511",5,5,5,6,7)))).andExpect(status().isOk());
//
//    }
}
