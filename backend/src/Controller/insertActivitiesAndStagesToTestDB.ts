import { Request, Response } from "express";
import { Activity , ActivitieStage } from "../models/Types";
import testDbConnection from "../dataTest/connectionTestServer";
import connection from "../data/connection";

export default async function InsertActivitiesaAndStagesProduction(
    req: Request,
    res: Response
): Promise<void> {
    try {

        // Este bloco de código é responsável por validar a estrutura do corpo da requisição.
        // Ele verifica se a requisição contém um objeto 'activitie' e um array 'activitieStages' não vazio.
        // Além disso, itera sobre cada estágio dentro de 'activitieStages' para garantir que todos os campos obrigatórios
        // (title, objective, doTime, steps) estão presentes.
        // Se alguma validação falhar, uma resposta de erro com o status 422 é enviada e a execução é interrompida.
        const activitiesToInsert: Activity = req.body.activitie;
        const activitieStagesToInsert: ActivitieStage[] = req.body.activitieStages;

        if (!activitiesToInsert) {
            res.status(422).json({ message: "O corpo da requisição deve conter um objeto 'activitie' não vazio." });
            return;
        }

        if (!Array.isArray(activitieStagesToInsert) || activitieStagesToInsert.length === 0) {
            res.status(422).json({ message: "O corpo da requisição deve conter um array 'activitieStages' não vazio." });
            return;
        }

        for (const stage of activitieStagesToInsert) {
            if (!stage.title || !stage.objective || !stage.do_time || !stage.steps) {
                res.status(422).json({ message: "Todos os objetos em 'activitieStages' devem conter os campos corretos." });
                return;
            }
        }


        // Este bloco de código lida com a inserção da atividade principal no banco de dados.
        // Primeiro, ele obtém a contagem atual de atividades na tabela 'activities' para gerar um novo ID único para a atividade (ex: 'act_1', 'act_2', etc.).
        // Em seguida, ele formata o objeto da atividade com o ID gerado e as informações fornecidas na requisição.
        // Finalmente, a atividade formatada é inserida na tabela 'activities' do banco de dados.
        const activitiesCountResult = await connection('activities').count('id as count').first();
        const activitiesCount = activitiesCountResult ? parseInt(activitiesCountResult.count as string, 10) : 0;
        const newActivityId = `act_${activitiesCount + 1}`;

        const formattedActivities = {
            id: newActivityId,
            title: activitiesToInsert.title,
            description: activitiesToInsert.description,
            tags: activitiesToInsert.tags,
            icon: activitiesToInsert.icon
        };

        await connection("activities").insert(formattedActivities);


        // Este bloco de código é responsável pela inserção dos estágios da atividade no banco de dados.
        // Ele itera sobre o array 'activitieStagesToInsert' (os estágios validados da requisição).
        // Para cada estágio, ele obtém a contagem atual de estágios na tabela 'activities_stages' para gerar um novo ID único (ex: 'stage_1', 'stage_2', etc.).
        // Em seguida, formata o objeto do estágio, vinculando-o ao ID da atividade recém-inserida (`newActivityId`) e aos dados fornecidos.
        // Todos os estágios formatados são então inseridos em lote na tabela 'activities_stages' do banco de dados.
        const formattedStages = [];
        for (const stage of activitieStagesToInsert) {
            // Obter o tamanho atual da tabela 'activities_stages'
            const stagesCountResult = await connection("activitie_stage").count('id as count').first();
            const stagesCount = stagesCountResult ? parseInt(stagesCountResult.count as string, 10) : 0;
            const newStageId: string = `stage_${stagesCount + formattedStages.length + 1}`;

            formattedStages.push({
                id: newStageId,
                fk_id_activitie: newActivityId, // Usar o ID da atividade recém-inserida
                steps: stage.steps,
                title: stage.title,
                objective: stage.objective,
                do_time: stage.do_time
            });
        }

        await connection("activitie_stage").insert(formattedStages);

        res.status(201).json({
            message: `Atividade e ${formattedStages.length} estágio(s) inseridos com sucesso.`,
            insertedActivity: formattedActivities,
            insertedActivitiesStages: formattedStages
        });

    } catch (error: any) {
        console.error("Erro ao inserir atividades e estágios:", error);
        res.status(500).json({ message: "Erro interno ao inserir atividades e estágios", error: error.message });
    }
}




/*
  Exemplo de corpo de requisição (req.body) para testar a função InsertActivitiesaAndStagesNoTestDB:

  Este JSON deve conter dois campos principais:
  - "activitie": Um objeto que representa a atividade principal a ser inserida.
  - "activitieStages": Um array de objetos que representam os estágios associados a essa atividade.

  Cada objeto em 'activitieStages' precisa ter 'title', 'objective', 'doTime' e 'steps'.

{
  "activitie": {
    "title": "Aprender a Cozinhar Risoto",
    "description": "Um guia completo para dominar a arte de fazer risotos cremosos e deliciosos.",
    "tags": ["culinária", "italiana", "receita"],
    "icon": "[https://example.com/risoto_icon.png](https://example.com/risoto_icon.png)"
  },
  "activitieStages": [
    {
      "title": "Preparação dos Ingredientes",
      "objective": "Reunir e pré-preparar todos os ingredientes necessários para o risoto.",
      "doTime": 30,
      "steps": [
        "Picar a cebola e o alho.",
        "Medir o arroz arbóreo.",
        "Preparar o caldo de legumes quente."
      ]
    },
    {
      "title": "Cozinhando o Risoto Base",
      "objective": "Dominar a técnica de tostar o arroz e adicionar o caldo gradualmente.",
      "doTime": 20,
      "steps": [
        "Refogar cebola e alho.",
        "Adicionar arroz e tostar.",
        "Deglacear com vinho branco.",
        "Adicionar caldo aos poucos, mexendo constantemente."
      ]
    },
    {
      "title": "Finalização e Servir",
      "objective": "Incorporar os últimos ingredientes para a cremosidade e servir o risoto.",
      "doTime": 20  ,
      "steps": [
        "Mexer o risoto com manteiga e queijo parmesão.",
        "Descansar por 2 minutos.",
        "Servir imediatamente."
      ]
    }
  ]
}
  */