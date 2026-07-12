package com.faculdade.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MatriculaDTO {

    @NotBlank(message = "A matrícula do estudante é obrigatória")
    private String matEstudante;

    @NotNull(message = "O ID da turma é obrigatório")
    private Integer idTurma;

    // Construtor Padrão
    public MatriculaDTO() {
    }

    // Getters e Setters
    public String getMatEstudante() {
        return matEstudante;
    }

    public void setMatEstudante(String matEstudante) {
        this.matEstudante = matEstudante;
    }

public Integer getIdTurma() { return idTurma; }
public void setIdTurma(Integer idTurma) { this.idTurma = idTurma; }

}