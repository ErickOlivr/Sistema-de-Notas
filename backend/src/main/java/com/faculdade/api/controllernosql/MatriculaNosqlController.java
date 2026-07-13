package com.faculdade.api.controllernosql;

import com.faculdade.api.modelnosql.CursaNosql;
import com.faculdade.api.modelnosql.CursoNosql;
import com.faculdade.api.modelnosql.DisciplinaNosql;
import com.faculdade.api.modelnosql.EstudanteNosql;
import com.faculdade.api.modelnosql.TurmaNosql;
import com.faculdade.api.repositorynosql.CursoNosqlRepository;
import com.faculdade.api.repositorynosql.DisciplinaNosqlRepository;
import com.faculdade.api.repositorynosql.EstudanteNosqlRepository;
import com.faculdade.api.repositorynosql.TurmaNosqlRepository;
import com.faculdade.api.servicenosql.MatriculaNosqlService; // Ajuste conforme seu pacote de Service

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/nosql/matriculas") // Rota diferenciada para não chocar com o SQL
public class MatriculaNosqlController {

    @Autowired
    private EstudanteNosqlRepository estudanteNosqlRepository;

    @Autowired
    private TurmaNosqlRepository turmaNosqlRepository;

    @Autowired
    private MatriculaNosqlService matriculaService;

    @Autowired
    private CursoNosqlRepository cursoNosqlRepository;

    @Autowired
    private DisciplinaNosqlRepository disciplinaNosqlRepository;


    // Endpoint para realizar o vínculo (Cursa) em um estudante
    @PostMapping("/{matEstudante}")
    public ResponseEntity<EstudanteNosql> realizarMatricula(
            @PathVariable String matEstudante, 
            @RequestBody CursaNosql novoVinculo) {
        
        // Executa a lógica com validação de integridade na Service
        EstudanteNosql estudanteAtualizado = matriculaService.matricularEstudante(matEstudante, novoVinculo);
        
        // Retorna o documento completo atualizado com HTTP 200 OK
        return ResponseEntity.ok(estudanteAtualizado);
    }

        @GetMapping("/{matEstudante}")
    public ResponseEntity<List<CursaNosql>> buscarMatriculasDoEstudante(@PathVariable String matEstudante) {
        // Busca o estudante e extrai a lista embutida
        EstudanteNosql estudante = estudanteNosqlRepository.findById(matEstudante)
            .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));
            
        return ResponseEntity.ok(estudante.getMatriculas());
    }

    // Endpoint: PUT /api/nosql/matriculas/{matEstudante}/{idTurma}
    @PutMapping("/{matEstudante}/{idTurma}")
    public ResponseEntity<EstudanteNosql> atualizarNotas(
            @PathVariable String matEstudante,
            @PathVariable String idTurma,
            @RequestBody CursaNosql dadosAtualizados) {

        EstudanteNosql estudante = estudanteNosqlRepository.findById(matEstudante)
            .orElseThrow(() -> new RuntimeException("Estudante não encontrado"));

        // Localiza o vínculo correto dentro do array por meio do ID da Turma
        CursaNosql vinculo = estudante.getMatriculas().stream()
            .filter(v -> v.getIdTurma().equals(idTurma))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Vínculo com a turma não encontrado"));

        // Atualiza os campos de domínio permitidos (Exemplo: Nota 1 e Faltas)
        vinculo.setNota1(dadosAtualizados.getNota1());
        vinculo.setFaltas(dadosAtualizados.getFaltas());
        // Você pode adicionar os demais campos de notas aqui

        // Salva o bloco completo atualizado na nuvem
        EstudanteNosql estudanteSalvo = estudanteNosqlRepository.save(estudante);
        return ResponseEntity.ok(estudanteSalvo);
        
    }

       // Endpoint: POST /api/nosql/cursos
    @PostMapping("/cursos")
    public ResponseEntity<CursoNosql> criarCurso(@Valid @RequestBody CursoNosql novoCurso) {
        // Salva direto no MongoDB Atlas; se o nome for duplicado, o driver do Mongo lançará uma exceção
        CursoNosql cursoSalvo = cursoNosqlRepository.save(novoCurso);
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoSalvo);
    }

    // Endpoint: POST /api/nosql/disciplinas
    @PostMapping("/disciplinas")
    public ResponseEntity<DisciplinaNosql> criarDisciplina(@Valid @RequestBody DisciplinaNosql novaDisciplina) {
        DisciplinaNosql disciplinaSalva = disciplinaNosqlRepository.save(novaDisciplina);
        return ResponseEntity.status(HttpStatus.CREATED).body(disciplinaSalva);
    }

    

    // Endpoint: POST /api/nosql/turmas
    @PostMapping("/turmas")
    public ResponseEntity<TurmaNosql> criarTurma(@Valid @RequestBody TurmaNosql novaTurma) {
        // Restrição de Integridade Referencial: A disciplina vinculada realmente existe no MongoDB?[cite: 1]
        if (!disciplinaNosqlRepository.existsById(novaTurma.getIdDisciplina())) {
            throw new RuntimeException("Operação negada: A Disciplina informada não existe no banco NoSQL.");
        }

        // Se a integridade estiver correta, persiste a turma na AWS
        TurmaNosql turmaSalva = turmaNosqlRepository.save(novaTurma);
        return ResponseEntity.status(HttpStatus.CREATED).body(turmaSalva);
    }
    @GetMapping("/cursos")
    public ResponseEntity<List<CursoNosql>> listarCursos() {
        return ResponseEntity.ok(cursoNosqlRepository.findAll());
    }

    // Endpoint: GET /api/nosql/matriculas/disciplinas
    @GetMapping("/disciplinas")
    public ResponseEntity<List<DisciplinaNosql>> listarDisciplinas() {
        return ResponseEntity.ok(disciplinaNosqlRepository.findAll());
    }

    // Endpoint: GET /api/nosql/matriculas/turmas
    @GetMapping("/turmas")
    public ResponseEntity<List<TurmaNosql>> listarTurmas() {
        return ResponseEntity.ok(turmaNosqlRepository.findAll());
    }
}