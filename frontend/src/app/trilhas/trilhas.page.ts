import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {TrilhasService, Tema} from '../services/trilhas.service';
import trilhas from 'src/app/mocks/trilhas.json'

@Component({
  selector: 'app-trilhas',
  templateUrl: './trilhas.page.html',
  styleUrls: ['./trilhas.page.scss'],
  standalone:false
})
export class TrilhasPage implements OnInit {

 temas: Tema[] = trilhas.temas as Tema[]; 
 temasFiltrados: Tema[] = this.temas;

  constructor(private trilhasService: TrilhasService, private router: Router) { }

  ngOnInit() {
     //this.carregarTemas();
  }

 carregarTemas() {
  this.trilhasService.getTemas().subscribe(
    data => {
      console.log('Dados carregados:', data); 
      this.temas = data;
    },
    error => {
      console.error('Erro ao carregar temas:', error);
    }
  );
}

 filtrarTemas(query: string): Tema[] {
  const lowerQuery = query.toLowerCase().trim();

  return this.temas.filter(tema => {
    const tituloMatch = tema.titulo.toLowerCase().includes(lowerQuery);
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
