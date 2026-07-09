package com.faculdade.api.service;

import com.faculdade.api.dto.LancamentoNotaDTO;
import com.faculdade.api.dto.MatriculaDTO;
import com.faculdade.api.model.Cursa;
import com.faculdade.api.model.Estudante;
import com.faculdade.api.model.Turma;
import com.faculdade.api.model.pk.CursaId;
import com.faculdade.api.repository.CursaRepository;
import com.faculdade.api.repository.EstudanteRepository;
import com.faculdade.api.repository.TurmaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class MatriculaService {

    private final CursaRepository cursaRepository;
    private final EstudanteRepository estudanteRepository;
    private final TurmaRepository turmaRepository;

    public MatriculaService(CursaRepository cursaRepository,
                            EstudanteRepository estudanteRepository,
                            TurmaRepository turmaRepository) {
        this.cursaRepository = cursaRepository;
        this.estudanteRepository = estudanteRepository;
        this.turmaRepository = turmaRepository;
    }

    @Transactional
    public Cursa matriculaEstudante(MatriculaDTO dto){
        Estudante estudante = estudanteRepository.findById(dto.getMatEstudante())
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));

    Turma turma = turmaRepository.findById(dto.getIdTurma())
            .orElseThrow(() -> new RuntimeException("Turma não encontrada!"));

    CursaId idComposto = new CursaId(dto.getMatEstudante(), dto.getIdTurma());
        if (cursaRepository.existsById(idComposto)) {
        throw new RuntimeException("Este estudante já está matriculado nesta turma!");
    }

        Cursa novaMatricula = new Cursa(estudante, turma);
        return cursaRepository.save(novaMatricula);
    }

    public List<Cursa> buscarBoletimDoEstudante(String matEstudante) {
        if (!estudanteRepository.existsById(matEstudante)) {
            throw new RuntimeException("Estudante não encontrado!");
        }
        return cursaRepository.findByEstudanteMatEstudante(matEstudante);
    }

    public List<Cursa> buscarAlunosDaTurma(Integer idTurma) {
        if (!turmaRepository.existsById(idTurma)) {
            throw new RuntimeException("Turma não encontrada!");
        }
        return cursaRepository.findByTurmaIdTurma(idTurma);
    }

    @Transactional
    public Cursa lancarNota(LancamentoNotaDTO dto) {
        CursaId idComposto = new CursaId(dto.getMatEstudante(), dto.getIdTurma());

        Cursa matricula = cursaRepository.findById(idComposto)
                .orElseThrow(() -> new RuntimeException("Matrícula não encontrada! O aluno não pertence a esta turma."));


        matricula.setNota1(dto.getNota1());
        matricula.setNota2(dto.getNota2());
        matricula.setNota3(dto.getNota3());
        matricula.setFaltas(dto.getFaltas());

        return cursaRepository.save(matricula);
    }

    @Transactional
    public void matricular(String matEstudante, Integer idTurma) {
        CursaId idComposto = new CursaId(matEstudante, idTurma);
        if (!cursaRepository.existsById(idComposto)) {
            throw new RuntimeException("Matrícula não encontrada para cancelamento.");
        }
        cursaRepository.deleteById(idComposto);
    }


}
