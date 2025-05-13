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
  