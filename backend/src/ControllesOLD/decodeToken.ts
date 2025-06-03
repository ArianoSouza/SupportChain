import { Authenticator } from '../services/Authention';
import { Request,Response } from "express";


export default async function authToken(
    req: Request,
    res: Response
): Promise<any>{
  
try{
    const { token } = req.params
    const auth = new Authenticator();
   

    if(!token){
        res.status(400).json({message:'Erro: Sem token fonecido'})
        return;
    }

    const id  = auth.getTokenData(token)

    res.status(200).json({message:'Id verificado com sucesso'})

}
catch(error:any)
{
    console.error("Erro ao buscar progresso:", error);
    res.status(500).json({ message: "Erro interno ao buscar progresso!" });
}

}