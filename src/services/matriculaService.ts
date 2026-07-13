import api, { getNosqlPrefix } from './api';

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
        const prefix = getNosqlPrefix();
        
        // Se for MongoDB, a rota e o payload mudam para o modelo embutido que testamos
        if (prefix === '/nosql') {
            const payloadNoSql = {
                idTurma: String(dados.idTurma), // Garante que vire String para o Mongo
                nota1: 0.0,
                faltas: 0
            };
            // Rota testada no Thunder Client: /api/nosql/matriculas/123456
            const response = await api.post(`/nosql/matriculas/${dados.matEstudante}`, payloadNoSql);
            return response.data;
        }
        
        // Mantém o padrão original intacto se o botão estiver no modo SQL (PostgreSQL)
        const payloadSql = {
            estudante: { matEstudante: dados.matEstudante },
            turma: { idTurma: dados.idTurma }
        };
        const response = await api.post('/matriculas', payloadSql);
        return response.data;
    },

    cancelar: async (matEstudante: string, idTurma: number) => {
        await api.delete(`/matriculas/estudante/${matEstudante}/turma/${idTurma}`);
    }
};