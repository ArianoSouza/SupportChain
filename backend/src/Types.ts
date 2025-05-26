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
    sexo: string,
    estado_civil: string ,
    data_nascimento: string,
    numero_telefone: string,
    estado: string,
    cidade: string,
    bairro: string,
    foto: string,
    termos_de_uso: boolean,
    envio_de_dados: boolean,
}

export type Login = {
    email: string,
    senha: string;
}

export interface AuthenticationData {
    id: string;
 }

 export type TProgresso = {
  id_user: string;
  id_etapa: string;
  concluida: boolean;
  data_conclusao?: Date;
}

export type TMidia ={
id_user: string,
file_name: string,
url: string
}