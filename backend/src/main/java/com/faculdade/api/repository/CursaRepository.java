package com.faculdade.api.repository;

import com.faculdade.api.model.Cursa;
import com.faculdade.api.model.pk.CursaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursaRepository extends JpaRepository<Cursa, CursaId> {

    // Gera um: SELECT * FROM Cursa WHERE mat_estudante = ?
    // Usado para buscar o boletim do aluno
    List<Cursa> findByIdMatEstudante(String matEstudante);

    // Gera um: SELECT * FROM Cursa WHERE id_turma = ?
    // Usado para listar o Diário de Classe do professor
    List<Cursa> findByIdIdTurma(Long idTurma);
}