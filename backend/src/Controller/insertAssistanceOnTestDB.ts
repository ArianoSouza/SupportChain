import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { Assistance } from "../models/Types";
import connection from "../data/connection";

/**
 * Rota POST para adicionar uma ou múltiplas assistências ao banco de dados,
 * gerando IDs baseados no tamanho da tabela.
 * Espera um array de objetos Assistance no corpo da requisição.
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function InsertAssistancesProduction(
    req: Request,
    res: Response
): Promise<void> {
    try {

        // Este bloco de código é responsável por validar a entrada da requisição.
        // Ele verifica se o corpo da requisição é um array não vazio de assistências.
        // Em seguida, itera sobre cada assistência no array para garantir que todos os campos obrigatórios
        // (image, name, estado, cidade, bairro, phoneNumber, specialities, description) estão presentes.
        // Se alguma validação falhar, uma resposta de erro apropriada é enviada e a execução é interrompida.
        const assistancesToInsert: Assistance[] = req.body;

        if (!Array.isArray(assistancesToInsert) || assistancesToInsert.length === 0) {
            res.status(400).json({ message: "O corpo da requisição deve ser um array de assistências não vazio." });
            return;
        }

        for (const assistance of assistancesToInsert) {
            if (!assistance.image || !assistance.name || !assistance.estado || !assistance.cidade || !assistance.bairro|| !assistance.phoneNumber || !assistance.specialities || !assistance.description) {
                res.status(422).json({ message: "Cada assistência deve conter todos os campos obrigatórios." });
                return;
            }
        }

    // Este bloco de código é responsável pela lógica de inserção das assistências no banco de dados.
    // Ele itera sobre cada assistência validada do array 'assistancesToInsert'.
    // Para cada assistência, ele consulta o banco de dados para obter a contagem atual de registros na tabela 'assistance',
    // gera um novo ID único para a assistência (ex: 'assistance_1', 'assistance_2', etc.),
    // formata o objeto da assistência com o novo ID e, finalmente, o insere na tabela 'assistance'.
    // As assistências inseridas são armazenadas em 'insertedAssistances' para serem retornadas na resposta.
        const insertedAssistances = [];
        for (const assistance of assistancesToInsert) {
            // Obter o tamanho atual da tabela 'assistance'
            const countResult = await connection('assistance').count('id as count').first();
            const count = countResult ? parseInt(countResult.count as string, 10) : 0;
            const newAssistanceId: string = `assistance_${count + insertedAssistances.length + 1}`;

            const formattedAssistance = {
                id: newAssistanceId,
                image: assistance.image,
                name: assistance.name,
                estado: assistance.estado,
                cidade:assistance.cidade,
                bairro:assistance.bairro,
                phoneNumber: assistance.phoneNumber,
                specialities: assistance.specialities,
                description: assistance.description
            };

            await connection("assistance").insert(formattedAssistance);
            insertedAssistances.push(formattedAssistance);
        }

        res.status(201).json({ message: `${insertedAssistances.length} assistência(s) adicionada(s) com sucesso.`, inserted: insertedAssistances });

    } catch (error: any) {
        console.error("Erro ao adicionar assistência(s):", error);
        res.status(500).json({ message: "Erro ao adicionar assistência(s)", error: error.message });
    }
}

/*
  Exemplo de corpo de requisição (req.body) para testar a função InsertAssistancesOnTestDB:
  Este array JSON representa uma ou mais assistências a serem inseridas no banco de dados.
  Cada objeto 'assistance' deve conter todos os campos obrigatórios.
*/
/*
[
  {
    "image": "https://example.com/image1.jpg",
    "name": "Clínica Veterinária Amigo Fiel",
    "estado": "São Paulo",
    "cidade": "São Paulo",
    "bairro": "Pinheiros",
    "phoneNumber": "11987654321",
    "specialities": ["Clínica Geral", "Cirurgia", "Vacinação"],
    "description": "Atendimento veterinário completo para cães e gatos."
  },
  {
    "image": "https://example.com/image2.png",
    "name": "Pet Shop Cão Feliz",
    "estado": "Rio de Janeiro",
    "cidade": "Niterói",
    "bairro": "Icaraí",
    "phoneNumber": "21912345678",
    "specialities": ["Banho e Tosa", "Venda de Rações", "Acessórios"],
    "description": "Tudo para o seu pet, com carinho e qualidade."
  }
]
*/