package com.faculdade.api.modelnosql;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CursaNosql {

    private String idTurma; 
    
    // Mantemos as restrições de domínio das notas
    private Double nota1;
    private Double nota2;
    private Double nota3;
    private Integer faltas;
    private BigDecimal nota;
}