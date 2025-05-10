import express from 'express';
import cors from "cors";
import { GetNews } from './APIs/getNews';
import { GetBooks } from './APIs/BooksAPi';
import { GetArtigos } from './APIs/ArtigosApi';
import InsertTrilha from './Controlles/InsertTrilha';
import InsertEtapa from './Controlles/InsetEtapa';
import GetTrilha from './Controlles/GetTrilha';
import GetEtapa from './Controlles/GetEtapa';
import dotenv from "dotenv";
import { Router } from 'express';
import GetCadastro from './Controlles/usuarioRoutes';
import GetLogin from './Controlles/usuarioLogin';
import autenticarToken from './Serviços/autenticarToken';

dotenv.config();

const router = express.Router();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.get("/noticias",autenticarToken ,GetNews);
app.get("/Books",autenticarToken, GetBooks);
app.get("/Artigos",autenticarToken,GetArtigos);
router.post("/Trilhas", InsertTrilha);
router.post("/Etapas",autenticarToken ,InsertEtapa);
router.get("/trilha",autenticarToken ,GetTrilha);
router.get("/etapa",autenticarToken,GetEtapa);
router.post("/user/cadastro", GetCadastro);
router.post("/user/login", GetLogin);

app.listen(3000, () => {
  console.log("Server is running  in http://localhost:3000")
})

export default app;