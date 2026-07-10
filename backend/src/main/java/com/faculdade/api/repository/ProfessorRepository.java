package com.faculdade.api.repository;

import com.faculdade.api.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, String> {
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO universidade.professor (mat_professor, cpf, departamento) VALUES (?1, CAST(?2 AS NUMERIC), ?3)", nativeQuery = true)
    void salvarProfessorNativo(String matProfessor, String cpf, String departamento);
    @Query("SELECT p FROM Professor p JOIN FETCH p.usuario")
    List<Professor> findAll();
    
}