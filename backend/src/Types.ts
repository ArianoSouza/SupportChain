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