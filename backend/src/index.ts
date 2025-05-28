import express from 'express';
import cors from "cors";
import { GetNews } from './APIs/getNews';
import { GetBooks } from './APIs/BooksAPi';
import { GetArtigos } from './APIs/ArtigosApi';
import InsertTrilha from './Controlles/InsertTrilha';
import InsertEtapa from './Controlles/InsetEtapa';
import GetTrilha from './Controlles/GetTrilha';
import GetEtapa from './Controlles/GetEtapa';
import { Router } from 'express';
import GetCadastro from './Controlles/usuarioRoutes';
import GetLogin from './Controlles/usuarioLogin';
import autenticarToken from './Serviços/autenticarToken';
import { PostProgresso } from './Controlles/PostProgresso';
import { GetProcesso } from './Controlles/GetProcesso';
import { UploadFile } from './Controlles/UploadsFile';
import { GetUpload } from './Controlles/GetUpload';
import { addVideoInfo } from './Controlles/addVideoInfo';
import multer from 'multer';

const router = express.Router();

const app = express();

const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.urlencoded({ extended: true }));

app.get("/noticias",GetNews);
app.get("/Books", GetBooks);
app.get("/Artigos",GetArtigos);
router.post("/Trilhas",InsertTrilha); 
router.post("/Etapas",InsertEtapa);
router.get("/trilha",autenticarToken,GetTrilha);
router.get("/etapa",autenticarToken,GetEtapa);
router.post("/user/cadastro", GetCadastro);
router.post("/user/login", GetLogin);
router.post("/progresso",PostProgresso);
router.get("/Progresso/:id_user",autenticarToken,GetProcesso);
router.post("/uploads",upload.single("file"),UploadFile);
router.post("/videos/info", addVideoInfo);
router.get("/Videos/:userId", GetUpload);


app.listen(3000, () => {
  console.log("Server is running  in http://localhost:3000")
})

export default app;