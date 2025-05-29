import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {TrilhasService, Tema} from '../services/trilhas.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-trilhas',
  templateUrl: './trilhas.page.html',
  styleUrls: ['./trilhas.page.scss'],
  standalone:false
})
export class TrilhasPage implements OnInit {

temas:Tema[] = [];
temasFiltrados:Tema[] = [];

  constructor(private trilhasService: TrilhasService, private router: Router) { }

  ngOnInit() {
     this.carregarTemas();
  }

 carregarTemas() {
  this.trilhasService.getTemas('Trilha XYZ').subscribe(
    data => {
      console.log('Dados carregados:', data); 
      this.temas = data;
      this.temasFiltrados = data;
    },
    error => {
      console.error('Erro ao carregar temas:', error);
    }
  );
}

 filtrarTemas(query: string): Tema[] {
  const lowerQuery = query.toLowerCase().trim();

  return this.temas.filter(tema => {
    const tituloMatch = tema.nome.toLowerCase().includes(lowerQuery);
    const descricaoMatch = tema.descricao.toLowerCase().includes(lowerQuery);
    return tituloMatch || descricaoMatch;
  });
}

onSearch(event: any) {
  const query = event.detail.value;
  this.temasFiltrados = this.filtrarTemas(query);
}

goToModulos(event:Event){
  this.router.navigate(['/modulos'],{
    queryParams:
    {
      id: (event.currentTarget as HTMLElement).id.toString()
    }
  })
}
}
