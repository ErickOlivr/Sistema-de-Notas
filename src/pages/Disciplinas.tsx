import React, { useState, useEffect } from 'react';
import type { Disciplina } from '../types';
import { disciplinaService } from '../services/disciplinaService';

export default function Disciplinas() {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [form, setForm] = useState<Disciplina>({
        codDisc: '',
        nome: '',
        cargaHoraria: 60
    });


    useEffect(() => {
        carregarDisciplinas();
    }, []);

    const carregarDisciplinas = async () => {
        try {
            const dados = await disciplinaService.listar();
            setDisciplinas(dados);
        } catch (error) {
            console.error("Erro ao buscar disciplinas", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await disciplinaService.cadastrar(form);
            alert('Disciplina cadastrada com sucesso!');
            carregarDisciplinas();
            setForm({ codDisc: '', nome: '', cargaHoraria: 60 });
        } catch (error) {
            alert('Erro ao cadastrar disciplina. Talvez o código já exista.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestão de Disciplinas</h2>
            <hr />

            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Código (Ex: ENF0000)</label>
                            <input type="text" className="form-control" required maxLength={8}
                                value={form.codDisc}
                                onChange={e => setForm({ ...form, codDisc: e.target.value.toUpperCase() })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Nome da Disciplina</label>
                            <input type="text" className="form-control" required
                                value={form.nome}
                                onChange={e => setForm({ ...form, nome: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Carga Horária (horas)</label>
                            <input type="number" className="form-control"
                                value={form.cargaHoraria}
                                onChange={e => setForm({ ...form, cargaHoraria: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary">Cadastrar Disciplina</button>
                        </div>
                    </form>
                </div>
            </div>

            <h4>Disciplinas Disponíveis</h4>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinas.length === 0 ? (
                        <tr><td colSpan={3} className="text-center">Nenhuma disciplina cadastrada.</td></tr>
                    ) : (
                        disciplinas.map(d => (
                            <tr key={d.codDisc}>
                                <td className="fw-bold">{d.codDisc}</td>
                                <td>{d.nome}</td>
                                <td>{d.cargaHoraria}h</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}