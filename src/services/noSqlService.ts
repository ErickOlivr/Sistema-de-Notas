import { api } from './api';

export interface VinculoDTO {
  matEstudante: string;
  idTurma: string;
  nota1: number;
  faltas: number;
}

export const nosqlService = {
  estudantes: {
    listar: async () => {
      const response = await api.get('/nosql/estudantes');
      return response.data;
    },
    cadastrar: async (matricula: string, nome: string) => {
      const payload = {
        matEstudante: String(matricula).trim(),
        usuario: {
          idUsuario: null,
          nome: String(nome).trim(),
          email: `${String(nome).trim().toLowerCase().replace(/\s+/g, '')}@universidade.com`
        },
        matriculas: []
      };
      const response = await api.post('/nosql/estudantes', payload);
      return response.data;
    },
    deletar: async (matricula: string) => {
      const response = await api.delete(`/nosql/estudantes/${matricula}`);
      return response.data;
    }
  },

  cursos: {
    listar: async () => {
      const response = await api.get('/nosql/matriculas/cursos');
      return response.data;
    },
    cadastrar: async (idCurso: string, nome: string, departamento: string) => {
      const payload = {
        idCurso: String(idCurso).trim(),
        nome: String(nome).trim(),
        departamento: String(departamento).trim()
      };
      const response = await api.post('/nosql/matriculas/cursos', payload);
      return response.data;
    }
  },

  disciplinas: {
    listar: async () => {
      const response = await api.get('/nosql/matriculas/disciplinas');
      return response.data;
    },
    cadastrar: async (idDisciplina: string, codigo: string, nome: string, creditos: number) => {
      const payload = {
        idDisciplina: String(idDisciplina).trim(),
        codigo: String(codigo).trim(),
        nome: String(nome).trim(),
        creditos: Number(creditos)
      };
      const response = await api.post('/nosql/matriculas/disciplinas', payload);
      return response.data;
    }
  },

  turmas: {
    listar: async () => {
      const response = await api.get('/nosql/matriculas/turmas');
      return response.data;
    },
    cadastrar: async (idTurma: string, idDisciplina: string, codigoTurma: string, semestre: string) => {
      const payload = {
        idTurma: String(idTurma).trim(),
        idDisciplina: String(idDisciplina).trim(),
        codigoTurma: String(codigoTurma).trim(),
        semestre: String(semestre).trim()
      };
      const response = await api.post('/nosql/matriculas/turmas', payload);
      return response.data;
    }
  },

  vinculos: {
    listarPorEstudante: async (matricula: string) => {
      const response = await api.get(`/nosql/matriculas/${matricula}`);
      return response.data;
    },
    cadastrar: async (matricula: string, idTurma: string, codigoTurma: string) => {
      const payload = {
        idTurma: String(idTurma).trim(),
        codigoTurma: String(codigoTurma).trim(),
        nota1: 0,
        faltas: 0
      };
      const response = await api.post(`/nosql/matriculas/${matricula}`, payload);
      return response.data;
    },
    atualizarNotas: async (dados: VinculoDTO) => {
      const payload = {
        idTurma: String(dados.idTurma).trim(),
        nota1: Number(dados.nota1),
        faltas: Number(dados.faltas)
      };
      const response = await api.put(`/nosql/matriculas/${dados.matEstudante}/${dados.idTurma}`, payload);
      return response.data;
    }
  }
};