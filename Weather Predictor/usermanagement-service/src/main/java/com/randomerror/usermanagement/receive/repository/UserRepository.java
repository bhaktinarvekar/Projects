package com.randomerror.usermanagement.receive.repository;

import com.randomerror.usermanagement.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource
public interface UserRepository extends MongoRepository<Users, String> {
    public Users findByUsername(String username);
}
