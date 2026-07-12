package com.faculdade.api.service;

import com.faculdade.api.model.Estudante;
import com.faculdade.api.repository.EstudanteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EstudanteService {

    private final EstudanteRepository repository;

    public EstudanteService(EstudanteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Estudante cadastrar(Estudante estudante) {
        if (repository.existsById(estudante.getMatEstudante())) {
            throw new RuntimeException("Já existe um estudante com esta matrícula!");
        }
        return repository.save(estudante);
    }

    public List<Estudante> listarTodos() {
        return repository.findAll();
    }

    public Estudante buscarPorMatricula(String matricula) {
        return repository.findById(matricula)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado!"));
    }

    @Transactional
    public void deletar(String matricula) {
        if (!repository.existsById(matricula)) {
            throw new RuntimeException("Estudante não encontrado para exclusão!");
        }
        repository.deleteById(matricula);
    }
}