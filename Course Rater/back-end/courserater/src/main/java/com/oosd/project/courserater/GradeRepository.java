package com.oosd.project.courserater;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "grades", path = "grades")
    public interface GradeRepository extends MongoRepository<Grades,String>
    {
        public List<Grades> findByCourseNumber(int courseNumber);
    }

