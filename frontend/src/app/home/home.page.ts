import { ArticlesService } from './../services/articleServices/articles.service';
import { books } from '../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { articles, news } from '../models/types/user.types';
import { NoticiaService } from '../services/noticia.service';
import { BookService } from '../services/bookservice/book.service';
import { forkJoin } from 'rxjs';



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
      this.bookService.getBooks('tecnologia'),
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
  
   }
   constructor(private noticiaService: NoticiaService, private bookService: BookService,private articleService: ArticlesService) {}
 
   isLoading = true
  newsTranslante = 0
  booksTranslate = 0
  avaliation = false
  feedBackMensage = true
  indexTranslateNews = 26.1
  indexTranslateBooks = 25
  currentIndexnews = Math.abs(this.newsTranslante / this.indexTranslateNews);
  currentIndexBooks = Math.abs(this.newsTranslante / this.indexTranslateBooks);

  books:books[] = []
  articles:articles[] = []
  news:news[] = []  

  setFeedBackMensage = ()=>{
    this.feedBackMensage = !this.feedBackMensage
  }
  translateNewsMinus =()=>{
    if (!(this.newsTranslante >=0  )){
      this.newsTranslante +=this.indexTranslateNews
      this.currentIndexnews = Math.abs(this.newsTranslante /this.indexTranslateNews);
      this.updateDotsNews();
  }
}
  translateNewsPlus =()=>{
    if (!(this.newsTranslante <= (this.indexTranslateNews*-4))){
      this.newsTranslante -=this.indexTranslateNews
      this.currentIndexnews = Math.abs(this.newsTranslante / this.indexTranslateNews);
      this.updateDotsNews();

  }
}
translateBooksMinus =()=>{
  if (!(this.booksTranslate >=0 )){
    this.booksTranslate +=this.currentIndexBooks
    this.currentIndexBooks = Math.abs(this.booksTranslate/ this.indexTranslateBooks);
    this.updateDotsBooks();
}
}
translateBooksPlus =()=>{
  if (!(this.booksTranslate <= (this.indexTranslateBooks*-4))){
    this.booksTranslate -=this.indexTranslateBooks
    this.currentIndexBooks = Math.abs(this.booksTranslate/ this.indexTranslateBooks);
    this.updateDotsBooks();
}
}


updateDotsNews = () => {
  const dots = document.querySelectorAll('.newdot');
  dots.forEach((dot, index) => {
    if (index === this.currentIndexnews) {
      dot.classList.add('selected');
    } else {
      dot.classList.remove('selected');
    }
  });
}

updateDotsBooks = () => {
  const dots = document.querySelectorAll('.bookdot');
  dots.forEach((dot, index) => {
    if (index === this.currentIndexBooks) {
      dot.classList.add('selected');
    } else {
      dot.classList.remove('selected');
    }
  });
}

goToLink = (link:String)=>{
  window.open(link as string,'_blank')
}


}
