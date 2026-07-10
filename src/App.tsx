import React, { useState } from 'react';
import Usuarios from './pages/Usuarios';
import Turmas from './pages/Turmas';
import Disciplinas from './pages/Disciplinas';
import Matriculas from './pages/Matriculas';
import Notas from './pages/Notas';

function App() {
  const [abaAtiva, setAbaAtiva] = useState<'usuarios' | 'estudantes' | 'turmas' | 'disciplinas' | 'matriculas' | 'notas'>('usuarios');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Sistema Universitário</a>
          <div className="navbar-nav">
            <button className={`nav-link btn btn-link ${abaAtiva === 'usuarios' ? 'active fw-bold' : ''}`} onClick={() => setAbaAtiva('usuarios')}>Usuários</button>
            <button className={`nav-link btn btn-link ${abaAtiva === 'disciplinas' ? 'active fw-bold' : ''}`} onClick={() => setAbaAtiva('disciplinas')}>Disciplinas</button>
            <button className={`nav-link btn btn-link ${abaAtiva === 'turmas' ? 'active fw-bold' : ''}`} onClick={() => setAbaAtiva('turmas')}>Turmas</button>
            <button className={`nav-link btn btn-link ${abaAtiva === 'matriculas' ? 'active fw-bold' : ''}`} onClick={() => setAbaAtiva('matriculas')}>Matrículas</button>
            <button className={`nav-link btn btn-link ${abaAtiva === 'notas' ? 'active fw-bold' : ''}`} onClick={() => setAbaAtiva('notas')}>Lançar Notas</button>
          </div>
        </div>
      </nav>

      <main>
        {abaAtiva === 'usuarios' && <Usuarios />}
        {abaAtiva === 'disciplinas' && <Disciplinas />}
        {abaAtiva === 'turmas' && <Turmas />}
        {abaAtiva === 'matriculas' && <Matriculas />}
        {abaAtiva === 'notas' && <Notas />}
      </main>
    </div>
  );
}

export default App;