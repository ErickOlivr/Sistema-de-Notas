package com.faculdade.api.modelnosql;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;

public class CursoNosql {
    @Id
    private String idCurso; // Chave primária do MongoDB

    @NotBlank(message = "O nome do curso é obrigatório") // Restrição Not Null
    @Indexed(unique = true) // Restrição de Chave: impede nomes duplicados
    private String nome;

    @NotBlank(message = "O departamento do curso é obrigatório") // Restrição de Domínio
    private String departamento;
}

