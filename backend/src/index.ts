import express from 'express';
import cors from "cors";
import { GetNews } from './APIs/getNews';
import { GetBooks } from './APIs/BooksAPi';
import { GetArtigos } from './APIs/ArtigosApi';
//import InsertTrilha from './Controlles/InsertTrilha';
import InsertEtapa from './ControllesOLD/InsetEtapa';
import GetTrilha from './ControllesOLD/GetTrilha';
import GetEtapa from './ControllesOLD/GetEtapa';
import { Router } from 'express';
//import GetCadastro from './Controlles/usuarioRoutes';
//import GetLogin from './Controlles/usuarioLogin';
import autenticarToken from './services/autenticarToken';
import { PostProgresso } from './ControllesOLD/PostProgresso';
import { GetProcesso } from './ControllesOLD/GetProcesso';
import { UploadFile } from './ControllesOLD/UploadsFile';
import { GetUpload } from './ControllesOLD/GetUpload';
import { addVideoInfo } from './ControllesOLD/addVideoInfo';
import { PostTopicos } from './ControllesOLD/PostTopicos';
import { GetTopicos } from './ControllesOLD/GetTopicos';
import multer from 'multer';
import { testConnection } from './ControllesOLD/testBanco';
import GetAllTrilhas from './ControllesOLD/getAllTrilhas';
import createTestDBTable from './dataTest/DatabaseTest';




// BANCO DE TESTE
import { testDBTestConnection } from './ContollerTest/testDBTest';
import InsertTrilhaNoTestDB from './ContollerTest/InsertTrilhaOnTestDB';
import InsertTopicosNoTestDB from './ContollerTest/insertTopicosToTestDB';
import InsertActivitiesaAndStagesNoTestDB from './ContollerTest/insertActivitiesAndStagesToTestDB';
import InsertAssistancesOnTestDB from './ContollerTest/insertAssistanceOnTestDB';
import PostNewVideoOnTestDB from './ContollerTest/UploadAndPostNewVideoToTestDB';
import GetVideoByIdFromTestDB from './ContollerTest/GetVideoByIdFromTestDB';
import insertNewUserRegisterToTestDB from './ContollerTest/insertNewUserRegister';
import postUserLoginOnTestDB from './ContollerTest/postUserLoginOnTestDB';
import GetAllVideosInfoOrderBySugestion from './ContollerTest/GetAllVideosInfoOrderedBySugestion';


// CONFIGURAÇÃO
const router = express.Router();
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.urlencoded({ extended: true }));


////ROTAS 

///GETS
// essas rotas precisam ser ajustadas e padronizadas, usar a de teste por enquanto

/*
app.get("/noticias",autenticarToken,GetNews);
app.get("/Books", GetBooks);
app.get("/Artigos",GetArtigos);
router.get("/trilha",autenticarToken,GetTrilha);
router.get("/etapa",autenticarToken,GetEtapa);
router.get("/Progresso/:id_user",autenticarToken,GetProcesso);
router.get("/topics/:id_topicos", GetTopicos);
router.get("/testBanco", testConnection);
router.get("/allTrilhas",autenticarToken,GetAllTrilhas);
router.get("/Videos/:userId", GetUpload);
*/

///POSTS
//Essas rotas precisam ser ajustadas e padronizadas, usar a de teste por enquanto

/*
router.post("/user/cadastro", GetCadastro);
//router.post("/user/login", GetLogin);
router.post("/progresso",PostProgresso);
//router.post("/Trilhas",InsertTrilha); 
router.post("/Etapas",InsertEtapa);
router.post("/uploads",upload.single("file"),UploadFile);
router.post("/videos/info", addVideoInfo);
router.post("/topicos", PostTopicos);
*/




//ROTAS DE TESTE
//use o /alltablestotestdb pra configurar o banco LOCAL

//testeconection
router.get("/testDBTest", testDBTestConnection)
router.get("/getVideoFromTestDB/:id",GetVideoByIdFromTestDB)
router.get("/getAllVideoInfoFromTestDB", GetAllVideosInfoOrderBySugestion);

//config DBTest
router.post("/addAllTabesToTestDB",createTestDBTable)

//gets


//insers
router.post("/trilhasOnTestDB",InsertTrilhaNoTestDB); 
router.post("/topicosOnTestDB", InsertTopicosNoTestDB);
router.post("/atividadesOnTestDB", InsertActivitiesaAndStagesNoTestDB);
router.post("/assistancesOnTestDB", InsertAssistancesOnTestDB);

router.post("/videosOnTestDB",upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), PostNewVideoOnTestDB);
router.post("/registerUserOnTestDB", insertNewUserRegisterToTestDB);
router.post("/loginUserOnTestDB",postUserLoginOnTestDB);



app.listen(3000, () => {
  console.log("Server is running  in http://localhost:3000")
})

export default app;