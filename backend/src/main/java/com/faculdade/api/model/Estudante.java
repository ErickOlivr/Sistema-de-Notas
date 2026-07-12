package com.faculdade.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "Estudante")
public class Estudante {
    @Id
    @Column(name = "mat_estudante", length = 12)
    private String matEstudante;

    @Column(name = "mc")
    private Double mc;

    @Column(name = "cpf", columnDefinition = "universidade.tipo_cpf")
    private String cpf;

    @OneToOne
    @JoinColumn(name = "cpf", referencedColumnName = "cpf", insertable = false, updatable = false)
    private Usuario usuario;

    @Column(name = "ano_ingresso")
    private Integer anoIngresso;

    public Estudante() {
    }

    public String getMatEstudante() {
        return matEstudante;
    }

    public void setMatEstudante(String matEstudante) {
        this.matEstudante = matEstudante;
    }

    public Double getMc() {
        return mc;
    }

    public void setMc(Double mc) {
        this.mc = mc;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String usuarioCpf) {
        this.cpf = usuarioCpf;
    }

    public Integer getAnoIngresso() {
        return anoIngresso;
    }

    public void setAnoIngresso(Integer anoIngresso) {
        this.anoIngresso = anoIngresso;
    }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}

