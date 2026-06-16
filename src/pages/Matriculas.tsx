import React, { useState, useEffect } from 'react';
import { matriculaService } from '../services/matriculaService';
import { estudanteService } from '../services/estudanteService'; 
import { turmaService } from '../services/turmaService';

interface EstudanteSimplificado {
    matEstudante: string;
    nome: string;
}

interface TurmaSimplificada {
    idTurma: number;
    disciplina: string;
    codigoTurma: number;
    ano: number;
    semestre: number;
}

export default function Matriculas() {
    const [estudantes, setEstudantes] = useState<any[]>([]);
    const [turmas, setTurmas] = useState<any[]>([]);
    const [matriculas, setMatriculas] = useState<any[]>([]);
    
    const [selectedEstudante, setSelectedEstudante] = useState('');
    const [selectedTurma, setSelectedTurma] = useState('');

    useEffect(() => {
        carregarDadosInicial(); 
    }, []);

    const carregarDadosInicial = async () => { 
        try {
            const [dadosEstudantes, dadosTurmas, dadosMatriculas] = await Promise.all([
                estudanteService.listarTodos(),
                turmaService.listarTodas(),
                matriculaService.listarTodas()
            ]);
            
            setEstudantes(dadosEstudantes);
            setTurmas(dadosTurmas);
            setMatriculas(dadosMatriculas);
        } catch (error) {
            console.error("Erro ao carregar dados de matrícula", error);
        }
    };

    const handleMatricular = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEstudante || !selectedTurma) {
            alert('Por favor, selecione um estudante e uma turma.');
            return;
        }

        try {
            await matriculaService.matricular({
                matEstudante: selectedEstudante,
                idTurma: Number(selectedTurma)
            });
            alert('Estudante matriculado com sucesso!');
            carregarDadosInicial(); // Atualiza a tabela
            setSelectedEstudante('');
            setSelectedTurma('');
        } catch (error) {
            alert('Erro ao realizar matrícula. O aluno já pode estar nesta turma.');
        }
    };

    const handleCancelarMatricula = async (matricula: string, idTurma: number) => {
        if (window.confirm('Deseja realmente cancelar esta matrícula?')) {
            try {
                await matriculaService.cancelar(matricula, idTurma);
                alert('Matrícula cancelada!');
                carregarDadosInicial();
            } catch (error) {
                alert('Erro ao cancelar matrícula.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Efetuar Matrícula</h2>
            <hr />

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleMatricular} className="row g-3 align-items-end">
                        <div className="col-md-5">
                            <label className="form-label fw-bold">Selecionar Estudante</label>
                            <select 
                                className="form-select" 
                                value={selectedEstudante}
                                onChange={e => setSelectedEstudante(e.target.value)}
                                required
                            >
                                <option value="">-- Escolha o Aluno --</option>
                                {estudantes.map(est => (
                                    <option key={est.matEstudante} value={est.matEstudante}>
                                        {est.matEstudante} - {est.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-5">
                            <label className="form-label fw-bold">Selecionar Turma</label>
                            <select 
                                className="form-select" 
                                value={selectedTurma}
                                onChange={e => setSelectedTurma(e.target.value)}
                                required
                            >
                                <option value="">-- Escolha a Turma --</option>
                                {turmas.map(t => (
                                    <option key={t.idTurma} value={t.idTurma}>
                                        ID: {t.idTurma} | {t.disciplina} - Turma {t.codigoTurma} ({t.ano}/{t.semestre}º)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button type="submit" className="btn btn-success w-100">Matricular</button>
                        </div>
                    </form>
                </div>
            </div>

            <h4>Alunos Matriculados (Relação Cursa)</h4>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Matrícula Aluno</th>
                        <th>Nome do Aluno</th>
                        <th>Disciplina</th>
                        <th>Turma</th>
                        <th>Ano/Semestre</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.length === 0 ? (
                        <tr><td colSpan={6} className="text-center">Nenhuma matrícula registrada.</td></tr>
                    ) : (
                        matriculas.map((m, index) => (
                            <tr key={index}>
                                <td>{m.estudante?.matEstudante}</td>
                                <td>{m.estudante?.nome}</td>
                                <td>{m.turma?.disciplina}</td>
                                <td>{m.turma?.codigoTurma}</td>
                                <td>{m.turma?.ano}/{m.turma?.semestre}º</td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleCancelarMatricula(m.estudante?.matEstudante, m.turma?.idTurma)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Cancelar Matrícula
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}