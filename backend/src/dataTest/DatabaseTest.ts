import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";

/**
 * Função auxiliar para imprimir erros.
 * @param {any} error - O objeto de erro.
 */
const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};

// CRIA TODAS AS TEBALS NO BANCO DE TESTE
export default async function createTestDBTable(
    req: Request,
    res: Response
): Promise<void> {
  try {
    await testDbConnection.raw(`
        -- Tabela users
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        nome VARCHAR(255),
        sobrenome VARCHAR(255),
        email VARCHAR(255),
        senha VARCHAR(255),
        sexo VARCHAR(50),
        estado_civil VARCHAR(50),
        data_nascimento VARCHAR(50),
        numero_telefone VARCHAR(50),
        estado VARCHAR(100),
        cidade VARCHAR(100),
        bairro VARCHAR(100),
        foto VARCHAR(255),
        termos_de_uso BOOLEAN,
        envio_de_dados BOOLEAN
    );

    -- Tabela trilhas
    CREATE TABLE IF NOT EXISTS trilhas (
        id VARCHAR(60) PRIMARY KEY,
        title VARCHAR(255),
        icon VARCHAR(255)
    );

    -- Tabela topics
    CREATE TABLE IF NOT EXISTS topics (
        id VARCHAR(60) PRIMARY KEY, -- CORRIGIDO AQUI: Removido o PRIMARY duplicado
        fk_id_trilha VARCHAR(60) REFERENCES trilhas(id),
        order_position INTEGER,
        description TEXT,
        title VARCHAR(255)
    );

    -- Tabela contents
    CREATE TABLE IF NOT EXISTS contents (
        id VARCHAR(60) PRIMARY KEY,
        fk_id_topic VARCHAR(60) REFERENCES topics(id),
        titles TEXT[],
        paragraphs TEXT[],
        media JSONB[]
    );

    -- Tabela activities
    CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(60) PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        icon VARCHAR(255),
        tags TEXT[]
    );

    -- Tabela activitieStage
    CREATE TABLE IF NOT EXISTS activitie_stage (
        id VARCHAR(60) PRIMARY KEY,
        fk_id_activitie VARCHAR(60) REFERENCES activities(id),
        title VARCHAR(255),
        do_Time INTEGER,
        objective TEXT,
        steps TEXT[]
    );

    -- Tabela questionaries
    CREATE TABLE IF NOT EXISTS questionaries (
        id VARCHAR(60) PRIMARY KEY,
        fk_id_activitie VARCHAR(60) REFERENCES activities(id),
        questions TEXT[],
        options TEXT[]
    );

    -- Tabela userAnswers
    CREATE TABLE IF NOT EXISTS userAnswers (
        id VARCHAR(60) PRIMARY KEY,
        fk_user_id UUID REFERENCES users(id),
        fk_questionarie_id VARCHAR(60) REFERENCES questionaries(id),
        answers INTEGER[]
    );

    -- Tabela videos
    CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR(60) PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        tags TEXT[],
        likes TEXT[],
        "tumbURL" VARCHAR(255),
        "URL" VARCHAR(255)
    );

    -- Tabela assistance
    CREATE TABLE IF NOT EXISTS assistance (
        id VARCHAR(60) PRIMARY KEY,
        image VARCHAR(60),
        name VARCHAR(255),
        description TEXT,
        specialities TEXT,
        "phoneNumber" VARCHAR(50),
        estado VARCHAR(100),
        cidade VARCHAR(100),
        bairro VARCHAR(100)
    );

    -- Tabela clickTags
    CREATE TABLE IF NOT EXISTS clickTags (
        id VARCHAR(60) PRIMARY KEY,
        fk_user_id UUID REFERENCES users(id),
        trilhas TEXT[],
        videos TEXT[]
    );
    `);
    console.log('Tabelas criadas com sucesso!');
    res.status(200).send({mensage:'Tabelas criadas com sucesso!'})
  } catch (error) {
    printError(error);
    res.status(500).send({error:error})

  } finally {
    // Garante que a conexão seja fechada, independentemente de sucesso ou falha.
    closeConnection();
  }
};

/**
 * Função para fechar a conexão com o banco de dados.
 */
const closeConnection = () => {
  testDbConnection.destroy();
};

