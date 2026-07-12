package com.faculdade.api.modelnosql;

import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "estudante") // Mapeia a coleção principal do MongoDB
@Data
public class EstudanteNosql {

    @Id
    private String matEstudante; // Chave primária do estudante no Mongo

    // Os dados do usuário são incorporados aqui conforme o PDF exigiu!
    private UsuarioNosql usuario; 

    // A relação muitos-para-muitos (Vínculo/Cursa) virou uma lista embutida
    private List<CursaNosql> matriculas = new ArrayList<>();
}   