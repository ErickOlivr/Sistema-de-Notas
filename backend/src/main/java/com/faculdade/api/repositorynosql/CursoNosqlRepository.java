package com.faculdade.api.repositorynosql;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.faculdade.api.modelnosql.CursoNosql;

public interface CursoNosqlRepository extends MongoRepository<CursoNosql, String> {
}
