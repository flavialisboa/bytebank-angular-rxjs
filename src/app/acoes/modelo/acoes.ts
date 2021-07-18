export interface Acoes extends Array<Acao> {}
    //array de ação

export interface Acao {
    id: number;
    codigo: string;
    descricao: number;
    preco: number;
}

export interface AcoesAPI {
    payload: Acoes;
}
