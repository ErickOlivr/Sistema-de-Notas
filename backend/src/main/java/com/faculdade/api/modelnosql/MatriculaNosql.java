package com.faculdade.api.modelnosql;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(collection = "matricula")
@Data
public class MatriculaNosql {
    

    @Id
    String idMatricula;
    String idTurma;
    String NomeEstudante;
    String Status;
}
