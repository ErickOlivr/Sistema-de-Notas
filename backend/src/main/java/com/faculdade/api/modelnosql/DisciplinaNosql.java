package com.faculdade.api.modelnosql;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Document(collection = "disciplina")
@Data
public class DisciplinaNosql {

    @Id
    private String idDisciplina;

    @NotBlank(message = "O código da disciplina é obrigatório")
    @Indexed(unique = true) // Restrição de Chave Única
    private String codigo;

    @NotBlank(message = "O nome da disciplina é obrigatório")
    private String nome;

    @NotNull(message = "A quantidade de créditos é obrigatória")
    @Min(value = 1, message = "A disciplina deve ter no mínimo 1 crédito") // Restrição de Domínio
    private Integer creditos;
}