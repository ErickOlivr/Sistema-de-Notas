package com.faculdade.api.repository;

import com.faculdade.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO universidade.usuario (cpf, nome, login, senha) VALUES (CAST(?1 AS NUMERIC), ?2, ?3, ?4)", nativeQuery = true)
    void salvarUsuarioNativo(String cpf, String nome, String login, String senha);
}