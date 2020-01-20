package com.oosd.project.courserater;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "coursedashboard", path = "coursedashboard")
public interface CourseDashboardRepository extends MongoRepository<User, String>
{
//   List<User> findById(String id);
}
