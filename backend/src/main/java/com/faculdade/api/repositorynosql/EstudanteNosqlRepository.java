package com.faculdade.api.repositorynosql;


import com.faculdade.api.modelnosql.EstudanteNosql;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EstudanteNosqlRepository extends MongoRepository<EstudanteNosql, String> {
    // O Spring Data MongoDB extende as principais funções do CRUD: save(), findById(), deleteById(), findAll()
}