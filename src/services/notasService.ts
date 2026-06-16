import api from './api';

export interface LancamentoNotaDTO {
    matEstudante: string;
    idTurma: number;
    nota1: number;
    nota2: number;
    nota3: number;
    faltas: number;
}

export const notasService = {
    // Busca todos os alunos matriculados em uma turma específica
    listarAlunosPorTurma: async (idTurma: number) => {
        const response = await api.get(`/matriculas/turma/${idTurma}`);
        return response.data;
    },

    // Envia as notas e faltas atualizadas para o Java
    lancarNotas: async (dados: LancamentoNotaDTO) => {
        await api.put('/matriculas/lancar-notas', dados);
    }
};