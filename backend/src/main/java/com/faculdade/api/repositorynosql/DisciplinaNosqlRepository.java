package com.faculdade.api.repositorynosql;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.faculdade.api.modelnosql.DisciplinaNosql;

public interface DisciplinaNosqlRepository extends MongoRepository<DisciplinaNosql, String> {
}
