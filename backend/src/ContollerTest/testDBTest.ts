import testDbConnection from "../dataTest/connectionTestServer";

export async function testDBTestConnection() {
  try {
    // Uma consulta simples para verificar a conexão (pode variar dependendo do seu banco)
    const result = await testDbConnection.raw('SELECT 1;')
    console.log('Conexão bem-sucedida!');
    console.log('Resultado da consulta:', result.rows[0].result);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    // Opcional: Desconectar o Knex após o teste
    // await knex.destroy();
  }
}