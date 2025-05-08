export type TTrilhas={
nome: string,
descricao: string,
objetivo: string
};

export type TEtapas={
    id_trilha: number,
    ordem: number, 
    titulo: string, 
    descricao:string
};

export type TConteudos={
    id_etapa:number,
    tipo:string,
    titulo:string,
    descricao:string,
    videoLinks: any[],
    artigoLinks: any[];      
    ConteudoTextos: any[]; 
    Imagens: any[]; 
}

export type User={
    id:string,
    nome:string,
    sobrenome:string,
    email: string
    senha: string,
    sexo: string
    estado_civil: string 
    data_de_nascimento: string
    numero_de_telefone: string
    estado: string
    cidade: string
    bairro: string
    foto: string;
}

export type Login = {
    email: string,
    senha: string;
}