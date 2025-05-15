import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'https://supportchain.onrender.com/Artigos';

  constructor(private http: HttpClient) {}

  getArticles(term: string = 'mental health'): Observable<any[]> {
    const params = new HttpParams().set('term', term);
    const cacheKey = this.generateCacheKey(term);
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<{ articles: any[] }>(this.apiUrl, { params }).pipe(
        map(response => response.articles),
        tap(articles => localStorage.setItem(cacheKey, JSON.stringify(articles)))
      );
    }
  }

  private generateCacheKey(term: string): string {
    return `articlesCache:term=${term}`;
  }
}
