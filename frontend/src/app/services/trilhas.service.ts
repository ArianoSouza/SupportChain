import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
    private baseUrl = 'http://localhost:3000/trilha';
  constructor(private http: HttpClient) { }

  getTemas(nome: string): Observable<Tema[]> {
  return this.http.get<Tema[]>(`${this.baseUrl}?nome=${encodeURIComponent(nome)}`);
  
  }
}
