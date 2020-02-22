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


    @CrossOrigin(origins = "*")
    @GetMapping("/retrievefeedback/{courseId}")
    public void getFeedBack(@PathVariable String courseId)
    {
        service.getFeedbackValues(repository,courseId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/assignresponse/{courseId}")
    public int getAssignDiff(@PathVariable String courseId)
    {
        return service.assignResponses(service.getFeedbackValues(repository,courseId));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/midtermresponse/{courseId}")
    public int getMidTermDiff(@PathVariable String courseId)
    {
        return service.midtermResponses(service.getFeedbackValues(repository,courseId));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/overallresponse/{courseId}")
    public int getOverallDiff(@PathVariable String courseId)
    {
        return service.overallResponses(service.getFeedbackValues(repository,courseId));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/timeconsumedperweek/{courseId}")
    public int getTimeConsumed(@PathVariable String courseId)
    {
        return service.timeConsumedResponses(service.getFeedbackValues(repository, courseId));
    }


}