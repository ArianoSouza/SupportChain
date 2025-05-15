export type books = {
    title:String
    author:String
    cover:string
}

export type articles = {
    title: String,
    authors: String,
    id:String,
    link:String
    tags:String[]
}

export type news = {
    titulo: String,
    autor: String,
    descricao:String,
    publicado_em:String,
    url:String,
    imagem:String
}

export type userNotes = {
    title?:String,
    content:String
    noteType:String
    noteDate: String
}
export type Assistance = {
    id:string
    image: string;
    name: string;
    location: string;
    phone: string;
    services: string[];
    description:string
  }

  export type TrilhaModulo = {
    id: number;
    order: number;
    title: string;
    desc: string;
    conteudos: string[];
  };

export type userData ={
    nome:string,
    sobrenome: string,
    email:string,
    senha: string,
    sexo: string,
    estado_civil: string,
    data_de_nascimento: string,
    numero_de_telefone: string,
    estado: string,
    cidade: string,
    bairro: string
}
  