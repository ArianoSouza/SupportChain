/*

import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import connection from "../data/connection";
import { User } from '../Types';
import { GeradorId } from '../Serviços/geradorId';
import { Authenticator } from "../Serviços/Authention";

interface cadastro {
    id: GeradorId;
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

export default async function GetCadastro(
    req: Request,
    res: Response
): Promise<void>
{
    try{
        const {nome, sobrenome, email, senha, sexo, estado_civil, data_nascimento, numero_telefone, estado, cidade, bairro, foto,termos_de_uso,envio_de_dados}: cadastro = req.body;
        if(!nome || !sobrenome || !email|| !senha || !sexo || !estado_civil || !data_nascimento || !numero_telefone || !estado || !cidade || !bairro || !foto || !termos_de_uso || !envio_de_dados){ 
        res.status(422).json({Message: "Preencha os campos corretamente!!",})
        return;
        }
        const [usuario] = await connection("usuario")
        .where ({email})

        if (usuario) {
         res.status(409).json({ Message: "Usuário já cadastrado!" });
        }

        const cripSenha = await bcrypt.hash(senha, 10)


        const id: string = new GeradorId().GeradorId();
        
        const novoUsuario: User = { id, nome, sobrenome, email, senha:cripSenha, sexo, estado_civil, data_nascimento, numero_telefone, estado, bairro, foto, cidade,termos_de_uso,envio_de_dados}
        await connection("usuario").insert({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            sobrenome: novoUsuario.sobrenome,
            email: novoUsuario.email,
            senha: novoUsuario.senha,
            sexo: novoUsuario.sexo,
            estado_civil: novoUsuario.estado_civil,
            data_nascimento: novoUsuario.data_nascimento,
            numero_telefone: novoUsuario.numero_telefone,
            estado: novoUsuario.estado,
            cidade: novoUsuario.cidade,
            bairro: novoUsuario.bairro,
            foto: novoUsuario.foto,
            termos_de_uso: novoUsuario.termos_de_uso,
            envio_de_dados: novoUsuario.envio_de_dados,
        });

         const auth = new Authenticator();

        const token = auth.generateToken({ id: novoUsuario.id});

        res.status(201).json({token})
}
    catch(error:any){
        res.json({ message: error.message })
    }
}

*/