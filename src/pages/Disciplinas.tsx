import React, { useState, useEffect } from 'react'; 
import type { Disciplina } from '../types'; 
import { disciplinaService } from '../services/disciplinaService'; 

export default function Disciplinas() { 
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]); 
    const [form, setForm] = useState<Disciplina>({ codDisc: '', nome: '', cargaHoraria: '' as any }); 
    
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
            alert('✅ Disciplina cadastrada com sucesso!'); 
            carregarDisciplinas(); 
            setForm({ codDisc: '', nome: '', cargaHoraria: '' as any }); 
        } catch (error) { 
            alert('❌ Erro ao cadastrar disciplina. Talvez o código já exista.'); 
        } 
    }; 

    const handleDelete = async (codDisc: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
            try {
                await disciplinaService.deletar(codDisc);
                alert('Disciplina excluída com sucesso!');
                carregarDisciplinas();
            } catch (error) {
                alert('❌ Erro ao excluir! O banco de dados bloqueou a ação. Verifique se existem turmas ativas usando esta disciplina.');
            }
        }
    };
    
    return ( 
        <div className="container py-5"> 
            <h2 className="display-6 fw-bold text-primary mb-4">Gestão de Disciplinas</h2> 
            
            <div className="card shadow-lg border-0 rounded-4 mb-5"> 
                <div className="card-body p-4"> 
                    <form onSubmit={handleSubmit} className="row g-4 align-items-end"> 
                        <div className="col-md-3"> 
                            <label className="form-label fw-bold text-secondary">Código (Ex: ENF0000)</label> 
                            <input type="text" className="form-control shadow-sm" required maxLength={8} 
                                value={form.codDisc} 
                                onChange={e => setForm({ ...form, codDisc: e.target.value.toUpperCase() })} 
                            /> 
                        </div> 
                        <div className="col-md-6"> 
                            <label className="form-label fw-bold text-secondary">Nome da Disciplina</label> 
                            <input type="text" className="form-control shadow-sm" required 
                                value={form.nome} 
                                onChange={e => setForm({ ...form, nome: e.target.value })} 
                            /> 
                        </div> 
                        <div className="col-md-3"> 
                            <label className="form-label fw-bold text-secondary">Carga Horária (horas)</label> 
                            <input type="number" className="form-control shadow-sm" 
                                value={form.cargaHoraria} 
                                onChange={e => setForm({ ...form, cargaHoraria: e.target.value === '' ? '' as any : Number(e.target.value) })} 
                            /> 
                        </div> 
                        <div className="col-12 text-end mt-4"> 
                            <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"> 
                                Cadastrar Disciplina 
                            </button> 
                        </div> 
                    </form> 
                </div> 
            </div> 
            
            <h4 className="fw-bold mb-3 text-secondary">Disciplinas Disponíveis</h4> 
            <div className="table-responsive shadow-sm rounded-4"> 
                <table className="table table-hover align-middle mb-0 bg-white"> 
                    <thead className="table-dark"> 
                        <tr> 
                            <th className="py-3 px-4">Código</th> 
                            <th className="py-3">Nome</th> 
                            <th className="py-3">Carga Horária</th> 
                            <th className="py-3 text-center">Ações</th> 
                        </tr> 
                    </thead> 
                    <tbody> 
                        {disciplinas.length === 0 ? ( 
                            <tr><td colSpan={4} className="text-center py-4 text-muted">Nenhuma disciplina cadastrada.</td></tr> 
                        ) : ( 
                            disciplinas.map(d => ( 
                                <tr key={d.codDisc}> 
                                    <td className="fw-bold text-primary px-4">{d.codDisc}</td> 
                                    <td className="fw-medium">{corrigirTexto(d.nome)}</td> 
                                    <td><span className="badge bg-secondary">{d.cargaHoraria}h</span></td> 
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-sm btn-outline-danger rounded-pill px-3 shadow-sm"
                                            onClick={() => handleDelete(d.codDisc)}
                                        >
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