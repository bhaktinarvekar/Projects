package com.oosd.project.courserater;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Feedback
{
    @Id
    private String id;
    private String courseId;
    private int timeConsumedPerWeek;
    private int assignDifficulty;
    private int midtermDifficulty;
    private int finalDifficulty;
    private int overallDifficulty;

    /*assignDifficulty: 0
finalDifficulty: 0
midtermDifficulty: 0
overallDifficulty: 0
    * */
    public String getCourseId() {
        return courseId;
    }
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
    public int getTimeConsumedPerWeek() {
        return timeConsumedPerWeek;
    }

    public void setTimeConsumedPerWeek(int timeConsumedPerWeek) {
        this.timeConsumedPerWeek = timeConsumedPerWeek;
    }

    public int getAssignDifficulty() {
        return assignDifficulty;
    }

    public void setAssignDifficulty(int assignDifficulty) {
        this.assignDifficulty = assignDifficulty;
    }

    public int getMidtermDifficulty() {
        return midtermDifficulty;
    }

    public void setMidtermDifficulty(int midtermDifficulty) {
        this.midtermDifficulty = midtermDifficulty;
    }

    public int getFinalDifficulty() {
        return finalDifficulty;
    }

    public void setFinalDifficulty(int finalDifficulty) {
        this.finalDifficulty = finalDifficulty;
    }

    public int getOverallDifficulty() {
        return overallDifficulty;
    }

    public void setOverallDifficulty(int overallDifficulty) {
        this.overallDifficulty = overallDifficulty;
    }
}
