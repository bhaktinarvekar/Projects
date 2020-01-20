package com.oosd.project.courserater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class FeedbackController
{
    FeedbackService service = new FeedbackService();
    private final FeedbackRepository repository;
    //private final CourseRepository courseRepo;
    @Autowired
    MongoTemplate mongoTemplate;
//    private FeedbackRepository repository1;

    public FeedbackController(FeedbackRepository repository){
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addfeedback")
    public Feedback addFeedback(@RequestBody Feedback f)
    {
        return repository.save(f);
    }

<<<<<<< HEAD
    @CrossOrigin(origins = "http://localhost:3000")
=======
    @CrossOrigin(origins = "*")
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
    @GetMapping("/retrievefeedback/{courseId}")
    public void getFeedBack(@PathVariable String courseId)
    {
        service.getFeedbackValues(repository,courseId);
    }
<<<<<<< HEAD
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/assignresponse/{courseId}")
    public int getAssignDiff(@PathVariable String courseId)
    {
       return service.assignResponses(service.getFeedbackValues(repository,courseId));
    }
    @CrossOrigin(origins = "http://localhost:3000")
=======
    @CrossOrigin(origins = "*")
    @GetMapping("/assignresponse/{courseId}")
    public int getAssignDiff(@PathVariable String courseId)
    {
        return service.assignResponses(service.getFeedbackValues(repository,courseId));
    }
    @CrossOrigin(origins = "*")
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
    @GetMapping("/midtermresponse/{courseId}")
    public int getMidTermDiff(@PathVariable String courseId)
    {
        return service.midtermResponses(service.getFeedbackValues(repository,courseId));
    }
<<<<<<< HEAD
    @CrossOrigin(origins = "http://localhost:3000")
=======
    @CrossOrigin(origins = "*")
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
    @GetMapping("/overallresponse/{courseId}")
    public int getOverallDiff(@PathVariable String courseId)
    {
        return service.overallResponses(service.getFeedbackValues(repository,courseId));
    }
<<<<<<< HEAD
    @CrossOrigin(origins = "http://localhost:3000")
=======
    @CrossOrigin(origins = "*")
>>>>>>> 7a787efa519035b9913e7ca0c7f5edbd7cb77d9f
    @GetMapping("/timeconsumedperweek/{courseId}")
    public int getTimeConsumed(@PathVariable String courseId)
    {
        return service.timeConsumedResponses(service.getFeedbackValues(repository, courseId));
    }


}