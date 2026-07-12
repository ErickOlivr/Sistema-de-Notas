import api from './api';
import type { Usuario } from '../types';

export const usuarioService = {
    listarTodos: async (): Promise<Usuario[]> => {
        const response = await api.get('/usuarios');
        return response.data;
    },
    
    cadastrar: async (usuario: Usuario): Promise<Usuario> => {
        const response = await api.post('/usuarios', usuario);
        return response.data;
    },
    
    deletar: async (cpf: string): Promise<void> => {
        await api.delete(`/usuarios/${cpf}`);
    }
};