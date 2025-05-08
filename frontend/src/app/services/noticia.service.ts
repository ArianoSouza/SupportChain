import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://localhost:3000/noticias'; // <-- Substitua com a URL da sua API

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.noticias.slice(0, 5)) // pega só os 5 primeiros
    );
  }
}