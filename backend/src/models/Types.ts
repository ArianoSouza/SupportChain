export type User = {
    id: string;
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
  };
  
  export type Trilha = {
    id: string;
    title: string;
    icon: string;
  };
  
  export type Topic = {
    id: string;
    fk_id_trilha: string;
    order_position: number;
    description: string;
    title: string;
  };
  
  export type Content = {
    id: string;
    fk_id_topic: string;
    titles: string[];
    paragraphs: string[];
  };
  
   // Assuming Tag is just a string
  
  export type Activity = {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
  };
  
  export type ActivitieStage = {
    id: string;
    fk_id_activitie: string;
    title: string;
    do_time: number;
    objective: string;
    steps: string[];
  };
  
  export type Questionary = {
    id: string;
    fk_id_activitie: string;
    questions: string[];
    options: string[];
  };
  
  export type UserAnswer = {
    id: string;
    fk_user_id: string;
    fk_questionarie_id: string;
    answers: string[];
  };
  
  export type Video = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    likes: string[];
    tumbURL: string;
    URL: string;
  };
  
  export type Assistance = {
    id: string;
    name: string;
    image:string;
    description: string;
    specialities: string[];
    phoneNumber: string;
    estado: string;
    cidade: string;
    bairro: string;
  };
  
  export type ClickTag = {
    id: string;
    fk_user_id: string;
    trilhas: string[];
    videos: string[];
  };

  export type content ={
    id:string;
    fk_id_topic:string;
    titles: string[]
    paragraphs:string[]
  }

  export type AuthenticationData = {
    id: string;
    role?: string; 
  };