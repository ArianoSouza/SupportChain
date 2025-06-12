import { User } from '../models/Types';
import { Express } from 'express';
import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Authenticator } from '../services/Authention';
import testDbConnection from "../dataTest/connectionTestServer";
import connection from '../data/connection';

export default async function postUserLoginProduction(
    req: Request,
    res: Response
): Promise<void>{
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(422).json({Message: "Preencha os campos a seguir!!"});
            return;
        }
        const [User] = await connection("users").where({email});

        if (!User) {
            res.status(400).json({Message: "Usuario não existente"});
            return;
        }
        const cripSenha = await bcrypt.compare(senha, User.senha)
        if (!cripSenha) {
            res.status(401).json({Message: "Senha invalida"});
            return;
        }

       const auth = new Authenticator();
       const token = auth.generateToken({id: User.id});
       console.log(token)

        res.status(200).json({Message:"Login realizado com sucessor", token})
    }
    catch(error:any){
   res.json({ message: error.message })
    }
}
