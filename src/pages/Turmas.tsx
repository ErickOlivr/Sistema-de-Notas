import React, { useState, useEffect } from 'react';
import type { Turma } from '../types';
import { turmaService } from '../services/turmaService';

export default function Turmas() {
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [form, setForm] = useState<Turma>({
        disciplina: '',
        codigoTurma: 1, // Mapeado como 'turma' no banco
        ano: new Date().getFullYear(),
        semestre: 1
    });

    useEffect(() => {
        carregarTurmas();
    }, []);

    const carregarTurmas = async () => {
        try {
            const dados = await turmaService.listarTodas();
            setTurmas(dados);
        } catch (error) {
            console.error("Erro ao buscar turmas", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await turmaService.cadastrar(form);
            alert('Turma cadastrada com sucesso!');
            carregarTurmas();
            setForm({ disciplina: '', codigoTurma: 1, ano: 2026, semestre: 1 });
        } catch (error) {
            alert('Erro ao cadastrar turma. Verifique os dados.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestão de Turmas</h2>
            <hr />

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Código Disciplina (Ex: INF001)</label>
                            <input type="text" className="form-control" required maxLength={8}
                                value={form.disciplina}
                                onChange={e => setForm({ ...form, disciplina: e.target.value })}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Nº da Turma</label>
                            <input type="number" className="form-control" required
                                value={form.codigoTurma}
                                onChange={e => setForm({ ...form, codigoTurma: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Ano</label>
                            <input type="number" className="form-control" required
                                value={form.ano}
                                onChange={e => setForm({ ...form, ano: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Semestre</label>
                            <select className="form-select" 
                                value={form.semestre} 
                                onChange={e => setForm({ ...form, semestre: Number(e.target.value) })}
                            >
                                <option value={1}>1º Semestre</option>
                                <option value={2}>2º Semestre</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button type="submit" className="btn btn-success w-100">Salvar Turma</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Tabela de Listagem */}
            <h4>Turmas Ativas no Sistema</h4>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Disciplina</th>
                        <th>Turma</th>
                        <th>Ano / Semestre</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {turmas.length === 0 ? (
                        <tr><td colSpan={5} className="text-center">Nenhuma turma cadastrada.</td></tr>
                    ) : (
                        turmas.map(t => (
                            <tr key={t.idTurma}>
                                <td>{t.idTurma}</td>
                                <td>{t.disciplina}</td>
                                <td>{t.codigoTurma}</td>
                                <td>{t.ano}/{t.semestre}º</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={async () => {
                                            if(t.idTurma) {
                                                await turmaService.deletar(t.idTurma);
                                                carregarTurmas();
                                            }
                                        }}>
                                        Deletar
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