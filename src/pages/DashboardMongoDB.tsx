import React, { useState, useEffect } from 'react';
import { nosqlService } from '../services/noSqlService';

export default function DashboardMongo() {
  const [abaInterna, setAbaInterna] = useState<'estudantes' | 'estruturas' | 'vinculos'>('estudantes');

  const [nomeEstudante, setNomeEstudante] = useState('');
  const [matEstudante, setMatEstudante] = useState('');
  const [listaEstudantes, setListaEstudantes] = useState<any[]>([]);

  const [idCurso, setIdCurso] = useState('');
  const [nomeCurso, setNomeCurso] = useState('');
  const [deptoCurso, setDeptoCurso] = useState('');
  const [listaCursos, setListaCursos] = useState<any[]>([]);

  const [idDisciplina, setIdDisciplina] = useState('');
  const [codDisciplina, setCodDisciplina] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [creditosDisciplina, setCreditosDisciplina] = useState(1);
  const [listaDisciplinas, setListaDisciplinas] = useState<any[]>([]);

  const [idTurma, setIdTurma] = useState('');
  const [idDiscTurma, setIdDiscTurma] = useState('');
  const [codTurma, setCodTurma] = useState('');
  const [semestreTurma, setSemestreTurma] = useState('');
  const [listaTurmas, setListaTurmas] = useState<any[]>([]);

  const [buscaMatricula, setBuscaMatricula] = useState('');
  const [listaVinculos, setListaVinculos] = useState<any[]>([]);
  const [vinculoMatricula, setVinculoMatricula] = useState('');
  const [vinculoTurmaId, setVinculoTurmaId] = useState('');
  const [vinculoTurmaCod, setVinculoTurmaCod] = useState('');

  const [editMatricula, setEditMatricula] = useState('');
  const [editTurmaId, setEditTurmaId] = useState('');
  const [novaNota, setNovaNota] = useState(0);
  const [novasFaltas, setNovasFaltas] = useState(0);

  const carregarEstudantes = async () => {
    try {
      const dados = await nosqlService.estudantes.listar();
      setListaEstudantes(dados || []);
    } catch (err) {
      console.error(err);
    }
  };

  const carregarEstruturas = async () => {
    try {
      const cursos = await nosqlService.cursos.listar();
      setListaCursos(cursos || []);
      const discs = await nosqlService.disciplinas.listar();
      setListaDisciplinas(discs || []);
      const turmas = await nosqlService.turmas.listar();
      setListaTurmas(turmas || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (abaInterna === 'estudantes') {
      carregarEstudantes();
    } else if (abaInterna === 'estruturas') {
      carregarEstruturas();
    }
  }, [abaInterna]);

  const handleSalvarEstudante = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.estudantes.cadastrar(matEstudante, nomeEstudante);
      setNomeEstudante('');
      setMatEstudante('');
      carregarEstudantes();
      alert("Estudante e Usuário salvos no MongoDB Atlas!");
    } catch (err) {
      alert("Erro ao salvar estudante.");
    }
  };

  const handleDeletarEstudante = async (matricula: string) => {
    if (confirm("Excluir estudante permanentemente do MongoDB?")) {
      try {
        await nosqlService.estudantes.deletar(matricula);
        carregarEstudantes();
      } catch (err) {
        alert("Erro ao deletar estudante.");
      }
    }
  };

  const handleSalvarCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.cursos.cadastrar(idCurso, nomeCurso, deptoCurso);
      setIdCurso('');
      setNomeCurso('');
      setDeptoCurso('');
      carregarEstruturas();
      alert("Curso criado no MongoDB Atlas!");
    } catch (err) {
      alert("Erro ao criar curso.");
    }
  };

  const handleSalvarDisciplina = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.disciplinas.cadastrar(idDisciplina, codDisciplina, nomeDisciplina, creditosDisciplina);
      setIdDisciplina('');
      setCodDisciplina('');
      setNomeDisciplina('');
      setCreditosDisciplina(1);
      carregarEstruturas();
      alert("Disciplina criada no MongoDB Atlas!");
    } catch (err) {
      alert("Erro ao criar disciplina.");
    }
  };

  const handleSalvarTurma = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.turmas.cadastrar(idTurma, idDiscTurma, codTurma, semestreTurma);
      setIdTurma('');
      setIdDiscTurma('');
      setCodTurma('');
      setSemestreTurma('');
      carregarEstruturas();
      alert("Turma criada no MongoDB Atlas!");
    } catch (err) {
      alert("Operação negada: A disciplina informada deve existir na coleção.");
    }
  };

  const handleBuscarVinculos = async () => {
    if (!buscaMatricula) return;
    try {
      const dados = await nosqlService.vinculos.listarPorEstudante(buscaMatricula);
      setListaVinculos(dados || []);
    } catch (err) {
      alert("Estudante não encontrado.");
      setListaVinculos([]);
    }
  };

  const handleSalvarVinculo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.vinculos.cadastrar(vinculoMatricula, vinculoTurmaId, vinculoTurmaCod);
      setVinculoMatricula('');
      setVinculoTurmaId('');
      setVinculoTurmaCod('');
      alert("Matrícula efetuada no bloco NoSQL!");
    } catch (err) {
      alert("Erro ao vincular matrícula.");
    }
  };

  const handleAtualizarNotas = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await nosqlService.vinculos.atualizarNotas({
        matEstudante: editMatricula,
        idTurma: editTurmaId,
        nota1: novaNota,
        faltas: novasFaltas
      });
      setEditMatricula('');
      setEditTurmaId('');
      setNovaNota(0);
      setNovasFaltas(0);
      handleBuscarVinculos();
      alert("Notas e faltas persistidas no documento!");
    } catch (err) {
      alert("Erro ao atualizar notas.");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-success">
      <h3 className="text-success mb-4">Painel de Controle NoSQL - MongoDB Atlas</h3>

      <div className="btn-group mb-4" role="group">
        <button className={`btn ${abaInterna === 'estudantes' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setAbaInterna('estudantes')}>Usuários & Estudantes</button>
        <button className={`btn ${abaInterna === 'estruturas' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setAbaInterna('estruturas')}>Cursos, Disciplinas & Turmas</button>
        <button className={`btn ${abaInterna === 'vinculos' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setAbaInterna('vinculos')}>Matrículas & Notas</button>
      </div>

      {abaInterna === 'estudantes' && (
        <div>
          <form onSubmit={handleSalvarEstudante} className="row g-3 mb-4">
            <div className="col-md-5">
              <label className="form-label">Nome do Usuário</label>
              <input type="text" className="form-control" value={nomeEstudante} onChange={e => setNomeEstudante(e.target.value)} required />
            </div>
            <div className="col-md-5">
              <label className="form-label">Matrícula (ID Estudante)</label>
              <input type="text" className="form-control" value={matEstudante} onChange={e => setMatEstudante(e.target.value)} required />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">Salvar</button>
            </div>
          </form>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>matEstudante</th>
                <th>Nome do Usuário (Embutido)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaEstudantes.map((est, i) => (
                <tr key={i}>
                  <td>{est.matEstudante}</td>
                  <td>{est.usuario?.nome}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeletarEstudante(est.matEstudante)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {abaInterna === 'estruturas' && (
        <div>
          <div className="row mb-5">
            <div className="col-md-4 border-end">
              <h5>Criar Curso</h5>
              <form onSubmit={handleSalvarCurso} className="mb-3">
                <div className="mb-2"><label className="form-label">ID Curso</label><input type="text" className="form-control" value={idCurso} onChange={e => setIdCurso(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Nome Curso</label><input type="text" className="form-control" value={nomeCurso} onChange={e => setNomeCurso(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Departamento</label><input type="text" className="form-control" value={deptoCurso} onChange={e => setDeptoCurso(e.target.value)} required /></div>
                <button type="submit" className="btn btn-success w-100 btn-sm">Criar Curso</button>
              </form>
            </div>
            <div className="col-md-4 border-end">
              <h5>Criar Disciplina</h5>
              <form onSubmit={handleSalvarDisciplina} className="mb-3">
                <div className="mb-2"><label className="form-label">ID Disciplina</label><input type="text" className="form-control" value={idDisciplina} onChange={e => setIdDisciplina(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Código Disciplina</label><input type="text" className="form-control" value={codDisciplina} onChange={e => setCodDisciplina(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Nome Disciplina</label><input type="text" className="form-control" value={nomeDisciplina} onChange={e => setNomeDisciplina(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Créditos</label><input type="number" min="1" className="form-control" value={creditosDisciplina} onChange={e => setCreditosDisciplina(Number(e.target.value))} required /></div>
                <button type="submit" className="btn btn-success w-100 btn-sm">Criar Disciplina</button>
              </form>
            </div>
            <div className="col-md-4">
              <h5>Criar Turma</h5>
              <form onSubmit={handleSalvarTurma} className="mb-3">
                <div className="mb-2"><label className="form-label">ID Turma</label><input type="text" className="form-control" value={idTurma} onChange={e => setIdTurma(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">ID Disciplina Relacionada</label><input type="text" className="form-control" value={idDiscTurma} onChange={e => setIdDiscTurma(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Código/Nome Turma</label><input type="text" className="form-control" value={codTurma} onChange={e => setCodTurma(e.target.value)} required /></div>
                <div className="mb-2"><label className="form-label">Semestre</label><input type="text" className="form-control" value={semestreTurma} onChange={e => setSemestreTurma(e.target.value)} required /></div>
                <button type="submit" className="btn btn-success w-100 btn-sm">Criar Turma</button>
              </form>
            </div>
          </div>

          <div className="row pt-3 border-top">
            <div className="col-md-4">
              <h6>Cursos no Atlas</h6>
              <ul className="list-group">
                {listaCursos.map((c, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    {c.nome} <span className="badge bg-success rounded-pill">{c.idCurso}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6>Disciplinas no Atlas</h6>
              <ul className="list-group">
                {listaDisciplinas.map((d, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    {d.nome} <span className="badge bg-success rounded-pill">{d.codigo}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6>Turmas no Atlas</h6>
              <ul className="list-group">
                {listaTurmas.map((t, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    Turma {t.codigoTurma} <span className="badge bg-success rounded-pill">{t.idTurma}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {abaInterna === 'vinculos' && (
        <div>
          <div className="row g-3 mb-4 border-bottom pb-4">
            <h5>Nova Matrícula (Vínculo Cursa)</h5>
            <form onSubmit={handleSalvarVinculo} className="row g-2">
              <div className="col-md-4"><input type="text" className="form-control" placeholder="Matrícula Estudante" value={vinculoMatricula} onChange={e => setVinculoMatricula(e.target.value)} required /></div>
              <div className="col-md-4"><input type="text" className="form-control" placeholder="ID Turma" value={vinculoTurmaId} onChange={e => setVinculoTurmaId(e.target.value)} required /></div>
              <div className="col-md-2"><input type="text" className="form-control" placeholder="Código Turma" value={vinculoTurmaCod} onChange={e => setVinculoTurmaCod(e.target.value)} required /></div>
              <div className="col-md-2"><button type="submit" className="btn btn-success w-100">Matricular</button></div>
            </form>
          </div>

          <div className="mb-4">
            <h5>Consultar e Lançar Notas</h5>
            <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
              <input type="text" className="form-control" placeholder="Digite a matrícula do estudante" value={buscaMatricula} onChange={e => setBuscaMatricula(e.target.value)} />
              <button className="btn btn-dark" type="button" onClick={handleBuscarVinculos}>Buscar</button>
            </div>

            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID Turma</th>
                  <th>Código Turma</th>
                  <th>Nota 1</th>
                  <th>Faltas</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaVinculos.map((v, i) => (
                  <tr key={i}>
                    <td>{v.idTurma}</td>
                    <td>{v.codigoTurma}</td>
                    <td>{v.nota1}</td>
                    <td>{v.faltas}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => { setEditMatricula(buscaMatricula); setEditTurmaId(v.idTurma); setNovaNota(v.nota1); setNovasFaltas(v.faltas); }}>Editar Notas</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editTurmaId && (
            <div className="card p-3 bg-light" style={{ maxWidth: '400px' }}>
              <h6>Alterar Dados: Turma {editTurmaId}</h6>
              <form onSubmit={handleAtualizarNotas}>
                <div className="mb-2"><label className="form-label">Nota 1</label><input type="number" step="0.1" className="form-control" value={novaNota} onChange={e => setNovaNota(Number(e.target.value))} required /></div>
                <div className="mb-2"><label className="form-label">Faltas</label><input type="number" className="form-control" value={novasFaltas} onChange={e => setNovasFaltas(Number(e.target.value))} required /></div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">Salvar Alterações</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditTurmaId('')}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}