import React, { useState, useEffect } from 'react';
import { turmaService } from '../services/turmaService';
import { notasService, type LancamentoNotaDTO } from '../services/notasService';

export default function Notas() {
    const [turmas, setTurmas] = useState<any[]>([]);
    const [selectedTurma, setSelectedTurma] = useState('');
    const [alunosMatriculados, setAlunosMatriculados] = useState<any[]>([]);
    
    // Estado para controlar qual linha da tabela está sendo editada temporariamente
    const [valoresEditados, setValoresEditados] = useState<{ [key: string]: LancamentoNotaDTO }>({});

    useEffect(() => {
        carregarTurmas();
    }, []);

    const carregarTurmas = async () => {
        try {
            const dados = await turmaService.listarTodas();
            setTurmas(dados);
        } catch (error) {
            console.error("Erro ao carregar turmas", error);
        }
    };

    const handleTurmaChange = async (idTurma: string) => {
        setSelectedTurma(idTurma);
        if (!idTurma) {
            setAlunosMatriculados([]);
            return;
        }

        try {
            const alunos = await notasService.listarAlunosPorTurma(Number(idTurma));
            setAlunosMatriculados(alunos);
            
            // Inicializa o estado de edição com os valores atuais vindos do banco
            const estadoInicial: { [key: string]: LancamentoNotaDTO } = {};
            alunos.forEach((m: any) => {
                const mat = m.estudante?.matEstudante;
                estadoInicial[mat] = {
                    matEstudante: mat,
                    idTurma: Number(idTurma),
                    nota1: m.nota1 ?? 0,
                    nota2: m.nota2 ?? 0,
                    nota3: m.nota3 ?? 0,
                    faltas: m.faltas ?? 0
                };
            });
            setValoresEditados(estadoInicial);
        } catch (error) {
            console.error("Erro ao carregar alunos da turma", error);
        }
    };

    const handleInputChange = (matEstudante: string, campo: keyof LancamentoNotaDTO, valor: number) => {
        setValoresEditados(prev => ({
            ...prev,
            [matEstudante]: {
                ...prev[matEstudante],
                [campo]: valor
            }
        }));
    };

    const handleSalvarNota = async (matEstudante: string) => {
        const dadosParaSalvar = valoresEditados[matEstudante];
        try {
            await notasService.lancarNotas(dadosParaSalvar);
            alert('Notas e faltas atualizadas com sucesso!');
        } catch (error) {
            alert('Erro ao salvar as notas do aluno.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Lançamento de Notas e Faltas</h2>
            <hr />

            <div className="card mb-4 bg-light">
                <div className="card-body row align-items-center">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Selecione a Turma para Diário de Classe</label>
                        <select 
                            className="form-select"
                            value={selectedTurma}
                            onChange={e => handleTurmaChange(e.target.value)}
                        >
                            <option value="">-- Escolha uma Turma --</option>
                            {turmas.map(t => (
                                <option key={t.idTurma} value={t.idTurma}>
                                    ID: {t.idTurma} | {t.disciplina?.nome || t.disciplina} - Turma {t.numero}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedTurma && (
                <div>
                    <h4>Alunos da Turma</h4>
                    <table className="table table-bordered table-hover mt-3 align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Matrícula</th>
                                <th>Nome do Aluno</th>
                                <th style={{ width: '120px' }}>Nota 1</th>
                                <th style={{ width: '120px' }}>Nota 2</th>
                                <th style={{ width: '120px' }}>Nota 3</th>
                                <th style={{ width: '120px' }}>Faltas</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunosMatriculados.length === 0 ? (
                                <tr><td colSpan={7} className="text-center">Nenhum aluno matriculado nesta turma ainda.</td></tr>
                            ) : (
                                alunosMatriculados.map((m: any) => {
                                    const mat = m.estudante?.matEstudante;
                                    const nome = m.estudante?.nome || m.estudante?.nomeEstudante || "Não Identificado";
                                    
                                    return (
                                        <tr key={mat}>
                                            <td className="fw-bold">{mat}</td>
                                            <td>{nome}</td>
                                            <td>
                                                <input type="number" className="form-control form-control-sm" step="0.1" min="0" max="10"
                                                    value={valoresEditados[mat]?.nota1 ?? 0}
                                                    onChange={e => handleInputChange(mat, 'nota1', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control form-control-sm" step="0.1" min="0" max="10"
                                                    value={valoresEditados[mat]?.nota2 ?? 0}
                                                    onChange={e => handleInputChange(mat, 'nota2', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control form-control-sm" step="0.1" min="0" max="10"
                                                    value={valoresEditados[mat]?.nota3 ?? 0}
                                                    onChange={e => handleInputChange(mat, 'nota3', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control form-control-sm" min="0"
                                                    value={valoresEditados[mat]?.faltas ?? 0}
                                                    onChange={e => handleInputChange(mat, 'faltas', Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => handleSalvarNota(mat)}
                                                    className="btn btn-primary btn-sm px-3"
                                                >
                                                    💾 Salvar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}