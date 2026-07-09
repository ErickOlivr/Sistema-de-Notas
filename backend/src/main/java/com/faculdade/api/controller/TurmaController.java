package com.faculdade.api.controller;

import com.faculdade.api.model.Turma;
import com.faculdade.api.repository.TurmaRepository;
import com.faculdade.api.service.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "http://localhost:5173")
public class TurmaController{
    private final TurmaService service;

    public TurmaController(TurmaService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Turma> cadastrar(@RequestBody Turma turma) {
        Turma novaTurma = service.cadastrar(turma);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTurma);
    }
    @GetMapping
    public ResponseEntity<List<Turma>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
