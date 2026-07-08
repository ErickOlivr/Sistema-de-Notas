import React, { useState, useEffect } from 'react';
import type { Turma } from '../types';
import { turmaService } from '../services/turmaService';

export default function Turmas() {
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [form, setForm] = useState<Partial<Turma>>({
        disciplina: undefined, // Mantido como objeto/undefined para o Java
        numero: 1,            // Alinhado com o banco AWS rds
        ano: 2026,            
        semestre: 1
    });


    const [codigoDiscInput, setCodigoDiscInput] = useState('');

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
            await turmaService.cadastrar(form as Turma);
            alert('Turma cadastrada com sucesso!');
            carregarTurmas();
            
            // Reseta o formulário e o input de texto
            setForm({ 
                disciplina: undefined, 
                numero: 1, 
                ano: 2026, 
                semestre: 1
            });
            setCodigoDiscInput('');
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
                            <label className="form-label">Código Disciplina (Ex: COMP0212)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                maxLength={8}
                                value={codigoDiscInput}
                                // Monta a estrutura de objeto que o Java precisa ao digitar o código
                                onChange={e => {
                                    const valor = e.target.value;
                                    setCodigoDiscInput(valor);
                                    setForm({ 
                                        ...form, 
                                        disciplina: { codDisc: valor, nome: '' } 
                                    });
                                }}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Nº da Turma</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                required
                                value={form.numero ?? 1} // CORRIGIDO: Usa 'numero' em vez de 'codigoTurma'
                                onChange={e => setForm({ ...form, numero: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Ano</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                required
                                value={form.ano ?? 2026}
                                onChange={e => setForm({ ...form, ano: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Semestre</label>
                            <select 
                                className="form-select" 
                                value={form.semestre ?? 1} 
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
                               <td>{t.disciplina?.nome || t.disciplina?.codDisc || "Sem Disciplina"}</td>
                                <td>{t.numero ?? t.codigoTurma ?? "N/A"}</td>
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