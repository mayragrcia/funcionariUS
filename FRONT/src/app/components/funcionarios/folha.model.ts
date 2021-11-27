export interface Folha {
    id: string,
    funcionarioID: string,
    competencia: string,
    nomeFuncionario: string,
    horasTrabalhadas: number,
    idCargoFuncionario: string,
    salarioBruto: number,
    salarioLiquido: number,
    inss: number,
    irrf: number
}

export interface CreateFolha {
    cpf: string,
    horasTrabalhadas: number | null
}