package com.faculdade.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "turma", schema = "universidade")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    @JsonProperty("idTurma")
    private Long idTurma;

    @Column(name = "cod_disc", length = 8, nullable = false)
    @JsonProperty("disciplina")
    private String disciplina;

    @Column(name = "turma", nullable = false)
    @JsonProperty("codigoTurma") // Faz o Java entender o 'codigoTurma' que vem do React
    private Integer codigoTurma;

    @Column(name = "ano", nullable = false)
    @JsonProperty("ano")
    private Integer ano;

    @Column(name = "semestre", nullable = false)
    @JsonProperty("semestre")
    private Integer semestre;


    public Turma() {}

    public Long getId() {
        return idTurma;
    }

    public void setId(Long id) {
        this.idTurma = id;
    }

    public Long getIdTurma() { return idTurma; }
    public void setIdTurma(Long idTurma) { this.idTurma = idTurma; }

    public String getDisciplina() { return disciplina; }
    public void setDisciplina(String disciplina) { this.disciplina = disciplina; }

    public Integer getCodigoTurma() { return codigoTurma; }
    public void setCodigoTurma(Integer codigoTurma) { this.codigoTurma = codigoTurma; }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getSemestre() { return semestre; }
    public void setSemestre(Integer semestre) { this.semestre = semestre; }
}