package com.oosd.project.courserater;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
public class GradesController
{
    GradesService gradesService = new GradesService();

    private final GradeRepository gradeRepository;
    List<Grades> gradesArray = new ArrayList<>();

    public GradesController(GradeRepository gradeRepository)
    {
        this.gradeRepository = gradeRepository;
    }
    @CrossOrigin(origins = "*")
        @PostMapping("/addgrades")
    public Grades addGrades(@RequestBody Grades g)
    {
        return gradeRepository.save(g);
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/retrievegrades")
    public ArrayList<Grades> getGrades(@RequestBody String courseNumber)
    {
         System.out.println("In retrieve grades "+courseNumber);
         gradesArray = gradeRepository.findByCourseNumber(Integer.parseInt(courseNumber.substring(0,courseNumber.length()-1)));
//         System.out.println(gradesArray);

//        System.out.println(gradeRepository.findAll());
        return (ArrayList<Grades>) gradesArray;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/totalgrades")
    public int[] getTotalGrades()
    {
        System.out.println(gradesService.getAllGrades((ArrayList<Grades>) gradesArray));
        return gradesService.getAllGrades((ArrayList<Grades>)gradesService.getGradesService(gradeRepository));
    }



}
