import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import type { Turma, Disciplina, Professor } from '../types';
import { turmaService } from '../services/turmaService';
import { disciplinaService } from '../services/disciplinaService';
import { professorService } from '../services/professorService';

export default function Turmas() {
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);

    const [idTurmaInput, setIdTurmaInput] = useState('');
    const [anoInput, setAnoInput] = useState('');
    const [numeroInput, setNumeroInput] = useState('');
    const [semestreInput, setSemestreInput] = useState('1');

    const [selectedDiscCod, setSelectedDiscCod] = useState('');
    const [selectedProfMat, setSelectedProfMat] = useState('');

    const corrigirTexto = (texto: string) => {
        if (!texto) return texto;
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
            const [dadosTurmas, dadosDisc, dadosProf] = await Promise.all([
                turmaService.listarTodas(),
                disciplinaService.listar(), 
                professorService.listarTodos()
            ]);
            setTurmas(dadosTurmas);
            setDisciplinas(dadosDisc);
            setProfessores(dadosProf);
        } catch (error) {
            console.error("Erro ao buscar dados", error);
        }
    };

    const disciplinaSelecionada = disciplinas.find(d => d.codDisc === selectedDiscCod);
    const professoresFiltrados = professores.filter(p => 
        !disciplinaSelecionada || p.departamento === disciplinaSelecionada.deptoResponsavel
    );

    const discOptions = disciplinas.map(d => ({
        value: d.codDisc,
        label: `${d.codDisc} - ${corrigirTexto(d.nome)} (Depto: ${d.deptoResponsavel})`
    }));

    const profOptions = professoresFiltrados.map(p => ({
        value: p.matProfessor,
        label: `Prof. ${p.matProfessor} - ${p.usuario?.nome || ''} (Depto: ${p.departamento})`
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDiscCod || !anoInput || !numeroInput || !idTurmaInput) {
            alert("⚠️ Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        try {
            const turmaParaSalvar = {
                idTurma: Number(idTurmaInput),
                ano: Number(anoInput),
                semestre: Number(semestreInput),
                numero: Number(numeroInput),
                disciplina: { codDisc: selectedDiscCod },
                professores: selectedProfMat ? [{ matProfessor: selectedProfMat }] : []
            };

            await turmaService.cadastrar(turmaParaSalvar as any);
            alert('✅ Turma cadastrada com sucesso!');
            carregarTudo();
            
            setIdTurmaInput('');
            setAnoInput('');
            setNumeroInput('');
            setSemestreInput('1');
            setSelectedDiscCod('');
            setSelectedProfMat('');
        } catch (error) {
            alert('❌ Erro ao cadastrar turma. Dica: verifique se este ID já está em uso ou se o Ano/Semestre existe no banco.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="display-6 fw-bold text-primary mb-4"> Gestão de Turmas</h2>

            <div className="card shadow-lg border-0 rounded-4 mb-5">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="row g-4 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-secondary">Disciplina</label>
                            <Select 
                                options={discOptions}
                                placeholder="Buscar disciplina..."
                                noOptionsMessage={() => "Nenhuma disciplina encontrada"}
                                value={discOptions.find(o => o.value === selectedDiscCod) || null}
                                onChange={(selected) => {
                                    setSelectedDiscCod(selected?.value || '');
                                    setSelectedProfMat(''); 
                                }}
                                isClearable
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold text-secondary">Professor</label>
                            <Select 
                                options={profOptions}
                                placeholder="Buscar professor..."
                                noOptionsMessage={() => "Nenhum professor neste departamento"}
                                isDisabled={!selectedDiscCod}
                                value={profOptions.find(o => o.value === selectedProfMat) || null}
                                onChange={(selected) => setSelectedProfMat(selected?.value || '')}
                                isClearable
                            />
                        </div>

                        <div className="col-md-4">
                            <div className="row g-2">
                                <div className="col-3">
                                    <label className="form-label fw-bold text-danger">ID Novo</label>
                                    <input type="text" className="form-control shadow-sm border-danger text-danger fw-bold" 
                                        placeholder="Ex: 30" required value={idTurmaInput}
                                        onChange={e => { if (/^\d*$/.test(e.target.value)) setIdTurmaInput(e.target.value); }}
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="form-label fw-bold text-secondary">Ano</label>
                                    <input type="text" className="form-control shadow-sm" placeholder="Ex: 2017" required value={anoInput}
                                        onChange={e => { if (/^\d*$/.test(e.target.value)) setAnoInput(e.target.value); }}
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="form-label fw-bold text-secondary">Semestre</label>
                                    <select className="form-select shadow-sm" value={semestreInput} onChange={e => setSemestreInput(e.target.value)}>
                                        <option value="1">1º</option>
                                        <option value="2">2º</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label className="form-label fw-bold text-secondary">Turma</label>
                                    <input type="text" className="form-control shadow-sm" placeholder="Ex: 1" required value={numeroInput}
                                        onChange={e => { if (/^\d*$/.test(e.target.value)) setNumeroInput(e.target.value); }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-success btn-lg rounded-pill px-5 shadow-sm">
                                 Salvar Turma
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h4 className="fw-bold mb-3 text-secondary">Turmas Ativas no Sistema</h4>
            <div className="table-responsive shadow-sm rounded-4">
                <table className="table table-hover align-middle mb-0 bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3">Disciplina</th>
                            <th className="py-3">Professor(es)</th>
                            <th className="py-3">Turma / Semestre</th>
                            <th className="py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-4 text-muted">Nenhuma turma cadastrada.</td></tr>
                        ) : (
                            turmas.map(t => (
                                <tr key={t.idTurma}>
                                   <td className="px-4"><span className="badge bg-secondary px-3 py-2 rounded-pill">{t.idTurma}</span></td>
                                   <td className="fw-bold">{corrigirTexto(t.disciplina?.nome || t.disciplina?.codDisc || "Sem Disciplina")}</td>
                                   <td>
                                       {t.professores && t.professores.length > 0 
                                         ? <span className="badge bg-info text-dark">{t.professores.map(p => p.usuario?.nome || p.matProfessor).join(', ')}</span>
                                         : <span className="badge bg-light text-muted border">Não alocado</span>}
                                   </td>
                                   <td className="fw-medium">Turma {t.numero} - {t.ano}/{t.semestre}º</td>
                                   <td className="text-center">
                                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                            onClick={async () => {
                                                if(t.idTurma) {
                                                    await turmaService.deletar(t.idTurma);
                                                    carregarTudo();
                                                }
                                            }}>
                                            Excluir
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