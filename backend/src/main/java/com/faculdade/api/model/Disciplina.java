package com.faculdade.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "disciplina", schema = "universidade")
public class Disciplina {

    @Id
    @Column(name = "cod_disc", length = 8)
    @JsonProperty("codDisc")
    private String codDisc;

    @Column(name = "nome", nullable = false)
    @JsonProperty("nome")
    private String nome;

    @Column(name = "carga_horaria")
    @JsonProperty("cargaHoraria")
    private Integer cargaHoraria;

    // --- GETTERS E SETTERS ---
    public String getCodDisc() { return codDisc; }
    public void setCodDisc(String codDisc) { this.codDisc = codDisc; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Integer getCargaHoraria() { return cargaHoraria; }
    public void setCargaHoraria(Integer cargaHoraria) { this.cargaHoraria = cargaHoraria; }
}