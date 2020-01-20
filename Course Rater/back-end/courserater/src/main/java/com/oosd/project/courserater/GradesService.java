package com.oosd.project.courserater;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class GradesService
{
    List<Grades> gradesArray = new ArrayList<>();
    int[] allGrades = new int[13];

    public ArrayList<Grades> getGradesService(GradeRepository gradeRepository)
    {
        gradesArray = gradeRepository.findByCourseNumber(290);
        return (ArrayList<Grades>) gradesArray;
    }

    public int[] getAllGrades(ArrayList<Grades> gradesArray)
    {
        for(Grades g1 : gradesArray)
        {
            allGrades[0] = allGrades[0] + Integer.parseInt(g1.getNumAMinus());
            allGrades[1] = allGrades[1] + Integer.parseInt(g1.getNumA());
            allGrades[2] = allGrades[2] + Integer.parseInt(g1.getNumAPlus());
            allGrades[3] = allGrades[3] + Integer.parseInt(g1.getNumBMinus());
            allGrades[4] = allGrades[4] + Integer.parseInt(g1.getNumB());
            allGrades[5] = allGrades[5] + Integer.parseInt(g1.getNumBPlus());
            allGrades[6] = allGrades[6] + Integer.parseInt(g1.getNumCMinus());
            allGrades[7] = allGrades[7] + Integer.parseInt(g1.getNumC());
            allGrades[8] = allGrades[8] + Integer.parseInt(g1.getNumCPlus());
            allGrades[9] = allGrades[9] + Integer.parseInt(g1.getNumDMinus());
            allGrades[10] = allGrades[10] + Integer.parseInt(g1.getNumD());
            allGrades[11] = allGrades[11] + Integer.parseInt(g1.getNumDPlus());
            allGrades[12] = allGrades[12] + Integer.parseInt(g1.getNumF());
        }
        return allGrades;
    }
}
