package com.faculdade.api.repository;

import com.faculdade.api.model.Estudante;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, String> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO estudante (mat_estudante, cpf, ano_ingresso) VALUES (:matricula, :cpf\\:\\:tipo_cpf, :ano)", nativeQuery = true)
    void salvarEstudanteNativo(@Param("matricula") String matricula, @Param("cpf") String cpf, @Param("ano") Integer ano);
}