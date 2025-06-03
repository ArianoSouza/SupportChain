import jwt from "jsonwebtoken";
import { AuthenticationData } from "../models/Types";


const secretKey = "lalay2002";


export class Authenticator{
    generateToken(info: AuthenticationData): string {
        try {
          const token = jwt.sign(
            { id: info.id },
            secretKey,
            { expiresIn: "24h" }
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
        const payload = jwt.verify(token, secretKey, { algorithms: ["HS256"] }) as AuthenticationData;
        return payload;
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return null; 
    }
}

}



