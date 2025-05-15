import { v4 } from "uuid";

export class GeradorId { 
    GeradorId(): string {return v4();}
}