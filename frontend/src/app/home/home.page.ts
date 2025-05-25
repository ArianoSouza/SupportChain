import { ArticlesService } from './../services/articleServices/articles.service';
import { books, userData } from '../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { articles, news } from '../models/types/user.types';
import { NoticiaService } from '../services/noticia.service';
import { BookService } from '../services/bookservice/book.service';
import { forkJoin } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro/cadastro.service';

 type sugestionHome={
  id: String
  title:String
  icon:String
  url:String
 }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false


})
export class Tab1Page implements OnInit{
   ngOnInit(){
    if (this.avaliation == false){
      this.feedBackMensage = true
    }

    this.isLoading = true;

    // Use forkJoin se quiser esperar todas as chamadas
    forkJoin([
      this.noticiaService.getNoticias(),
      this.bookService.getBooks('saude mental'),
      this.articleService.getArticles()
    ]).subscribe(
      ([noticias, books, articles]) => {
        this.news = noticias;
        this.books = books;
        this.articles = articles;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );

    console.log(window.innerWidth)
  
   }
   constructor(private noticiaService: NoticiaService, private bookService: BookService,private articleService: ArticlesService,private router: Router,public userData:CadastroService ) {}
 
   isLoading = true
  newsTranslante = 0
  booksTranslate = 0
  avaliation = false
  feedBackMensage = true
  nomeUser = this.userData.actualUser?.nome

  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  sugestions:sugestionHome[] = [
    {
      id: "s01",
      title:"Trilhas",
      icon:"analytics",
      url:"/tabs/trilhas"
    },
    {
      id: "s02",
      title:"Vídeos",
      icon:"videocam",
      url:"/tabs/app-videos"
    },
    {
      id: "s03",
      title:"Serviços",
      icon:"medical",
      url:"/tabs/medicalassistance"
    }
]

  books:books[] = []
  articles:articles[] = []
  news:news[] = []  

  setFeedBackMensage = ()=>{
    this.feedBackMensage = !this.feedBackMensage
  }
  

goToLink = (link:String)=>{
  window.open(link as string,'_blank')
}

goToPage(link:String){
  this.router.navigate([link as string])
}


limitChar(text:String ):String{
  if (text.length >= 30){
    return text.slice(0,29)+' ...'
  }
  else{
    return text
  }
}

handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = this.genericImage;
}

 gerarLinkAmazon(titulo: String, autor:String): string {
  const baseUrl = 'https://www.amazon.com.br/s?k=';
  let query = ''

  if(autor==='Desconhecido'){
    query = encodeURIComponent(titulo.trim())
  }else{
    query = encodeURIComponent(titulo.trim())+' '+encodeURIComponent(autor.trim());
  }
  return `${baseUrl}${query}`;
}



}
