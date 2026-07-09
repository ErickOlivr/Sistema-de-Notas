import api from './api';
import type { Disciplina } from '../types';

export const disciplinaService = {
    listar: async () => {
        const response = await api.get('/disciplinas');
        return response.data;
    },
    cadastrar: async (d: Disciplina) => {
        const response = await api.post('/disciplinas', d);
        return response.data;
    },
    // Adicione esta nova função com a vírgula:
    deletar: async (codDisc: string) => {
        const response = await api.delete(`/disciplinas/${codDisc}`);
        return response.data;
    }
};