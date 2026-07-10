package com.faculdade.api.repository;

import com.faculdade.api.model.Estudante;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, String> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO universidade.estudante (mat_estudante, cpf, ano_ingresso) VALUES (:matricula, CAST(:cpf AS NUMERIC), :ano)", nativeQuery = true)
    void salvarEstudanteNativo(@Param("matricula") String matricula, @Param("cpf") String cpf, @Param("ano") Integer ano);
    @Query("SELECT e FROM Estudante e JOIN FETCH e.usuario")
    List<Estudante> findAll();
}