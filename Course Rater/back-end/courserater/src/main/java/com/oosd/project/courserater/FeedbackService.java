package com.oosd.project.courserater;

import com.oosd.project.courserater.Feedback;
import com.oosd.project.courserater.FeedbackRepository;

import java.util.ArrayList;
import java.util.List;

public class FeedbackService
{
//    int totalMidDiff = 0;
//    int totalAssignDiff = 0;
//    int totalOverallDiff = 0;
//    int totalTimePerWeek = 0;
//
//    int avgMidDiff;
//    int avgAssignDiff;
//    int avgOverallDiff;
//    int avgTimePerWeek;



    List<Feedback> feedbackArray = new ArrayList<>();

    public ArrayList<Feedback> getFeedbackValues(FeedbackRepository repository, String courseId)
    {
<<<<<<< HEAD
            feedbackArray = (ArrayList)repository.findByCourseId(courseId);
            assignResponses(feedbackArray);
            midtermResponses(feedbackArray);
            timeConsumedResponses(feedbackArray);
            overallResponses(feedbackArray);
            return (ArrayList<Feedback>) feedbackArray;
=======
        feedbackArray = (ArrayList)repository.findByCourseId(courseId);
        assignResponses(feedbackArray);
        midtermResponses(feedbackArray);
        timeConsumedResponses(feedbackArray);
        overallResponses(feedbackArray);
        return (ArrayList<Feedback>) feedbackArray;
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
    }

    public int assignResponses(List<Feedback> feedbackArray)
    {
        int res = 0;
        for(Feedback f: feedbackArray){
            res+=f.getAssignDifficulty();
        }
        if (feedbackArray.size()>0){
            res=res/feedbackArray.size();
        }
        return res;
    }

    public int midtermResponses(List<Feedback> feedbackArray)
    {
        int res = 0;
        for(Feedback f: feedbackArray){
            res+=f.getMidtermDifficulty();
        }
        if (feedbackArray.size()>0){
            res=res/feedbackArray.size();
        }
        return res;
    }

    public int overallResponses(List<Feedback> feedbackArray)
    {
        int res = 0;
        for(Feedback f: feedbackArray){
            res+=f.getOverallDifficulty();
        }
        if (feedbackArray.size()>0){
            res=res/feedbackArray.size();
        }
        return res;
    }

    public int timeConsumedResponses(List<Feedback> feedbackArray)
    {
        int res = 0;
        for(Feedback f: feedbackArray){
            res+=f.getTimeConsumedPerWeek();
        }
        if (feedbackArray.size()>0){
            res=res/feedbackArray.size();
        }
        return res;

//        for(int i=0; i<responsesTimeConsumed.length; i++)
//            System.out.print(responsesTimeConsumed[i]+" ");
    }

}
