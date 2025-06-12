import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import * as bcrypt from "bcryptjs";
import { Authenticator } from "../services/Authention";
import { GeradorId } from '../services/geradorId';
import { User } from "../models/Types"; // Assuming User type is defined in Types.ts
import connection from "../data/connection";

export default async function insertNewUserRegisterProduction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      nome,
      sobrenome,
      email,
      senha,
      sexo,
      estado_civil,
      data_nascimento,
      numero_telefone,
      estado,
      cidade,
      bairro,
      foto,
      termos_de_uso,
      envio_de_dados,
    }: User = req.body;

    // 1. Validação de campos obrigatórios
    if (
      !nome ||
      !sobrenome ||
      !email ||
      !senha ||
      !sexo ||
      !estado_civil ||
      !data_nascimento ||
      !numero_telefone ||
      !estado ||
      !cidade ||
      !bairro ||
      !foto ||
      termos_de_uso === undefined || // Validate boolean fields explicitly
      envio_de_dados === undefined
    ) {
      res.status(422).json({ message: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    // 2. Verifica se o usuário já existe pelo email
    const [existingUser] = await connection("users").where({ email });

    if (existingUser) {
      res.status(409).json({ message: "Usuário já cadastrado com este e-mail." });
      return;
    }

    // 3. Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 4. Gera um ID único para o novo usuário
    const userId: string = new GeradorId().GeradorId();

    // 5. Prepara o objeto do novo usuário
    const newUser: User = {
      id: userId,
      nome,
      sobrenome,
      email,
      senha: hashedPassword, // Armazena a senha criptografada
      sexo,
      estado_civil,
      data_nascimento,
      numero_telefone,
      estado,
      cidade,
      bairro,
      foto,
      termos_de_uso,
      envio_de_dados,
    };

    // 6. Insere o novo usuário na tabela 'usuario'
    await connection("users").insert(newUser);

    // 7. Cria uma entrada inicial na tabela 'ClickTags' para o novo usuário
    // Gera um ID para a entrada ClickTags (pode ser separado ou seguir um padrão)
    const clickTagId: string = new GeradorId().GeradorId(); // Ou use 'clicktag_' + userId
    
    await connection("clicktags").insert({
      id: clickTagId,
      fk_user_id: userId,
      trilhas: [], // Inicializa como um array vazio serializado para JSON
      videos: [],   // Inicializa como um array vazio serializado para JSON
    });

    // 8. Gera um token de autenticação para o novo usuário
    const auth = new Authenticator();
    const token = auth.generateToken({ id: newUser.id });

    // 9. Retorna uma resposta de sucesso com o token
    res.status(201).json({ message: "Usuário registrado com sucesso!", token });
  } catch (error: any) {
    // Melhorando a mensagem de erro para o cliente
    console.error("Erro ao registrar novo usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao registrar usuário.", error: error.message });
  }
}