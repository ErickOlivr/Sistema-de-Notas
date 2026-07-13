import api, { getNosqlPrefix } from './api';
import type {Estudante} from '../types';

export const estudanteService = {
    // Busca todos os alunos cadastrados
    listarTodos: async () => {
            const prefix = getNosqlPrefix();
            const response = await api.get<Estudante[]>(`${prefix}/estudantes`);
            return response.data;
    },

    // Cadastra um novo aluno
    cadastrar: async (estudante: Estudante) => {
        const isMongoActive = localStorage.getItem('database_mode') === 'mongodb';
        
        let payload: any = estudante;
        
        // Se for MongoDB, molda o JSON para o formato documental exatamente como testamos no Thunder Client
        if (isMongoActive) {
            // Extrai as chaves de forma segura, não importa qual nome venha do formulário do Erick
            const matriculaValida = (estudante as any).matEstudante || (estudante as any).matricula;
            const nomeValido = (estudante as any).nome || (estudante as any).usuario?.nome;

            payload = {
                matEstudante: String(matriculaValida),
                usuario: {
                    nome: nomeValido,
                    idUsuario: null,
                    email: null
                },
                matriculas: []
            };
        }
        const response = await api.post<Estudante>('/estudantes', payload);
            return response.data;
        },

    // Deleta um aluno pela matrícula
    deletar: async (matricula: string) => {
        const prefix = getNosqlPrefix();
        await api.delete(`${prefix}/estudantes/${matricula}`);
    }
};