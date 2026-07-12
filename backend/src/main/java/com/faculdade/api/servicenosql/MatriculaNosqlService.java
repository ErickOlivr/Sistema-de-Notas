package com.faculdade.api.servicenosql;

import com.faculdade.api.modelnosql.CursaNosql;
import com.faculdade.api.modelnosql.EstudanteNosql;
import com.faculdade.api.repositorynosql.EstudanteNosqlRepository;
import com.faculdade.api.repositorynosql.TurmaNosqlRepository; // Se tiver o repositório da turma

// Imports do Spring Framework
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Imports utilitários do Java
@Service
public class MatriculaNosqlService {
    
    @Autowired
    private EstudanteNosqlRepository estudanteRepository;

    // Se você tiver um repositório para verificar a existência da Turma/Curso no NoSQL
    @Autowired
    private TurmaNosqlRepository turmaRepository; 

    public EstudanteNosql matricularEstudante(String matEstudante, CursaNosql novoVinculo) {
        
        // 1. Restrição de Integridade Referencial: O estudante existe?
        EstudanteNosql estudante = estudanteRepository.findById(matEstudante)
            .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));

        // 2. Restrição de Integridade Referencial: A turma/curso destino existe?
        if (!turmaRepository.existsById(String.valueOf(novoVinculo.getIdTurma()))) {
            throw new RuntimeException("Turma/Curso não existe no sistema.");
        }

        // 3. Evitar duplicidade (Garantir restrição de chave no array embutido)
        boolean jaMatriculado = estudante.getMatriculas().stream()
            .anyMatch(v -> v.getIdTurma().equals(novoVinculo.getIdTurma()));
            
        if (jaMatriculado) {
            throw new RuntimeException("Estudante já está vinculado a esta turma.");        
        }

        // 4. Se passou em tudo, adiciona o subdocumento na lista do documento pai
        estudante.getMatriculas().add(novoVinculo);

        // 5. Salva o documento principal atualizado no MongoDB Atlas
        return estudanteRepository.save(estudante);
    }
}