import { books } from '../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { articles, news } from '../models/types/user.types';



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
   }
   constructor() {}
 
  newsTranslante = 0
  booksTranslate = 0
  avaliation = false
  feedBackMensage = true
  currentIndexnews = Math.abs(this.newsTranslante / 25);
  currentIndexBooks = Math.abs(this.newsTranslante / 26);

  books:books[] = [
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    },
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    },
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    },
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    },
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    },
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }
    ,
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }
    ,
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }
    ,
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }
    ,
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }
    ,
    {
      name:"como dar a bunda com sucesso",
      author:"Josiel Dabunda",
      rate:5,
      linkImg:"https://m.media-amazon.com/images/I/91aLTslLIQL._UF894,1000_QL80_.jpg"
    }

  ]
  articles:articles[] = [
    {
      title: "Darocu é muito bom",
      authors: ["Josiel Dabunda"],
      tags:["psicologia","daocu","poster"]
    }
  ]
  news:news[] = [
    {
      title:"Análise: por que as redes sociais não deveriam substituir sua terapia?",
      author:"CNN",
      date: "04-11-2024",
      time:"12:13",
      linkImg:"https://sciath.com.br/wp-content/uploads/2022/08/terapeuta.jpg"
    },
    {
      title:"Análise: meu pau no seu cu?",
      author:"CNN",
      date: "04-11-2024",
      time:"12:13",
      linkImg:"https://sciath.com.br/wp-content/uploads/2022/08/terapeuta.jpg"
    },
    {
      title:"Análise: meu pau no seu cu?",
      author:"CNN",
      date: "04-11-2024",
      time:"12:13",
      linkImg:"https://sciath.com.br/wp-content/uploads/2022/08/terapeuta.jpg"
    },
    {
      title:"Análise: meu pau no seu cu?",
      author:"CNN",
      date: "04-11-2024",
      time:"12:13",
      linkImg:"https://sciath.com.br/wp-content/uploads/2022/08/terapeuta.jpg"
    }, {
      title:"Análise: meu pau no seu cu?",
      author:"CNN",
      date: "04-11-2024",
      time:"12:13",
      linkImg:"https://sciath.com.br/wp-content/uploads/2022/08/terapeuta.jpg"
    }
  ]  

  setFeedBackMensage = ()=>{
    this.feedBackMensage = !this.feedBackMensage
  }
  translateNewsMinus =()=>{
    if (!(this.newsTranslante >=0  )){
      this.newsTranslante +=25
      this.currentIndexnews = Math.abs(this.newsTranslante / 25);
      this.updateDotsNews();
  }
}
  translateNewsPlus =()=>{
    if (!(this.newsTranslante <= -100)){
      this.newsTranslante -=25
      this.currentIndexnews = Math.abs(this.newsTranslante / 25);
      this.updateDotsNews();

  }
}
translateBooksMinus =()=>{
  if (!(this.booksTranslate >=0  )){
    this.booksTranslate +=26
    this.currentIndexBooks = Math.abs(this.booksTranslate/ 26);
    this.updateDotsBooks();
}
}
translateBooksPlus =()=>{
  if (!(this.booksTranslate <= -104)){
    this.booksTranslate -=26
    this.currentIndexBooks = Math.abs(this.booksTranslate/ 26);
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


}
