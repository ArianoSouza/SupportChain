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

dotenv.config();

const router = express.Router();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.get("/noticias", GetNews);
app.get("/Books", GetBooks);
app.get("/Artigos",GetArtigos);
router.post("/Trilhas", InsertTrilha);
router.post("/Etapas", InsertEtapa);
router.get("/trilha", GetTrilha);
router.get("/etapa",GetEtapa);
router.post("/user/cadastro", GetCadastro);
router.post("/user/login", GetLogin);

app.listen(3000, () => {
  console.log("Server is running  in http://localhost:3000")
})

export default app;