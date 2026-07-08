package com.faculdade.api.dto;

public class LancamentoNotaDTO {
    private String matEstudante;
    private Long idTurma;
    private Double nota1;
    private Double nota2;
    private Double nota3;
    private Integer faltas;

    // --- GETTERS E SETTERS ---
    public String getMatEstudante() { return matEstudante; }
    public void setMatEstudante(String matEstudante) { this.matEstudante = matEstudante; }

    public Long getIdTurma() { return idTurma; }
    public void setIdTurma(Long idTurma) { this.idTurma = idTurma; }

    public Double getNota1() { return nota1; }
    public void setNota1(Double nota1) { this.nota1 = nota1; }

    public Double getNota2() { return nota2; }
    public void setNota2(Double nota2) { this.nota2 = nota2; }

    public Double getNota3() { return nota3; }
    public void setNota3(Double nota3) { this.nota3 = nota3; }

    public Integer getFaltas() { return faltas; }
    public void setFaltas(Integer faltas) { this.faltas = faltas; }
}