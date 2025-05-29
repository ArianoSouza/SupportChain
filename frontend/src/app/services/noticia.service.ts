import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, map, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://localhost:3000/noticias';
  private localStorageKey = 'noticiasCache';


  constructor(private http: HttpClient) {}


  
  getNoticias(): Observable<any[]> {
    const cache = localStorage.getItem(this.localStorageKey);
    const token = localStorage.getItem('token')


    console.log(cache)
    if (cache) {
      // Retorna os dados do localStorage se estiverem disponíveis
      return of(JSON.parse(cache));
    } else {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log("data não encontrada")
      // Faz a requisição e salva no localStorage
      return this.http.get<any>(this.apiUrl, { headers }).pipe(
        map(response => response.noticias.slice(0, 5)),
        tap(noticias => localStorage.setItem(this.localStorageKey, JSON.stringify(noticias)))
      );
    }
  }
  
}