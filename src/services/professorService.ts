import api from './api';
import type { Professor } from '../types';

export const professorService = {
    listarTodos: async (): Promise<Professor[]> => {
        const response = await api.get('/professores');
        return response.data;
    },
    cadastrar: async (professor: Professor): Promise<void> => {
        await api.post('/professores', professor);
    },
    deletar: async (matricula: string): Promise<void> => {
        await api.delete(`/professores/${matricula}`);
    }
};