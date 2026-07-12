// src/types/index.ts

export interface Usuario {
    cpf: string;
    nome: string;
    login: string;
    senha?: string;
}

export interface Professor {
    matProfessor: string;
    cpf: string;
    departamento: string;
    usuario?: Usuario;
}

export interface Estudante {
    matEstudante: string;
    mc: number;
    cpf: string;
    anoIngresso: number;
    usuario?: Usuario; // Adicionado o link para o nome real
}

export interface Turma {
    idTurma: number;
    ano: number;
    semestre: number;
    disciplina?: {
        codDisc: string;
        nome: string;
        cargaHoraria?: number;
    };
    numero?: number;       
    codigoTurma?: string;
    professores?: Professor[]; // Adicionado o vínculo da tabela "leciona"
}

export interface Disciplina {
    codDisc: string;
    nome: string;
    cargaHoraria?: number;
    deptoResponsavel?: string;
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

export interface MatriculaDTO {
    matEstudante: string;
    idTurma: number;
}

export interface LancamentoNotaDTO {
    matEstudante: string;
    idTurma: number;
    nota1?: number;
    nota2?: number;
    nota3?: number;
    faltas?: number;
}