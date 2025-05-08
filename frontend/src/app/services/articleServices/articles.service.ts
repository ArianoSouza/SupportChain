import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'http://localhost:3000/artigos'; // ajuste para o endpoint do seu backend

  constructor(private http: HttpClient) {}

  getArticles(term: string = 'mental health'): Observable<any[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<{ articles: any[] }>(this.apiUrl, { params }).pipe(
      map(response => response.articles)
    );
  }
}
