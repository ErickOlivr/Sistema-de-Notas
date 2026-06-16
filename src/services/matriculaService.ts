import api from './api';

export interface MatriculaDTO {
    matEstudante: string;
    idTurma: number;
}

export const matriculaService = {
    listarTodas: async () => {
        const response = await api.get('/matriculas');
        return response.data;
    },
    
    matricular: async (dados: MatriculaDTO) => {
        const payload = {
            estudante: { matEstudante: dados.matEstudante },
            turma: { idTurma: dados.idTurma }
        };
        const response = await api.post('/matriculas', payload);
        return response.data;
    },

    cancelar: async (matEstudante: string, idTurma: number) => {
        await api.delete(`/matriculas/estudante/${matEstudante}/turma/${idTurma}`);
    }
};