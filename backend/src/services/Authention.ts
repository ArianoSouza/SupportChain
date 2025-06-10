import * as jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

// Certifique-se de importar o 'jsonwebtoken'
// Assumindo que AuthenticationData está definida em algum lugar, por exemplo:
// type AuthenticationData = { id: string };

dotenv.config();

// Define a interface AuthenticationData se ainda não a tiver
interface AuthenticationData {
  id: string;
}

export class Authenticator {


  // O segredo deve ser acessado de process.env
  // É crucial que dotenv.config() seja chamado no ponto de entrada da sua aplicação
  private readonly secretKey: string;

  constructor() {
    // Carrega o secretKey da variável de ambiente
    // Lança um erro se a variável de ambiente não estiver definida,
    // garantindo que a aplicação não inicie com um segredo ausente.
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }
    this.secretKey = process.env.JWT_SECRET;
  }

  generateToken(info: AuthenticationData): string {
    try {
      const token = jwt.sign(
        { id: info.id },
        this.secretKey, // Use this.secretKey (a propriedade da classe)
        { expiresIn: "24h" } // O token expira em 24 horas
      );
      console.log("Token gerado no Authenticator:", token);
      return token;
    } catch (err) {
      console.error("Erro ao gerar token:", err);
      throw err;
    }
  }

  getTokenData(token: string): AuthenticationData | null {
    try {
      // O tipo 'AuthenticationData' é um pouco limitado para o retorno do jwt.verify,
      // que geralmente retorna um objeto genérico ou o payload definido.
      // É mais seguro especificar o tipo esperado ou fazer uma verificação.
      const payload = jwt.verify(token, this.secretKey) as AuthenticationData;
      return payload;
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      // Aqui você pode ser mais específico sobre o tipo de erro
      // Por exemplo, verificar se é um TokenExpiredError ou JsonWebTokenError
      return null;
    }
  }
}