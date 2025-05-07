import connection from "./connection";

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  const createTable = async () =>{
    try{
        await connection.raw(`
        
         CREATE TABLE IF NOT EXISTS trilha(
            id_trilha INT AUTO_INCREMENT PRIMARY KEY,
            Nome VARCHAR(255),
            descricao TEXT,
            objetivo TEXT
            );

            CREATE TABLE Etapas (
             id_etapa INT AUTO_INCREMENT PRIMARY KEY,
             id_trilha INT,
             ordem INT,
             titulo VARCHAR(255),
             descricao TEXT,
             FOREIGN KEY (id_trilha) REFERENCES Trilha(id_trilha)
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