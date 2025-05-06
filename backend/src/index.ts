import express from 'express';
import cors from "cors";
import { GetNews } from './APIs/getNews';
import { GetBooks } from './APIs/BooksAPi';
import { GetArtigos } from './APIs/ArtigosApi';
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get("/noticias", GetNews);
app.get("/Books", GetBooks);
app.get("/Artigos",GetArtigos);

app.listen(3000, () => {
  console.log("Server is running  in http://localhost:3000")
})

export default app;