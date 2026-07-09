package com.faculdade.api.controller;

import com.faculdade.api.model.Disciplina;
import com.faculdade.api.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "http://localhost:5173")
public class DisciplinaController {

    @Autowired
    private DisciplinaRepository repository;

    @GetMapping
    public ResponseEntity<List<Disciplina>> listar() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<Disciplina> cadastrar(@RequestBody Disciplina disciplina) {
        if (repository.existsById(disciplina.getCodDisc())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(disciplina));
    }

    @DeleteMapping("/{codDisc}")
    public ResponseEntity<Void> deletar(@PathVariable String codDisc) {
        // Verifica se a disciplina existe na base de dados
        if (!repository.existsById(codDisc)) {
            return ResponseEntity.notFound().build();
        }
        
        // Se existir, tenta apagar
        repository.deleteById(codDisc);
        return ResponseEntity.noContent().build();
    }
}