package com.faculdade.api.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class LancamentoNotaDTO {

    @NotBlank(message = "A matrícula do estudante é obrigatória")
    private String matEstudante;

    @NotNull(message = "O ID da turma é obrigatório")
    private Long idTurma;

    @NotNull(message = "A nota não pode ser nula")
    @DecimalMin(value = "0.0", message = "A nota mínima permitida é 0.0")
    @DecimalMax(value = "10.0", message = "A nota máxima permitida é 10.0")
    private BigDecimal nota;

    // Construtor Padrão
    public LancamentoNotaDTO() {
    }

    // Getters e Setters
    public String getMatEstudante() {
        return matEstudante;
    }

    public void setMatEstudante(String matEstudante) {
        this.matEstudante = matEstudante;
    }

    public Long getIdTurma() {
        return idTurma;
    }

    public void setIdTurma(Long idTurma) {
        this.idTurma = idTurma;
    }

    public BigDecimal getNota() {
        return nota;
    }

    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }
}