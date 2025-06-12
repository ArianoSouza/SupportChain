import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { User, Assistance } from "../models/Types"; // Assumindo que os tipos estão definidos em Types.ts
import jwt from "jsonwebtoken"; // Para decodificação de token

/**
 * Função para buscar as informações de endereço do usuário e todos os serviços de assistência
 * filtrados pelo estado do usuário.
 * @param {Request} req - O objeto de requisição do Express, contendo o token de autenticação
 * no cabeçalho 'Authorization'.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetAllAssistancesFromUserAdressFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Espera o token no cabeçalho Authorization: Bearer <token>

    // 1. Validação do Token
    if (!token) {
      res.status(401).json({ message: "Token de autenticação é obrigatório." });
      return;
    }

    let userId: string;
    try {
      // 2. Decodificação do Token para obter o ID do usuário
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
      userId = decodedToken.id;
    } catch (error: any) {
      // Tratamento específico de erros de JWT
      if (error instanceof jwt.TokenExpiredError) {
        res.status(403).json({ message: "Token expirado.", error: error.message });
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(403).json({ message: "Token inválido.", error: error.message });
      } else {
        res.status(403).json({ message: "Erro de autenticação.", error: error.message });
      }
      return;
    }

    // 3. Busca as informações de endereço do usuário
    // Supondo que a tabela de usuários se chame 'usuario' (como em seu código de registro)
    const user: User | undefined = await testDbConnection("users")
      .where({ id: userId })
      .select("estado", "cidade", "bairro") // Seleciona apenas os campos de endereço necessários
      .first();

    // 4. Verifica se o usuário foi encontrado
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    // 5. Busca e filtra os serviços de assistência pelo estado do usuário
    // Supondo que a tabela de assistências se chame 'assistances'
    const assistances: Assistance[] = await testDbConnection("assistance")
      .where({ estado: user.estado }) // Filtra as assistências pelo estado do usuário
      .select(
        "id",
        "name",
        "image",
        "description",
        "specialities",
        "phoneNumber",
        "estado",
        "cidade",
        "bairro"
      );

    // 6. Verifica se algum serviço de assistência foi encontrado para o estado
    if (assistances.length === 0) {
      res.status(200).json({
        message: `Nenhum serviço de assistência encontrado para o estado de ${user.estado}.`,
        userAddress: {
          estado: user.estado,
          cidade: user.cidade,
          bairro: user.bairro,
        },
        assistances: [] // Retorna um array vazio de assistências
      });
      return;
    }

    // 7. Retorna as informações do usuário e os serviços de assistência filtrados
    res.status(200).json({
      message: `Serviços de assistência no estado de ${user.estado} recuperados com sucesso!`,
      userAddress: {
        estado: user.estado,
        cidade: user.cidade,
        bairro: user.bairro,
      },
      assistances: assistances
    });

  } catch (error: any) {
    // 8. Tratamento de erros gerais do servidor
    console.error("Erro ao obter assistências baseadas no endereço do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter assistências.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-assistances-by-user-address

Headers:
  Authorization: Bearer SEU_TOKEN_JWT_AQUI

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Serviços de assistência no estado de Pernambuco recuperados com sucesso!",
  "userAddress": {
    "estado": "Pernambuco",
    "cidade": "Recife",
    "bairro": "Boa Viagem"
  },
  "assistances": [
    {
      "id": "assist_1",
      "name": "Clínica Saúde Total",
      "image": "saude_total.png",
      "description": "Atendimento médico e psicológico.",
      "specialities": "Psicologia, Clínica Geral",
      "phoneNumber": "81999998888",
      "estado": "Pernambuco",
      "cidade": "Recife",
      "bairro": "Centro"
    },
    {
      "id": "assist_2",
      "name": "Acolhimento Familiar",
      "image": "acolhimento_familiar.png",
      "description": "Apoio a famílias em situação de vulnerabilidade.",
      "specialities": "Assistência Social, Terapia Familiar",
      "phoneNumber": "81988887777",
      "estado": "Pernambuco",
      "cidade": "Olinda",
      "bairro": "Casa Caiada"
    }
  ]
}

Exemplo de Resposta sem Assistências para o Estado:
Status: 200 OK (ou 404, dependendo da preferência, mas 200 com array vazio é comum)
{
  "message": "Nenhum serviço de assistência encontrado para o estado de Roraima.",
  "userAddress": {
    "estado": "Roraima",
    "cidade": "Boa Vista",
    "bairro": "Centro"
  },
  "assistances": []
}

Exemplo de Resposta de Usuário Não Encontrado:
Status: 404 Not Found
{
  "message": "Usuário não encontrado."
}

Exemplo de Resposta de Erro de Autenticação:
Status: 403 Forbidden
{
  "message": "Token expirado.",
  "error": "jwt expired"
}
*/