
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
import GetActivitiesFromActivitiesTag from './ContollerTest/GetActivitiesByTagFromTestDB';
import GetAllTrilhasFromTestDB from './ContollerTest/GetAllTrilhasFromTestDB';
import GetAllAssistancesFromUserAdressFromTestDB from './ContollerTest/GetAssistancesByUserLocationFromTestDB';
import GetContentFromTopicsIdFromTestDB from './ContollerTest/GetContentByTopicIdFromTestDB';
import GetQuestionsFromActivitieIdFromTestDB from './ContollerTest/GetQuestionaryByActivitieIdFromTestDB';
import GetStagesFromActivitieIdFromTestDB from './ContollerTest/GetStagesByActivitieIdFromTestDB';
import GetTopicsFromTrilhaIdFromTestDB from './ContollerTest/GetTopicsByTrilhaIdFromTestDB';
import GetUserInfoFromIdFromTestDB from './ContollerTest/GetUserInfoByIDFromTestDB';
import PostNewUserAnswersOnTestDB from './ContollerTest/PostNewUserAnswersOnTestDB';
import AlterClickTagsVideoFromUserIdOnTestDB from './ContollerTest/PutClickTagsVideoFromUserId';
import AlterUserInfoFromIdOnTestDB from './ContollerTest/PutUserInfoOnTestDB';
import AddLikeOnVideoOnTestBD from './ContollerTest/PostAddLikeToVideo';
import PostNewContentOnTestDB from './ContollerTest/PostNewContentOnTestDB';
import PostNewQuestionaryOnTestDB from './ContollerTest/PostNewQuestionaryOnTestDB';




import { testDBProductionn } from './Controller/testDBTest';
import createTable from './data/Database';
import GetActivitiesFromActivitiesTagProduction from './Controller/GetActivitiesByTagProduction';
import GetVideoByIdProduction from './Controller/GetVideoByIdFromTestDB';
import GetAllVideosInfoOrderBySugestionProduction from './Controller/GetAllVideosInfoOrderedBySugestion';
import GetAllTrilhasProduction from './Controller/GetAllTrilhasFromTestDB';
import GetAllAssistancesFromUserAdressProduction from './Controller/GetAssistancesByUserLocation';
import GetContentFromTopicsIdProduction from './Controller/GetContentByTopicIdFromTestDB';
import GetQuestionsFromActivitieIdProduction from './Controller/GetQuestionaryByActivitieIdFromTestDB';
import GetStagesFromActivitieIdProduction from './Controller/GetStagesByActivitieIdFromTestDB';
import GetTopicsFromTrilhaIdProduction from './Controller/GetTopicsByTrilhaIdFromTestDB';
import GetUserInfoFromIdProduction from './Controller/GetUserInfoByIDFromTestDB';
import InsertTrilhaProduction from './Controller/InsertTrilhaOnTestDB';
import InsertTopicosProduction from './Controller/insertTopicosToTestDB';
import InsertActivitiesaAndStagesProduction from './Controller/insertActivitiesAndStagesToTestDB';
import InsertAssistancesProduction from './Controller/insertAssistanceOnTestDB';
import PostNewVideoOnProduction from './Controller/UploadAndPostNewVideoToTestDB';
import insertNewUserRegisterProduction from './Controller/insertNewUserRegister';
import postUserLoginProduction from './Controller/postUserLoginOnTestDB';
import PostNewUserAnswersProduction from './Controller/PostNewUserAnswersOnTestDB';
import AddLikeOnVideoProduction from './Controller/PostAddLikeToVideo';
import PostNewContentProduction from './Controller/PostNewContentOnTestDB';
import PostNewQuestionaryProduction from './Controller/PostNewQuestionaryOnTestDB';
import AlterClickTagsVideoFromUserIdProduction from './Controller/PutClickTagsVideoFromUserId';
import AlterUserInfoFromIdProduction from './Controller/PutUserInfoOnTestDB';




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


//config DBTest
router.post("/addAllTabesToTestDB",createTestDBTable)

//gets
router.get("/GetActivitiesFromActivitiesTagFromTestDB/:tag", GetActivitiesFromActivitiesTag) //testado
router.get("/getVideoFromTestDB/:id",GetVideoByIdFromTestDB)//testado
router.get("/getAllVideoInfoFromTestDB", GetAllVideosInfoOrderBySugestion);//testado
router.get("/GetAllTrilhasFromTestDB",GetAllTrilhasFromTestDB) //testado
router.get("/GetAllAssistancesFromUserAdressFromTestDB", GetAllAssistancesFromUserAdressFromTestDB) //testado
router.get("/GetContentFromTopicsIdFromTestDB/:id",GetContentFromTopicsIdFromTestDB) //testado
router.get("/GetQuestionsFromActivitieIdFromTestDB/:id",GetQuestionsFromActivitieIdFromTestDB) //testado
router.get("/GetStagesFromActivitieIdFromTestDB/:id",GetStagesFromActivitieIdFromTestDB) //testado
router.get("/GetTopicsFromTrilhaIdFromTestDB/:id",GetTopicsFromTrilhaIdFromTestDB)  //testado
router.get("/GetUserInfoFromIdFromTestDB", GetUserInfoFromIdFromTestDB) //testado



//insers
router.post("/trilhasOnTestDB",InsertTrilhaNoTestDB);  //testado
router.post("/topicosOnTestDB", InsertTopicosNoTestDB); //testado
router.post("/atividadesOnTestDB", InsertActivitiesaAndStagesNoTestDB); //testado
router.post("/assistancesOnTestDB", InsertAssistancesOnTestDB); //testado

router.post("/videosOnTestDB",upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), PostNewVideoOnTestDB); //testado
router.post("/registerUserOnTestDB", insertNewUserRegisterToTestDB); //testado
router.post("/loginUserOnTestDB",postUserLoginOnTestDB); //testado
router.post("/PostNewUserAnswersOnTestDB", PostNewUserAnswersOnTestDB)
router.post("/AddLikeOnVideoOnTestBD/:id",AddLikeOnVideoOnTestBD) //testado
router.post("/PostNewContentOnTestDB", PostNewContentOnTestDB)//testado
router.post("/PostNewQuestionaryOnTestDB",PostNewQuestionaryOnTestDB) //testado


//Puts ou Alters
router.put("/AlterClickTagsVideoFromUserIdOnTestDB",AlterClickTagsVideoFromUserIdOnTestDB) //testado
router.put("/AlterUserInfoFromIdOnTestDB",AlterUserInfoFromIdOnTestDB) //testado


////------------------------------------------------------------------------------------------------
//ROTAS produção
//use o /alltablestotestdb pra configurar o banco LOCAL

//testeconection
router.get("/testDB", testDBProductionn)


//config DBTest
router.post("/addAllTabes",createTable)

//gets
router.get("/GetActivitiesFromActivitiesTag/:tag", GetActivitiesFromActivitiesTagProduction) //testado
router.get("/getVideo/:id",GetVideoByIdProduction)//testado
router.get("/getAllVideoInfo", GetAllVideosInfoOrderBySugestionProduction);//testado
router.get("/GetAllTrilhas",GetAllTrilhasProduction) //testado
router.get("/GetAllAssistancesFromUserAdress", GetAllAssistancesFromUserAdressProduction) //testado
router.get("/GetContentFromTopicsId/:id",GetContentFromTopicsIdProduction) //testado
router.get("/GetQuestionsFromActivitieId/:id",GetQuestionsFromActivitieIdProduction) //testado
router.get("/GetStagesFromActivitieId/:id",GetStagesFromActivitieIdProduction) //testado
router.get("/GetTopicsFromTrilhaId/:id",GetTopicsFromTrilhaIdProduction)  //testado
router.get("/GetUserInfoFromId", GetUserInfoFromIdProduction) //testado



//insers
router.post("/trilhas",InsertTrilhaProduction);  //testado
router.post("/topicos", InsertTopicosProduction); //testado
router.post("/atividades", InsertActivitiesaAndStagesProduction); //testado
router.post("/assistances", InsertAssistancesProduction); //testado

router.post("/videos",upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), PostNewVideoOnProduction); //testado

router.post("/registerUser", insertNewUserRegisterProduction); //testado
router.post("/loginUser",postUserLoginProduction); //testado
router.post("/PostNewUserAnswers", PostNewUserAnswersProduction)
router.post("/AddLikeOnVideo/:id",AddLikeOnVideoProduction) //testado
router.post("/PostNewContent", PostNewContentProduction)//testado
router.post("/PostNewQuestionary",PostNewQuestionaryProduction) //testado


//Puts ou Alters
router.put("/AlterClickTagsVideoFromUser",AlterClickTagsVideoFromUserIdProduction) //testado
router.put("/AlterUserInfoFromId",AlterUserInfoFromIdProduction) //testado


app.listen(process.env.DB_PORT, () => {
  console.log(`Server is running  in PORT ${process.env.DB_PORT}`)
})

export default app;