import React, { useState, useEffect } from 'react';
import type {Estudante} from '../types';
import { estudanteService } from '../services/estudanteService';

export default function Estudantes() {
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);
    const [form, setForm] = useState<Estudante>({
        matEstudante: '',
        usuarioCpf: '',
        anoIngresso: new Date().getFullYear(),
        mc: 0
    });

    // Carrega a lista ao abrir a tela
    useEffect(() => {
        carregarEstudantes();
    }, []);

    const carregarEstudantes = async () => {
        try {
            const dados = await estudanteService.listarTodos();
            setEstudantes(dados);
        } catch (error) {
            console.error("Erro ao buscar estudantes", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await estudanteService.cadastrar(form);
            alert('Estudante cadastrado com sucesso!');
            carregarEstudantes(); // Atualiza a tabela
            setForm({ matEstudante: '', usuarioCpf: '', anoIngresso: 2026, mc: 0 }); // Limpa o form
        } catch (error) {
            alert('Erro ao cadastrar. Verifique se a matrícula já existe.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestão de Estudantes</h2>
            <hr />

            {/* Formulário de Cadastro */}
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Matrícula</label>
                            <input type="text" className="form-control" required
                                   value={form.matEstudante}
                                   onChange={e => setForm({ ...form, matEstudante: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">CPF</label>
                            <input type="text" className="form-control" required maxLength={11}
                                   value={form.usuarioCpf}
                                   onChange={e => setForm({ ...form, usuarioCpf: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Ano de Ingresso</label>
                            <input type="number" className="form-control" required
                                   value={form.anoIngresso}
                                   onChange={e => setForm({ ...form, anoIngresso: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                            <button type="submit" className="btn btn-primary w-100">Salvar Estudante</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Tabela de Listagem */}
            <h4>Alunos Matriculados na Instituição</h4>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Matrícula</th>
                    <th>CPF</th>
                    <th>Ano Ingresso</th>
                    <th>MC (Média)</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {estudantes.length === 0 ? (
                    <tr><td colSpan={5} className="text-center">Nenhum estudante cadastrado.</td></tr>
                ) : (
                    estudantes.map(est => (
                        <tr key={est.matEstudante}>
                            <td>{est.matEstudante}</td>
                            <td>{est.usuarioCpf}</td>
                            <td>{est.anoIngresso}</td>
                            <td>{est.mc}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={async () => {
                                        await estudanteService.deletar(est.matEstudante);
                                        carregarEstudantes();
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