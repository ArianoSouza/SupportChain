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
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  sexo: string;
  estado_civil: string;
  data_nascimento: string;
  numero_telefone: string;
  estado: string;
  cidade: string;
  bairro: string;
  foto: string;
  termos_de_uso: boolean;
  envio_de_dados: boolean;
}

export type ActivityCategory = {
    title: string;
    description: string;
    image: string;
    tag:Tag
  };
  
export type activityDetails ={
    title: string;
    description: string;
    icon: string;
    tags: Tag[]
    activities: activitie[]
    
}

export type activitie ={
    title: string
    doTime: number
    objective: string
    steps: string[]
}

export type Tag = 
  | "desintoxicação digital"
  | "conexão social"
  | "relaxamento"
  | "saúde mental"
  | "positividade"
  | "auto-reflexão"
  | "atividade física"
  | "bem-estar"
  | "autocontrole";
  

  export type question ={
    title: String
    options:String[]
  }
  export type questionFull ={
    id_atividade:String
    questions:question[]
  }

  export type videoTag = 'desintoxicação digital' | 'ansiedade' | 'mindfulness' | 'vício digital' | 'saúde do sono' | 'redes sociais' | 'equilíbrio digital' | 'depressão' | 'produtividade' | 'impacto das telas';

  export interface Video {
    id: string;
    title: string;
    description: string;
    tags: string[];
    likesNumber: number;
    tumbURL: string;
    URL: string;
  }

  export type VideoInfo={
      id: string;
      title: string;
      tags: string[];
      likesNumber: number;
      tumbURL: string;
  }