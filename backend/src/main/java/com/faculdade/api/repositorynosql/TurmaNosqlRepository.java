package com.faculdade.api.repositorynosql;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.faculdade.api.modelnosql.TurmaNosql;

public interface TurmaNosqlRepository extends  MongoRepository<TurmaNosql, String>{
    
}
