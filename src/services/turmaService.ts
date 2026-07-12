import api from './api';
import type { Turma } from '../types';

export const turmaService = {
    // Busca todas as turmas cadastradas
    listarTodas: async () => {
        const response = await api.get<Turma[]>('/turmas');
        return response.data;
    },

    // Cadastra uma nova turma
    cadastrar: async (turma: Turma) => {
        const response = await api.post<Turma>('/turmas', turma);
        return response.data;
    },

    // Deleta uma turma pelo ID
    deletar: async (id: number) => {
        await api.delete(`/turmas/${id}`);
    }
};