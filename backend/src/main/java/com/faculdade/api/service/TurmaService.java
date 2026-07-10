package com.faculdade.api.service;

import com.faculdade.api.model.Turma;
import com.faculdade.api.repository.TurmaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TurmaService {

    private final TurmaRepository repository;

    public TurmaService(TurmaRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Turma cadastrar(Turma turma) {
        return repository.save(turma);
    }

    public List<Turma> listarTodas() {
        return repository.findAll();
    }

    public Turma buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada!"));
    }

    @Transactional
    public void deletar(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Turma não encontrada para exclusão!");
        }
        repository.deleteById(id);
    }
}