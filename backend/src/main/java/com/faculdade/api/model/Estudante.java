package com.faculdade.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Estudante")
public class Estudante {
    @Id
    @Column(name = "mat_estudante", length = 12)
    private String matEstudante;

    @Column(name = "mc", precision = 2, scale = 2)
    private BigDecimal mc;


    @Column(name = "cpf")
    private String cpf;

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

    public BigDecimal getMc() {
        return mc;
    }

    public void setMc(BigDecimal mc) {
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
}

