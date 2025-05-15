import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';


export interface Tema {
  id: string;
  icone: string;
  titulo: string;
  descricao: string;
  objetivo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrilhasService {

  constructor(private http: HttpClient) { }

  getTemas(): Observable<Tema[]> {
   return this.http.get<{ temas: Tema[] }>('src/app/mocks/trilhas.json').pipe(
  map(response => response.temas)
);
  }
}
