import React, { useState, useEffect } from 'react';
import Select from 'react-select'; 
import { matriculaService } from '../services/matriculaService';
import { estudanteService } from '../services/estudanteService';
import { turmaService } from '../services/turmaService';
import type { Cursa, Estudante, Turma } from '../types';

export default function Matriculas() {
    const [matriculas, setMatriculas] = useState<Cursa[]>([]);
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);
    const [turmas, setTurmas] = useState<Turma[]>([]);

    const [selectedEstudante, setSelectedEstudante] = useState('');
    const [selectedTurma, setSelectedTurma] = useState('');

    const corrigirTexto = (texto?: string) => {
        if (!texto) return "";
        return texto
            .replace(/Programa‡Æo/g, 'Programação')
            .replace(/Computa‡Æo/g, 'Computação')
            .replace(/Inteligˆncia/g, 'Inteligência')
            .replace(/L¢gica/g, 'Lógica')
            .replace(/Orientada \.\.\. Objetos/g, 'Orientada a Objetos')
            .replace(/C lculo/g, 'Cálculo')
            .replace(/F¡sica/g, 'Física')
            .replace(/Num,rico/g, 'Numérico');
    };

    useEffect(() => {
        carregarTudo();
    }, []);

    const carregarTudo = async () => {
        try {
            const [dadosMatriculas, dadosEstudantes, dadosTurmas] = await Promise.all([
                matriculaService.listarTodas(),
                estudanteService.listarTodos(),
                turmaService.listarTodas()
            ]);
            setMatriculas(dadosMatriculas);
            setEstudantes(dadosEstudantes);
            setTurmas(dadosTurmas);
        } catch (error) {
            console.error("Erro ao carregar dados de matrícula", error);
        }
    };

    const estudanteOptions = estudantes.map(e => ({
        value: e.matEstudante,
        label: `${e.matEstudante} - ${e.usuario?.nome || 'Nome não identificado'}`
    }));

    const turmaOptions = turmas.map(t => ({
        value: t.idTurma.toString(),
        label: `ID: ${t.idTurma} | ${corrigirTexto(t.disciplina?.nome || t.disciplina?.codDisc)} - Turma ${t.numero} (${t.ano}/${t.semestre}º)`
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEstudante || !selectedTurma) {
            alert('⚠️ Por favor, selecione um estudante e uma turma!');
            return;
        }

        try {
            await matriculaService.matricular({
                matEstudante: selectedEstudante,
                idTurma: Number(selectedTurma)
            });
            alert('✅ Matrícula efetuada com sucesso!');
            carregarTudo();
            setSelectedTurma('');
        } catch (error) {
            alert('❌ Erro ao matricular. Verifique se o aluno já está nesta turma.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="display-6 fw-bold text-primary mb-4"> Efetuar Matrícula</h2>

            <div className="card shadow-lg border-0 rounded-4 mb-5">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="row g-4 align-items-end">
                        <div className="col-md-5">
                            <label className="form-label fw-bold text-secondary">Estudante</label>
                            <Select 
                                options={estudanteOptions}
                                placeholder="Digite a matrícula ou nome..."
                                noOptionsMessage={() => "Nenhum estudante encontrado"}
                                value={estudanteOptions.find(o => o.value === selectedEstudante) || null}
                                onChange={(selected) => setSelectedEstudante(selected?.value || '')}
                                isClearable
                            />
                        </div>

                        <div className="col-md-5">
                            <label className="form-label fw-bold text-secondary">Turma</label>
                            <Select 
                                options={turmaOptions}
                                placeholder="Digite a disciplina ou código..."
                                noOptionsMessage={() => "Nenhuma turma encontrada"}
                                value={turmaOptions.find(o => o.value === selectedTurma) || null}
                                onChange={(selected) => setSelectedTurma(selected?.value || '')}
                                isClearable
                            />
                        </div>

                        <div className="col-md-2 text-end">
                            <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill shadow-sm">
                                Matricular
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h4 className="fw-bold mb-3 text-secondary">Alunos Matriculados (Relação Cursa)</h4>
            <div className="table-responsive shadow-sm rounded-4">
                <table className="table table-hover align-middle mb-0 bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th className="py-3 px-4">Matrícula Aluno</th>
                            <th className="py-3">Nome do Aluno</th>
                            <th className="py-3">Disciplina</th>
                            <th className="py-3">Turma</th>
                            <th className="py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-4 text-muted">Nenhuma matrícula registrada no sistema.</td></tr>
                        ) : (
                            matriculas.map(m => (
                                <tr key={`${m.id.matEstudante}-${m.id.idTurma}`}>
                                    <td className="px-4"><span className="badge bg-primary px-3 py-2 rounded-pill">{m.estudante?.matEstudante}</span></td>
                                    <td className="fw-medium">{m.estudante?.usuario?.nome || "Nome não identificado"}</td>
                                    <td className="fw-bold text-secondary">{corrigirTexto(m.turma?.disciplina?.nome || m.turma?.disciplina?.codDisc)}</td>
                                    <td>Turma {m.turma?.numero} <br/><small className="text-muted">{m.turma?.ano}/{m.turma?.semestre}º</small></td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-sm btn-outline-danger rounded-pill px-3 shadow-sm"
                                            onClick={async () => {
                                                if(window.confirm('Tem certeza que deseja cancelar esta matrícula?')) {
                                                    await matriculaService.cancelar(m.id.matEstudante, m.id.idTurma);
                                                    carregarTudo();
                                                }
                                            }}>
                                             Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}