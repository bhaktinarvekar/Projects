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

public class CourseControllerRaterTests extends CourseRaterTests {


    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void filterCourses() throws Exception {
        mockMvc.perform(get("/filterCourses/?query=oosd")).andExpect(status().isOk());

    }
    @Test
    public void testCourses() throws Exception {
        mockMvc.perform(get("/allcourses")).andExpect(status().isOk());

    }
    @Test
    public void findCourseByCourseNumber() throws Exception {
        mockMvc.perform(post("/courseobjects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new String[] {"A","B","C"}))).andExpect(status().isOk());

    }
//    @Test
//    public void testCourses() throws Exception {
//        mockMvc.perform(get("/allcourses")).andExpect(status().isOk());
//
//    }


}
