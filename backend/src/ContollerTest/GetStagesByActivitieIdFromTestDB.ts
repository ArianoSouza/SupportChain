import { Request, Response } from "express";
import testDbConnection from "../dataTest/connectionTestServer";
import { ActivitieStage } from "../models/Types"; // Assumindo que o tipo ActivitieStage está definido em Types.ts

/**
 * Função para buscar todos os estágios relacionados a um ID de atividade específico.
 * Os estágios são retornados ordenados pelo 'doTime' (tempo de conclusão).
 * @param {Request} req - O objeto de requisição do Express, contendo o ID da atividade nos parâmetros.
 * @param {Response} res - O objeto de resposta do Express.
 * @returns {Promise<void>}
 */
export default async function GetStagesFromActivitieIdFromTestDB(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const activitieId: string = req.params.id; // Assume que o ID da atividade virá como ':id' na rota

    // 1. Validação inicial: verifica se o ID da atividade foi fornecido
    if (!activitieId) {
      res.status(400).json({ message: "O ID da atividade é obrigatório." });
      return;
    }

    // 2. Busca os estágios no banco de dados relacionados ao fk_id_activitie
    // Supondo que a tabela se chame 'activitie_stages' ou 'stages'
    // Vamos usar 'activitie_stages' para maior clareza.
    // Ordena os estágios pelo 'doTime' (tempo de conclusão) para uma sequência lógica.
    const stages: ActivitieStage[] = await testDbConnection("activitie_stage") // Supondo que a tabela se chame 'activitie_stages'
      .where({ fk_id_activitie: activitieId })
      .orderBy('do_time', 'asc') // Ordena por doTime crescente
      .select(
        "id",
        "fk_id_activitie",
        "title",
        "do_time",
        "objective",
        "steps"
      );

    // 3. Verifica se algum estágio foi encontrado para a atividade
    if (stages.length === 0) {
      res.status(404).json({ message: `Nenhum estágio encontrado para a atividade com ID: ${activitieId}.` });
      return;
    }

    // 4. Tratamento de campos JSON (se aplicável)
    // Se 'steps' é armazenado como uma string JSON no DB, você precisará fazer o parse aqui.
    // Caso contrário, remova esta etapa.
    const parsedStages: ActivitieStage[] = stages.map(stage => ({
      ...stage,
      steps: typeof stage.steps === 'string' ? JSON.parse(stage.steps) : stage.steps,
    }));

    // 5. Retorna os estágios encontrados
    res.status(200).json({
      message: `Estágios para a atividade ${activitieId} recuperados com sucesso!`,
      stages: parsedStages
    });

  } catch (error: any) {
    // 6. Tratamento de erros de servidor
    console.error("Erro ao buscar estágios por ID de atividade:", error);
    res.status(500).json({ message: "Erro interno do servidor ao obter estágios.", error: error.message });
  }
}

/*
Exemplo de Requisição (no Postman/Insomnia):

GET http://localhost:PORTA_DA_SUA_API/get-stages-by-activitie/ID_DA_ATIVIDADE_AQUI

Exemplo:
GET http://localhost:3000/get-stages-by-activitie/activity_coding_challenge

Não são necessários headers de autenticação ou corpo, a menos que você adicione uma lógica para isso.

Exemplo de Resposta de Sucesso:
Status: 200 OK
{
  "message": "Estágios para a atividade activity_coding_challenge recuperados com sucesso!",
  "stages": [
    {
      "id": "stage_1",
      "fk_id_activitie": "activity_coding_challenge",
      "title": "Configuração do Ambiente",
      "doTime": 10,
      "objective": "Preparar o ambiente de desenvolvimento.",
      "steps": ["Instalar Node.js", "Configurar VS Code", "Clonar repositório"]
    },
    {
      "id": "stage_2",
      "fk_id_activitie": "activity_coding_challenge",
      "title": "Análise do Problema",
      "doTime": 15,
      "objective": "Compreender o problema e requisitos.",
      "steps": ["Ler descrição", "Identificar entradas/saídas", "Esboçar solução"]
    }
  ]
}

Exemplo de Resposta sem Estágios:
Status: 404 Not Found
{
  "message": "Nenhum estágio encontrado para a atividade com ID: activity_nao_existe."
}

Exemplo de Resposta de Erro Interno:
Status: 500 Internal Server Error
{
  "message": "Erro interno do servidor ao obter estágios.",
  "error": "..."
}
*/