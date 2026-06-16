import api from './api';
import type { Disciplina } from '../types';

export const disciplinaService = {
    listar: async () => (await api.get<Disciplina[]>('/disciplinas')).data,
    cadastrar: async (d: Disciplina) => (await api.post<Disciplina>('/disciplinas', d)).data
};