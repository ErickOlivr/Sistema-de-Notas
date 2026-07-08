package com.faculdade.api.model;

import jakarta.persistence.*;

@Entity
// Força o Hibernate a ler do schema correto do seu dump
@Table(name = "turma", schema = "universidade")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    private Long idTurma;

    @Column(name = "numero")
    private Integer numero;

    @ManyToOne
    @JoinColumn(name = "cod_disc")
    private Disciplina disciplina;

    private Short ano;
    private Short semestre;

    // --- GETTERS E SETTERS ---
    public Long getIdTurma() { return idTurma; }
    public void setIdTurma(Long idTurma) { this.idTurma = idTurma; }

    public Integer getNumero() { return numero; }
    public void setNumero(Integer numero) { this.numero = numero; }

    public Short getAno() { return ano; }
    public void setShort(Short ano) { this.ano = ano; }

    public Short getSemestre() { return semestre; }
    public void setSemestre(Short semestre) { this.semestre = semestre; }

    public Disciplina getDisciplina() { return disciplina; }
    public void setDisciplina(Disciplina disciplina) { this.disciplina = disciplina; }
}