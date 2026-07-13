package com.faculdade.api.controllernosql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faculdade.api.modelnosql.EstudanteNosql;
import com.faculdade.api.repositorynosql.EstudanteNosqlRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/nosql/estudantes")

public class EstudanteNosqlController {

    @Autowired
    private EstudanteNosqlRepository estudanteNosqlRepository;

    @PostMapping
    public ResponseEntity<EstudanteNosql> criarEstudante(@Valid @RequestBody EstudanteNosql novoEstudante) {
        // Salva o documento do estudante diretamente no MongoDB Atlas
        EstudanteNosql estudanteSalvo = estudanteNosqlRepository.save(novoEstudante);
        return ResponseEntity.status(HttpStatus.CREATED).body(estudanteSalvo);
    }

    @GetMapping
        public ResponseEntity<List<EstudanteNosql>> listarTodos() {
            return ResponseEntity.ok(estudanteNosqlRepository.findAll());     
        }

    @DeleteMapping("/{matEstudante}")
    public ResponseEntity<Void> excluirEstudante(@PathVariable String matEstudante) {
        // Verifica se o estudante realmente existe antes de tentar deletar
        if (!estudanteNosqlRepository.existsById(matEstudante)) {
            throw new RuntimeException("Operação negada: Estudante não encontrado.");
        }
        estudanteNosqlRepository.deleteById(matEstudante);
        
        return ResponseEntity.noContent().build();
    }
}
