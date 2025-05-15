import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../Types";


const secretKey = "lalay2002";


export class Authenticator{
    generateToken(info: AuthenticationData): string{
        const token = jwt.sign(
            {id: info.id},
            secretKey,
            {expiresIn: "24h" }
        )
        return token;
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



