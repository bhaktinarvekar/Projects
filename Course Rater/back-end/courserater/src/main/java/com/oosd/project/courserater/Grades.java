package com.oosd.project.courserater;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Grades
{
    @Id
    private String id;
    private String termDescription;
    private String department;
    private String subject;
    private  int courseNumber;
    private String courseName;
    private String instructorName;
    private int gpaGrades;
    private int totalGrades;
    private String avgGPA;
    private String avgCumGPA;
    private String percentAllA;
    private String percentAllB;
    private String percentAllC;
    private String percentAllD;
    private String percentAllOther;
    private String numAPlus;
    private String numA;
    private String numAMinus;
    private String numBPlus;
    private String numB;
    private String numBMinus;
    private String numCPlus;
    private String numC;
    private String numCMinus;
    private String numDPlus;
    private String numD;
    private String numDMinus;
    private String numF;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTermDescription() {
        return termDescription;
    }

    public void setTermDescription(String termDescription) {
        this.termDescription = termDescription;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public int getGpaGrades() {
        return gpaGrades;
    }

    public void setGpaGrades(int gpaGrades) {
        this.gpaGrades = gpaGrades;
    }

    public int getTotalGrades() {
        return totalGrades;
    }

    public void setTotalGrades(int totalGrades) {
        this.totalGrades = totalGrades;
    }

    public String getAvgGPA() {
        return avgGPA;
    }

    public void setAvgGPA(String avgGPA) {
        this.avgGPA = avgGPA;
    }

    public String getAvgCumGPA() {
        return avgCumGPA;
    }

    public void setAvgCumGPA(String avgCumGPA) {
        this.avgCumGPA = avgCumGPA;
    }

    public String getPercentAllA() {
        return percentAllA;
    }

    public void setPercentAllA(String percentAllA) {
        this.percentAllA = percentAllA;
    }

    public String getPercentAllB() {
        return percentAllB;
    }

    public void setPercentAllB(String percentAllB) {
        this.percentAllB = percentAllB;
    }

    public String getPercentAllC() {
        return percentAllC;
    }

    public void setPercentAllC(String percentAllC) {
        this.percentAllC = percentAllC;
    }

    public String getPercentAllD() {
        return percentAllD;
    }

    public void setPercentAllD(String percentAllD) {
        this.percentAllD = percentAllD;
    }

    public String getPercentAllOther() {
        return percentAllOther;
    }

    public void setPercentAllOther(String percentAllOther) {
        this.percentAllOther = percentAllOther;
    }

    public String getNumAPlus() {
        return numAPlus;
    }

    public void setNumAPlus(String numAPlus) {
        this.numAPlus = numAPlus;
    }

    public String getNumA() {
        return numA;
    }

    public void setNumA(String numA) {
        this.numA = numA;
    }

    public String getNumAMinus() {
        return numAMinus;
    }

    public void setNumAMinus(String numAMinus) {
        this.numAMinus = numAMinus;
    }

    public String getNumBPlus() {
        return numBPlus;
    }

    public void setNumBPlus(String numBPlus) {
        this.numBPlus = numBPlus;
    }

    public String getNumB() {
        return numB;
    }

    public void setNumB(String numB) {
        this.numB = numB;
    }

    public String getNumBMinus() {
        return numBMinus;
    }

    public void setNumBMinus(String numBMinus) {
        this.numBMinus = numBMinus;
    }

    public String getNumCPlus() {
        return numCPlus;
    }

    public void setNumCPlus(String numCPlus) {
        this.numCPlus = numCPlus;
    }

    public String getNumC() {
        return numC;
    }

    public void setNumC(String numC) {
        this.numC = numC;
    }

    public String getNumCMinus() {
        return numCMinus;
    }

    public void setNumCMinus(String numCMinus) {
        this.numCMinus = numCMinus;
    }

    public String getNumDPlus() {
        return numDPlus;
    }

    public void setNumDPlus(String numDPlus) {
        this.numDPlus = numDPlus;
    }

    public String getNumD() {
        return numD;
    }

    public void setNumD(String numD) {
        this.numD = numD;
    }

    public String getNumDMinus() {
        return numDMinus;
    }

    public void setNumDMinus(String numDMinus) {
        this.numDMinus = numDMinus;
    }

    public String getNumF() {
        return numF;
    }

    public void setNumF(String numF) {
        this.numF = numF;
    }
}