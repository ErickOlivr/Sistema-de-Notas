package com.faculdade.api.controller;


import com.faculdade.api.dto.LancamentoNotaDTO;
import com.faculdade.api.model.Cursa;
import com.faculdade.api.repository.CursaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CursaController {

    @Autowired
    private CursaRepository cursaRepository;

    @GetMapping
    public ResponseEntity<List<Cursa>> listarTodas() {
        return ResponseEntity.ok(cursaRepository.findAll());
    }

    @GetMapping("/turma/{idTurma}")
    public ResponseEntity<List<Cursa>> listarPorTurma(@PathVariable("idTurma") Long idTurma) {
        return ResponseEntity.ok(cursaRepository.findByTurmaIdTurma(idTurma));
    }

    @PostMapping
    public ResponseEntity<Cursa> matricularEstudante(@RequestBody Cursa cursa) {
        Cursa novaMatricula = cursaRepository.save(cursa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMatricula);
    }

    @PutMapping("/lancar-notas")
    @Transactional
    public ResponseEntity<Void> lancarNotas(@RequestBody LancamentoNotaDTO dto) {
        List<Cursa> matriculas = cursaRepository.findByEstudanteMatEstudante(dto.getMatEstudante());

        Cursa matriculaAlvo = matriculas.stream()
                .filter(m -> m.getTurma().getIdTurma().equals(dto.getIdTurma()))
                .findFirst()
                .orElse(null);

        if (matriculaAlvo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        matriculaAlvo.setNota1(dto.getNota1());
        matriculaAlvo.setNota2(dto.getNota2());
        matriculaAlvo.setNota3(dto.getNota3());
        matriculaAlvo.setFaltas(dto.getFaltas());

        cursaRepository.save(matriculaAlvo);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{matEstudante}/{idTurma}")
    public ResponseEntity<Void> removerMatricula(@PathVariable String matEstudante, @PathVariable Long idTurma) {
        cursaRepository.deletarMatricula(matEstudante, idTurma);
        return ResponseEntity.noContent().build();
    }
}