package com.faculdade.api.model.pk;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CursaId implements Serializable {

    @Column(name = "mat_estudante")
    private String matEstudante;

    @Column(name = "id_turma")
    private Integer idTurma; // <-- Atualizado para Integer para bater com a Turma!

    public CursaId() {}

    public CursaId(String matEstudante, Integer idTurma) {
        this.matEstudante = matEstudante;
        this.idTurma = idTurma;
    }

    public String getMatEstudante() { return matEstudante; }
    public void setMatEstudante(String matEstudante) { this.matEstudante = matEstudante; }

    public Integer getIdTurma() { return idTurma; }
    public void setIdTurma(Integer idTurma) { this.idTurma = idTurma; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CursaId cursaId = (CursaId) o;
        return Objects.equals(matEstudante, cursaId.matEstudante) &&
               Objects.equals(idTurma, cursaId.idTurma);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matEstudante, idTurma);
    }
}