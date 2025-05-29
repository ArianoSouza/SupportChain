import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Tema {
  id: string;
  nome: string;
  descricao: string;
  objetivo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrilhasService {

  constructor(private http: HttpClient) { }
  

  getTemas(nome: string): Observable<Tema[]> {
    const baseUrl = 'https://supportchain.onrender.com/allTrilhas';
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

  return this.http.get<any>(`${baseUrl}`,{ headers });
  
  }
}
