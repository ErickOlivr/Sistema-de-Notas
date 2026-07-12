package com.faculdade.api.modelnosql;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "turma")
@Data
public class TurmaNosql {

    @Id
    private String idTurma; // Identificador único no Mongo

    @NotBlank(message = "O código/nome da turma é obrigatório")
    private String codigoTurma; // Ex: "T01"

    @NotBlank(message = "O ID da disciplina vinculada é obrigatório")
    private String idDisciplina; // Restrição de Integridade Referencial controlada por código[cite: 1]

    @NotBlank(message = "O semestre letivo é obrigatório")
    private String semestre; // Ex: "2026.1"
}
