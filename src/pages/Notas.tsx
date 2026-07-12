import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { turmaService } from '../services/turmaService';
import { notasService } from '../services/notasService';

export default function Notas() {
    const [turmas, setTurmas] = useState<any[]>([]);
    const [selectedTurma, setSelectedTurma] = useState('');
    const [alunosMatriculados, setAlunosMatriculados] = useState<any[]>([]);
    const [valoresEditados, setValoresEditados] = useState<{ [key: string]: { nota1: string, nota2: string, nota3: string, faltas: string } }>({});

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

    const turmaOptions = turmas.map(t => ({
        value: t.idTurma.toString(),
        label: `ID: ${t.idTurma} | ${corrigirTexto(t.disciplina?.nome || t.disciplina?.codDisc)} - Turma ${t.numero} (${t.ano}/${t.semestre}º)`
    }));

    const handleTurmaChange = async (idTurma: string) => {
        setSelectedTurma(idTurma);
        if (!idTurma) {
            setAlunosMatriculados([]);
            return;
        }

        try {
            const alunos = await notasService.listarAlunosPorTurma(Number(idTurma));
            setAlunosMatriculados(alunos);
            
            const estadoInicial: any = {};
            alunos.forEach((m: any) => {
                const mat = m.estudante?.matEstudante;
                estadoInicial[mat] = {
                    nota1: m.nota1 ? m.nota1.toString() : '',
                    nota2: m.nota2 ? m.nota2.toString() : '',
                    nota3: m.nota3 ? m.nota3.toString() : '',
                    faltas: m.faltas ? m.faltas.toString() : ''
                };
            });
            setValoresEditados(estadoInicial);
        } catch (error) {
            console.error("Erro ao carregar alunos da turma", error);
        }
    };

    const handleInputChange = (matEstudante: string, campo: string, valor: string) => {
        setValoresEditados(prev => ({
            ...prev,
            [matEstudante]: { ...prev[matEstudante], [campo]: valor }
        }));
    };

    const handleSalvarNota = async (matEstudante: string) => {
        const valores = valoresEditados[matEstudante];
        const dto = {
            matEstudante,
            idTurma: Number(selectedTurma),
            nota1: valores.nota1 === '' ? 0 : Number(valores.nota1),
            nota2: valores.nota2 === '' ? 0 : Number(valores.nota2),
            nota3: valores.nota3 === '' ? 0 : Number(valores.nota3),
            faltas: valores.faltas === '' ? 0 : Number(valores.faltas)
        };

        try {
            await notasService.lancarNotas(dto);
            alert('✅ Notas e faltas atualizadas com sucesso!');
        } catch (error) {
            alert('❌ Erro ao salvar as notas do aluno.');
        }
    };

    const filtrarNotaDecimal = (mat: string, campo: string, texto: string) => {
        if (texto === '' || /^\d*\.?\d*$/.test(texto)) {
            const num = parseFloat(texto);
            if (!isNaN(num) && (num < 0 || num > 10)) return; 
            handleInputChange(mat, campo, texto);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="display-6 fw-bold text-primary mb-4">Diário de Classe</h2>

            <div className="card shadow-lg border-0 rounded-4 mb-5">
                <div className="card-body p-4 row align-items-center">
                    <div className="col-md-8 mx-auto">
                        <label className="form-label fw-bold text-secondary text-center w-100 mb-3">Selecione a Turma para lançar notas</label>
                        <Select 
                            options={turmaOptions}
                            placeholder="🔍 Buscar disciplina ou turma..."
                            value={turmaOptions.find(o => o.value === selectedTurma) || null}
                            onChange={(selected) => handleTurmaChange(selected?.value || '')}
                            isClearable
                        />
                    </div>
                </div>
            </div>

            {selectedTurma && (
                <div>
                    <h4 className="fw-bold mb-3 text-secondary">Alunos da Turma</h4>
                    <div className="table-responsive shadow-sm rounded-4">
                        <table className="table table-hover align-middle mb-0 bg-white">
                            <thead className="table-dark">
                                <tr>
                                    <th className="py-3 px-4">Matrícula</th>
                                    <th className="py-3">Nome do Aluno</th>
                                    <th className="py-3 text-center" style={{ width: '110px' }}>Nota 1</th>
                                    <th className="py-3 text-center" style={{ width: '110px' }}>Nota 2</th>
                                    <th className="py-3 text-center" style={{ width: '110px' }}>Nota 3</th>
                                    <th className="py-3 text-center" style={{ width: '110px' }}>Faltas</th>
                                    <th className="py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunosMatriculados.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-4 text-muted">Nenhum aluno matriculado nesta turma ainda.</td></tr>
                                ) : (
                                    alunosMatriculados.map((m: any) => {
                                        const mat = m.estudante?.matEstudante;
                                        const nome = m.estudante?.usuario?.nome || "Não Identificado";
                                        
                                        return (
                                            <tr key={mat}>
                                                <td className="px-4"><span className="badge bg-primary px-3 py-2 rounded-pill">{mat}</span></td>
                                                <td className="fw-medium">{nome}</td>
                                                <td>
                                                    <input type="text" className="form-control text-center shadow-sm" placeholder="0.0"
                                                        value={valoresEditados[mat]?.nota1 ?? ''}
                                                        onChange={e => filtrarNotaDecimal(mat, 'nota1', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control text-center shadow-sm" placeholder="0.0"
                                                        value={valoresEditados[mat]?.nota2 ?? ''}
                                                        onChange={e => filtrarNotaDecimal(mat, 'nota2', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control text-center shadow-sm" placeholder="0.0"
                                                        value={valoresEditados[mat]?.nota3 ?? ''}
                                                        onChange={e => filtrarNotaDecimal(mat, 'nota3', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control text-center shadow-sm" placeholder="0"
                                                        value={valoresEditados[mat]?.faltas ?? ''}
                                                        onChange={e => {
                                                            if (/^\d*$/.test(e.target.value)) handleInputChange(mat, 'faltas', e.target.value);
                                                        }}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <button onClick={() => handleSalvarNota(mat)} className="btn btn-success rounded-pill px-4 shadow-sm">
                                                        Salvar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}