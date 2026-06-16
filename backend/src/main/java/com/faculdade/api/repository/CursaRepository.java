package com.faculdade.api.repository;

import com.faculdade.api.model.Cursa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CursaRepository extends JpaRepository<Cursa, Object> {

    // ADICIONE ESTE: Busca as matrículas pelo código/matrícula do estudante
    List<Cursa> findByEstudanteMatEstudante(String matEstudante);

    @Query(value = "SELECT * FROM cursa c WHERE c.id_turma = ?1", nativeQuery = true)
    List<Cursa> findByTurmaIdTurma(Long idTurma);

    @Transactional
    @Modifying
    @Query("DELETE FROM Cursa c WHERE c.estudante.matEstudante = ?1 AND c.turma.idTurma = ?2")
    void deletarMatricula(String matEstudante, Long idTurma);
}