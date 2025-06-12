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
  | "autocontrole"
  | "culinária"
  

  export type question ={
    title: String
    options:String[]
  }
  export type questionFull ={
    id_atividade:String
    questions:question[]
  }

  export type videoTag = 'desintoxicação digital' | 'ansiedade' | 'mindfulness' | 'vício digital' | 'saúde do sono' | 'redes sociais' | 'equilíbrio digital' | 'depressão' | 'produtividade' | 'impacto das telas';


    // novos
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
  export interface AddLikeApiResponse {
    message: string;
    videoId: string;
    totalLikes: number;
  }




  export type Trilha = {
    id: string;
    title: string;
    icon: string;
  };
  export interface GetAllTrilhasApiResponse {
    message: string;
    trilhas: Trilha[];
  }

  export type Topic = {
    id: string;
    fk_id_trilha: string;
    order_position: number;
    description: string;
    title: string;
  };

  export interface GetTopicsByTrilhaIdApiResponse {
    message: string;
    topics: Topic[];
  }

  export interface Content {
    id: string;
    fk_id_topic: string;
    titles: string[];
    paragraphs: string[];
    // Se a API retornar 'media', adicione aqui, por exemplo:
    // media?: any[]; // ou um tipo mais específico se souber a estrutura
  }
  
  export interface GetContentByTopicIdApiResponse {
    message: string;
    content: Content; // A API retorna um objeto 'content' dentro da resposta
  }

  export interface Activity {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
  }
  
  export interface GetActivitiesByTagApiResponse {
    message: string;
    activities: Activity[];
  }

  export interface ActivitieStage {
    id: string;
    fk_id_activitie: string;
    title: string;
    do_time: number; // No backend, você usou 'do_time', certifique-se de que o mapping está correto
    objective: string;
    steps: string[];
  }
  
  export interface GetStagesByActivitieIdApiResponse {
    message: string;
    stages: ActivitieStage[];
  }

  export interface Questionary {
    id: string;
    fk_id_activitie: string;
    questions: string[];
    options: any[]; // Pode ser array de arrays ou array de strings, dependendo da sua estrutura
  }
  
  export interface GetQuestionaryByActivitieIdApiResponse {
    message: string;
    questionary: Questionary;
    hasAnswered: boolean;
  }

  export interface UserAnswer {
    id: string;
    fk_user_id: string;
    fk_questionarie_id: string;
    answers: string[];
  }
  
  // Interface para o corpo da requisição POST
  export interface PostUserAnswersRequestBody {
    fk_questionarie_id: string;
    answers: string[];
  }
  
  // Interface para a resposta da requisição POST
  export interface PostUserAnswersApiResponse {
    message: string;
    answerId: string; // A API retorna o ID da nova resposta criada
  }

  // src/app/models/click-tag.model.ts

export interface ClickTag {
  id: string;
  fk_user_id: string;
  trilhas: string[];
  videos: string[]; // Array de strings, como definido no seu backend
}

// Interface para o corpo da requisição PUT
export interface AlterClickTagsVideoRequestBody {
  tags: string[]; // As novas tags a serem adicionadas
}

// Interface para a resposta da requisição PUT
export interface AlterClickTagsVideoApiResponse {
  message: string;
  updatedTags: string[]; // Retorna o array completo de tags após a atualização
}

export interface Assistance {
  id: string;
  name: string;
  image: string;
  description: string;
  specialities: string;
  phoneNumber: string;
  estado: string;
  cidade: string;
  bairro: string;
}

// Interface para as informações de endereço do usuário retornadas pela API
export interface UserAddress {
  estado: string;
  cidade: string;
  bairro: string;
}

// Interface para a resposta completa da API
export interface GetAllAssistancesApiResponse {
  message: string;
  userAddress: UserAddress;
  assistances: Assistance[];
}

export interface UserInfo {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  sexo: string;
  estado_civil: string;
  data_nascimento: string;
  numero_telefone: string;
  estado: string;
  cidade: string;
  bairro: string;
  foto: string;
  termos_de_uso?: boolean; // Opcional, dependendo se a API sempre retorna
  envio_de_dados?: boolean; // Opcional, dependendo se a API sempre retorna
}

// Interface para a resposta completa da API
export interface GetUserInfoApiResponse {
  message: string;
  user: UserInfo; // A API retorna um objeto 'user' dentro da resposta
}

export interface AlterUserInfoApiResponse {
  message: string;
}