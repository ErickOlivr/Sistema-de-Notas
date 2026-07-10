package com.faculdade.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "professor", schema = "universidade")
public class Professor {

    @Id
    @Column(name = "mat_professor", length = 12)
    private String matProfessor;

    @Column(name = "cpf", columnDefinition = "universidade.tipo_cpf")
    private String cpf;

    @OneToOne
    @JoinColumn(name = "cpf", referencedColumnName = "cpf", insertable = false, updatable = false)
    private Usuario usuario;

    @Column(name = "departamento", length = 5)
    private String departamento;

    public Professor() {}

    public String getMatProfessor() { return matProfessor; }
    public void setMatProfessor(String matProfessor) { this.matProfessor = matProfessor; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }

    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}