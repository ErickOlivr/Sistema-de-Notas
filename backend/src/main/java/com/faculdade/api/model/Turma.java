package com.faculdade.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "turma", schema = "universidade")
public class Turma {

    @Id
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "turma_sequence")
    //@SequenceGenerator(name = "turma_sequence", sequenceName = "universidade.seq_turma", allocationSize = 1)
    @Column(name = "id_turma")
    private Integer idTurma;

    @Column(name = "numero")
    private Integer numero;

    @ManyToOne
    @JoinColumn(name = "cod_disc")
    private Disciplina disciplina;

    @Column(name = "ano")
    private Short ano;

    @Column(name = "semestre")
    private Short semestre;

    @ManyToMany
    @JoinTable(
        name = "leciona",
        schema = "universidade",
        joinColumns = @JoinColumn(name = "id_turma"),
        inverseJoinColumns = @JoinColumn(name = "mat_professor")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "usuario"}) 
    private List<Professor> professores = new ArrayList<>();

    public Turma() {}

    public Integer getIdTurma() { return idTurma; }
    public void setIdTurma(Integer idTurma) { this.idTurma = idTurma; }

    public Integer getNumero() { return numero; }
    public void setNumero(Integer numero) { this.numero = numero; }

    public Short getAno() { return ano; }
    public void setAno(Short ano) { this.ano = ano; }

    public Short getSemestre() { return semestre; }
    public void setSemestre(Short semestre) { this.semestre = semestre; }

    public Disciplina getDisciplina() { return disciplina; }
    public void setDisciplina(Disciplina disciplina) { this.disciplina = disciplina; }

    public List<Professor> getProfessores() { return professores; }
    public void setProfessores(List<Professor> professores) { this.professores = professores; }
}