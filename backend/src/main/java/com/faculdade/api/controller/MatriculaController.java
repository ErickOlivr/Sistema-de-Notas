package com.faculdade.api.controller;

import com.faculdade.api.dto.LancamentoNotaDTO;
import com.faculdade.api.dto.MatriculaDTO;
import com.faculdade.api.model.Cursa;
import com.faculdade.api.service.MatriculaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "http://localhost:5173") // Libera o acesso para o React não dar erro de CORS
public class MatriculaController {

    private final MatriculaService matriculaService;

    // Injeção de dependência via construtor
    public MatriculaController(MatriculaService matriculaService) {
        this.matriculaService = matriculaService;
    }

    // CREATE: Matricular Aluno numa Turma
    // Endpoint: POST http://localhost:8080/api/matriculas
    @PostMapping
    public ResponseEntity<Cursa> matricular(@Valid @RequestBody MatriculaDTO dto) {
        Cursa novaMatricula = matriculaService.matriculaEstudante(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMatricula);
    }

    // READ: Obter Boletim Completo de um Aluno
    // Endpoint: GET http://localhost:8080/api/matriculas/boletim/{matricula}
    @GetMapping("/boletim/{matricula}")
    public ResponseEntity<List<Cursa>> obterBoletim(@PathVariable String matricula) {
        List<Cursa> boletim = matriculaService.buscarBoletimDoEstudante(matricula);
        return ResponseEntity.ok(boletim);
    }

    // READ: Obter Diário de Classe (Lista de Alunos de uma Turma)
    // Endpoint: GET http://localhost:8080/api/matriculas/turma/{idTurma}
    @GetMapping("/turma/{idTurma}")
    public ResponseEntity<List<Cursa>> obterAlunosDaTurma(@PathVariable Long idTurma) {
        List<Cursa> alunos = matriculaService.buscarAlunosDaTurma(idTurma);
        return ResponseEntity.ok(alunos);
    }

    // UPDATE: Lançar ou Alterar Nota de um Aluno
    // Endpoint: PUT http://localhost:8080/api/matriculas/lancar-nota
    @PutMapping("/lancar-nota")
    public ResponseEntity<Cursa> lancarNota(@Valid @RequestBody LancamentoNotaDTO dto) {
        Cursa matriculaAtualizada = matriculaService.lancarNota(dto);
        return ResponseEntity.ok(matriculaAtualizada);
    }

    // DELETE: Cancelar Matrícula (Trancamento de Disciplina)
    // Endpoint: DELETE http://localhost:8080/api/matriculas
    @DeleteMapping
    public ResponseEntity<Void> cancelarMatricula(@RequestBody MatriculaDTO dto) {
        matriculaService.cancelarMatricula(dto.getMatEstudante(), dto.getIdTurma());
        return ResponseEntity.noContent().build();
    }
}