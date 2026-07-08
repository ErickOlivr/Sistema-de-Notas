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
    private Long idTurma;

    // Construtor padrão obrigatório pelo JPA
    public CursaId() {}

    public CursaId(String matEstudante, Long idTurma) {
        this.matEstudante = matEstudante;
        this.idTurma = idTurma;
    }

    // Getters e Setters
    public String getMatEstudante() { return matEstudante; }
    public void setMatEstudante(String matEstudante) { this.matEstudante = matEstudante; }

    public Long getIdTurma() { return idTurma; }
    public void setIdTurma(Long idTurma) { this.idTurma = idTurma; }

    // Equals e HashCode são obrigatórios para chaves compostas
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CursaId cursaId = (CursaId) o;
        return Objects.equals(matEstudante, cursaId.matEstudante) && Objects.equals(idTurma, cursaId.idTurma);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matEstudante, idTurma);
    }
}