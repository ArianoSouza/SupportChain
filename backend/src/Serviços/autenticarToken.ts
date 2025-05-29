import { Request,Response,NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../Types";

const chaveSecreta: string = "lalay2002"

export default async function autenticarToken(
    req:any,
    res:Response,
    next:NextFunction
):Promise<void> {
    const tokenHeader = req.headers.authorization;

     if (!tokenHeader) {
    res.status(401).json({ mensagem: 'Acesso negado! Nenhum token fornecido' })
     return;
    }

    const rawToken = tokenHeader.split(" ")[1];

    try{
       console.log("Chave Secreta:", chaveSecreta);
       console.log("Token recebido:", tokenHeader);
       console.log("Payload decodificado sem verificar assinatura:", jwt.decode(rawToken));

     const decodifica = jwt.verify(rawToken, chaveSecreta, { algorithms: ["HS256"] }) as AuthenticationData;
     console.log("Token decodificado:", decodifica);

      req.usuario = decodifica;
     next();
    }catch(error:any){
       console.error("Erro ao verificar token:", error.message);
      res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }
}