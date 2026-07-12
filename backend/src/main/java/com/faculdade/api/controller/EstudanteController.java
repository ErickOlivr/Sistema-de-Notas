package com.faculdade.api.controller;

import com.faculdade.api.model.Estudante;
import com.faculdade.api.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudantes")
@CrossOrigin(origins = "http://localhost:5173")
public class EstudanteController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    // GET: Listar todos os estudantes (Chama o listarTodos() do seu front)
    @GetMapping
    public ResponseEntity<List<Estudante>> listarTodos() {
        List<Estudante> estudantes = estudanteRepository.findAll();
        return ResponseEntity.ok(estudantes);
    }

    // POST: Cadastrar um novo estudante (Chama o cadastrar() do seu front)
    @PostMapping
    public ResponseEntity<Void> cadastrarEstudante(@RequestBody Estudante estudante) {
        // 1. Executa APENAS o método nativo com o Cast do CPF
        estudanteRepository.salvarEstudanteNativo(
                estudante.getMatEstudante(),
                estudante.getCpf(),
                estudante.getAnoIngresso()
        );

        // 2. RETORNA IMEDIATAMENTE (Não deixe nenhuma linha com "estudanteRepository.save" aqui embaixo!)
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // GET BY ID: Buscar um estudante específico pela matrícula
    @GetMapping("/{matricula}")
    public ResponseEntity<Estudante> buscarPorMatricula(@PathVariable String matricula) {
        Optional<Estudante> estudante = estudanteRepository.findById(matricula);
        return estudante.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE: Remover um estudante (Chama o deletar() do seu front)
    @DeleteMapping("/{matricula}")
    public ResponseEntity<Void> deletar(@PathVariable String matricula) {
        if (!estudanteRepository.existsById(matricula)) {
            return ResponseEntity.notFound().build();
        }

        estudanteRepository.deleteById(matricula);
        return ResponseEntity.noContent().build();
    }
}