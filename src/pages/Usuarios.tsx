import React, { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';
import { estudanteService } from '../services/estudanteService';
import { professorService } from '../services/professorService';
import type { Usuario, Estudante, Professor } from '../types';

export default function Usuarios() {
    const [tipoCadastro, setTipoCadastro] = useState<'ALUNO' | 'PROFESSOR'>('ALUNO');
    const [filtroLista, setFiltroLista] = useState<'ALUNO' | 'PROFESSOR'>('ALUNO');
    
    const [usuariosBase, setUsuariosBase] = useState<Usuario[]>([]);
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);

    const [form, setForm] = useState({
        cpf: '', nome: '', matricula: '', departamento: '', anoIngresso: ''
    });

    useEffect(() => { carregarTudo(); }, []);

    const carregarTudo = async () => {
        try {
            const [users, est, profs] = await Promise.all([
                usuarioService.listarTodos(), estudanteService.listarTodos(), professorService.listarTodos()
            ]);
            setUsuariosBase(users); setEstudantes(est); setProfessores(profs);
        } catch (error) { console.error("Erro ao buscar dados", error); }
    };

    const getNomePorCpf = (cpf: string) => {
        const user = usuariosBase.find(u => u.cpf === cpf);
        return user ? user.nome : 'Sem Nome Cadastrado';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            try {
                await usuarioService.cadastrar({
                    cpf: form.cpf, nome: form.nome, login: form.cpf, senha: '123'
                });
            } catch (err) {}

            if (tipoCadastro === 'ALUNO') {
                await estudanteService.cadastrar({
                    matEstudante: form.matricula, cpf: form.cpf, anoIngresso: Number(form.anoIngresso), mc: 0
                });
            } else {
                await professorService.cadastrar({
                    matProfessor: form.matricula, cpf: form.cpf, departamento: form.departamento
                });
            }

            alert(`✅ ${tipoCadastro === 'ALUNO' ? 'Aluno' : 'Professor'} cadastrado com sucesso!`);
            carregarTudo();
            setForm({ cpf: '', nome: '', matricula: '', departamento: '', anoIngresso: '' });
        } catch (error) {
            alert('❌ Erro ao cadastrar. Verifique se essa matrícula já não está em uso.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="display-6 fw-bold text-primary mb-4">Gestão de usuários</h2>

            <div className="card shadow-lg border-0 rounded-4 mb-5">
                <div className="card-body p-4">
                    <div className="mb-5 text-center">
                        <div className="btn-group shadow-sm" role="group">
                            <input type="radio" className="btn-check" id="btnAluno" 
                                checked={tipoCadastro === 'ALUNO'} onChange={() => setTipoCadastro('ALUNO')} />
                            <label className="btn btn-outline-primary px-5 py-2 fw-bold" htmlFor="btnAluno">Novo Aluno</label>

                            <input type="radio" className="btn-check" id="btnProf" 
                                checked={tipoCadastro === 'PROFESSOR'} onChange={() => setTipoCadastro('PROFESSOR')} />
                            <label className="btn btn-outline-primary px-5 py-2 fw-bold" htmlFor="btnProf">Novo Professor</label>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-4 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label fw-bold text-secondary">CPF</label>
                            <input type="text" className="form-control shadow-sm" required maxLength={11}
                                   value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label fw-bold text-secondary">Nome Completo</label>
                            <input type="text" className="form-control shadow-sm" required
                                   value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-secondary">Matrícula</label>
                            <input type="text" className="form-control shadow-sm" required
                                   value={form.matricula} onChange={e => setForm({ ...form, matricula: e.target.value })} />
                        </div>

                        {tipoCadastro === 'ALUNO' ? (
                            <div className="col-md-3">
                                <label className="form-label fw-bold text-primary">Ano de Ingresso</label>
                                <input type="text" className="form-control shadow-sm border-primary" required maxLength={4}
                                       value={form.anoIngresso} onChange={e => setForm({ ...form, anoIngresso: e.target.value.replace(/\D/g, '') })} />
                            </div>
                        ) : (
                            <div className="col-md-3">
                                <label className="form-label fw-bold text-success">Departamento</label>
                                <input type="text" className="form-control shadow-sm border-success" required maxLength={5} placeholder="Ex: DCOMP"
                                       value={form.departamento} onChange={e => setForm({ ...form, departamento: e.target.value })} />
                            </div>
                        )}
                        
                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
                             Salvar Cadastro
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-secondary mb-3 mb-md-0">Integrantes Cadastrados</h4>
                <select className="form-select w-auto fw-bold shadow-sm rounded-pill px-4" 
                        value={filtroLista} onChange={e => setFiltroLista(e.target.value as any)}>
                    <option value="ALUNO">Visualizar Alunos</option>
                    <option value="PROFESSOR">Visualizar Professores</option>
                </select>
            </div>

            <div className="table-responsive shadow-sm rounded-4">
                <table className="table table-hover align-middle mb-0 bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th className="py-3 px-4">CPF</th>
                            <th className="py-3">Nome</th>
                            <th className="py-3">Matrícula</th>
                            <th className="py-3">{filtroLista === 'ALUNO' ? 'Ano Ingresso' : 'Departamento'}</th>
                            <th className="py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtroLista === 'ALUNO' ? (
                            estudantes.length === 0 ? <tr><td colSpan={5} className="text-center py-4 text-muted">Nenhum aluno cadastrado.</td></tr> :
                            estudantes.map(est => (
                                <tr key={est.matEstudante}>
                                    <td className="px-4 text-secondary">{est.cpf}</td>
                                    <td className="fw-medium">{getNomePorCpf(est.cpf)}</td>
                                    <td><span className="badge bg-primary px-3 py-2 rounded-pill">{est.matEstudante}</span></td>
                                    <td>{est.anoIngresso}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={async () => {
                                            if(window.confirm('Excluir este aluno?')) { await estudanteService.deletar(est.matEstudante); carregarTudo(); }
                                        }}>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            professores.length === 0 ? <tr><td colSpan={5} className="text-center py-4 text-muted">Nenhum professor cadastrado.</td></tr> :
                            professores.map(prof => (
                                <tr key={prof.matProfessor}>
                                    <td className="px-4 text-secondary">{prof.cpf}</td>
                                    <td className="fw-medium">{getNomePorCpf(prof.cpf)}</td>
                                    <td><span className="badge bg-success px-3 py-2 rounded-pill">{prof.matProfessor}</span></td>
                                    <td><span className="badge bg-light text-dark border">{prof.departamento}</span></td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={async () => {
                                            if(window.confirm('Excluir este professor?')) { await professorService.deletar(prof.matProfessor); carregarTudo(); }
                                        }}>🗑️ Excluir</button>
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