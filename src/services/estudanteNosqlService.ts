import api from './api';

export interface EstudanteNosqlDTO {
  matEstudante: string;
  nome: string;
}

export const estudanteNosqlService = {
  listarTodos: async () => {
    const response = await api.get('/nosql/estudantes');
    return response.data;
  },

  cadastrar: async (dados: EstudanteNosqlDTO) => {
    const payload = {
      matEstudante: String(dados.matEstudante).trim(),
      usuario: {
        idUsuario: null,
        nome: String(dados.nome).trim(),
        email: null
      },
      matriculas: []
    };
    const response = await api.post('/nosql/estudantes', payload);
    return response.data;
  },

  deletar: async (matEstudante: string) => {
    const response = await api.delete(`/nosql/estudantes/${matEstudante}`);
    return response.data;
  }
};