import connection from "./connection";

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  const createTable = async () =>{
    try{
        await connection.raw(`
          CREATE TABLE IF NOT EXISTS usuario (
          id VARCHAR(36) PRIMARY KEY PRIMARY KEY,
          Nome VARCHAR(100) NOT NULL,
          Sobrenome VARCHAR(100) NOT NULL,
          Email VARCHAR(100) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL,
          sexo VARCHAR(20) NOT NULL,
          Estado_Civil VARCHAR(50),
          data_nascimento VARCHAR(10) ,
          numero_telefone VARCHAR(20),
          Estado VARCHAR(50),
          Cidade VARCHAR(50),
          Bairro VARCHAR(50),
          Foto TEXT,
          termos_de_uso BOOLEAN NOT NULL DEFAULT 0,
          envio_de_dados BOOLEAN NOT NULL DEFAULT 0
          );

          CREATE TABLE IF NOT EXISTS etapa (
          id_etapa INT AUTO_INCREMENT PRIMARY KEY,
          id_trilha INT NOT NULL,
          ordem INT NOT NULL,
          titulo VARCHAR(255) NOT NULL,
          descricao TEXT
           );
          
          CREATE TABLE IF NOT EXISTS Progresso(
          id_progresso INT AUTO_INCREMENT PRIMARY KEY,
          id_user VARCHAR(36) NOT NULL,
          id_etapa INT NOT NULL,
          concluida BOOLEAN NOT NULL DEFAULT 0,
          data_conclusao DATE,
          FOREIGN KEY (id_user) REFERENCES usuario(id),
          FOREIGN KEY (id_etapa) REFERENCES etapa(id_etapa)
          );
             `);
            console.log('tabela criada com sucesso')
      }catch(error){
        printError(error);
    }finally{
        closeConnection();
      }
    }

    const closeConnection = () => {
        connection.destroy();
      };


      createTable();

      export default createTable;