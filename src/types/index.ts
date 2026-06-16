// src/types/index.ts

export interface Estudante {
    matEstudante: string;
    mc: number;
    usuarioCpf: string;
    anoIngresso: number;
}

export interface Turma {
    idTurma?: number; 
    disciplina: string;
    codigoTurma: number;
    ano: number;
    semestre: number;
}

export interface Disciplina {
    codDisc: string;
    nome: string;
    cargaHoraria?: number;
}

export interface CursaId {
    matEstudante: string;
    idTurma: number;
}

export interface Cursa {
    id: CursaId;
    estudante: Estudante;
    turma: Turma;
    nota: number | null;
}

// DTOs para envio de dados
export interface MatriculaDTO {
    matEstudante: string;
    idTurma: number;
}

export interface LancamentoNotaDTO {
    matEstudante: string;
    idTurma: number;
    nota: number;
}