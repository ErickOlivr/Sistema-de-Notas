package com.faculdade.api.controller;

import com.faculdade.api.model.Professor;
import com.faculdade.api.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public ResponseEntity<List<Professor>> listarTodos() {
        return ResponseEntity.ok(professorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody Professor professor) {
        professorRepository.salvarProfessorNativo(
                professor.getMatProfessor(),
                professor.getCpf(),
                professor.getDepartamento()
        );
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{matricula}")
    public ResponseEntity<Void> deletar(@PathVariable String matricula) {
        if (!professorRepository.existsById(matricula)) {
            return ResponseEntity.notFound().build();
        }
        professorRepository.deleteById(matricula);
        return ResponseEntity.noContent().build();
    }
}