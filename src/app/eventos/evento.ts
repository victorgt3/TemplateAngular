export class Evento{
    id: string;
    nome: string;
    descricaoCurta: string;
    descricaoLonga: string;
    dataInicio: Date;
    dataFim: Date;
    gratuito: boolean;
    valor: number;
    nomeEmpresa: string;
    endereco: Endereco;
    categoriaId: string;
    organizadorId: string;
}

export class Endereco{
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
}

export class Categoria{
    id: string;
    nome: string;
}