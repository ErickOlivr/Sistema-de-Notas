package com.faculdade.api.controllernosql;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nosql/disciplinas") // Ou o termo exato que seu service TS chama
@CrossOrigin(origins = "http://localhost:5173")
public class DisciplinaNosqlController {

    @GetMapping
    public ResponseEntity<List<Object>> listarTodas() {
        return ResponseEntity.ok(new ArrayList<>()); // Retorna lista vazia temporária para o front não quebrar
    }
}