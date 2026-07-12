package com.faculdade.api.modelnosql;

import lombok.Data;

@Data
public class UsuarioNosql {
    private String idUsuario; 
    private String nome;
    private String email;
}