package com.oosd.project.courserater;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "test", path = "test")
public interface TestingRepository extends MongoRepository<TestingClass,String> {

}