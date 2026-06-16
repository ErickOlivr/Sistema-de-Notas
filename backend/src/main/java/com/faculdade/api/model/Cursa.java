package com.faculdade.api.model;

import com.faculdade.api.model.pk.CursaId;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Cursa")
public class Cursa {

    private Double nota1;
    private Double nota2;
    private Double nota3;
    private Integer faltas;

    @EmbeddedId
    private CursaId id = new CursaId();

    @ManyToOne
    @MapsId("matEstudante") // Mapeia para o atributo na classe CursaId
    @JoinColumn(name = "mat_estudante")
    private Estudante estudante;

    @ManyToOne
    @MapsId("idTurma") // Mapeia para o atributo na classe CursaId
    @JoinColumn(name = "id_turma")
    private Turma turma;

    @Column(name = "nota", precision = 4, scale = 2)
    private BigDecimal nota;

    // Construtor Padrão
    public Cursa() {}

    // Construtor para facilitar a matrícula
    public Cursa(Estudante estudante, Turma turma) {
        this.estudante = estudante;
        this.turma = turma;
        this.id.setMatEstudante(estudante.getMatEstudante());
        this.id.setIdTurma(turma.getIdTurma());
    }

    // Getters e Setters
    public CursaId getId() { return id; }
    public void setId(CursaId id) { this.id = id; }

    public Estudante getEstudante() { return estudante; }
    public void setEstudante(Estudante estudante) { this.estudante = estudante; }

    public Turma getTurma() { return turma; }
    public void setTurma(Turma turma) { this.turma = turma; }

    public BigDecimal getNota() { return nota; }
    public void setNota(BigDecimal nota) { this.nota = nota; }

    public Double getNota1() { return nota1; }
    public void setNota1(Double nota1) { this.nota1 = nota1; }

    public Double getNota2() { return nota2; }
    public void setNota2(Double nota2) { this.nota2 = nota2; }

    public Double getNota3() { return nota3; }
    public void setNota3(Double nota3) { this.nota3 = nota3; }

    public Integer getFaltas() { return faltas; }
    public void setFaltas(Integer faltas) { this.faltas = faltas; }
}