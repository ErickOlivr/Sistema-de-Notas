package com.faculdade.api.repositorynosql;

import com.faculdade.api.modelnosql.CursaNosql;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CursaNosqlRepository extends MongoRepository<CursaNosql, String> {
    
}
