package com.faculdade.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario", schema = "universidade")
public class Usuario {

    @Id
    @Column(name = "cpf", columnDefinition = "universidade.tipo_cpf")
    private String cpf;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "login", unique = true, length = 45)
    private String login;

    @Column(name = "senha", length = 32)
    private String senha;

    public Usuario() {}

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}