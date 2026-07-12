import api from './api';
import type {Estudante} from '../types';

export const estudanteService = {
    // Busca todos os alunos cadastrados
    listarTodos: async () => {
        const response = await api.get<Estudante[]>('/estudantes');
        return response.data;
    },

    // Cadastra um novo aluno
    cadastrar: async (estudante: Estudante) => {
        const response = await api.post<Estudante>('/estudantes', estudante);
        return response.data;
    },

    // Deleta um aluno pela matrícula
    deletar: async (matricula: string) => {
        await api.delete(`/estudantes/${matricula}`);
    }
};