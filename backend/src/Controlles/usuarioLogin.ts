import { User } from './../Types';
import { Express } from 'express';
import * as bcrypt from "bcryptjs";
import connection from '../data/connection';
import { Request, Response } from "express";
import { Authenticator } from '../Serviços/Authention';

export default async function GetLogin(
    req: Request,
    res: Response
): Promise<void>{
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(422).json({Message: "Preencha os campos a seguir!!"});
        }
        const [User] = await connection("usuario").where({email});

        if (!User) {
            res.status(400).json({Messagen: "Usuario não existente"});
        }
        const cripSenha = await bcrypt.compare(senha, User.senha)
        if (!cripSenha) {
            res.status(401).json({Messagen: "Senha invalida"});
        }

       const auth = new Authenticator();
       const token = auth.generateToken({id: User.id});

        res.status(200).json({Messagen:"Login realizado com sucessor", token})
    }
    catch(error:any){
   res.json({ message: error.message })
    }
}