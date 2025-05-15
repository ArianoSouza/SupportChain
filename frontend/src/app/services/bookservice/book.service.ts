import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://supportchain.onrender.com/Books';

  constructor(private http: HttpClient) {}

  getBooks(q?: string, subject?: string): Observable<any[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    if (subject) params = params.set('subject', subject);

    // Cria uma chave única de cache com base nos parâmetros
    const cacheKey = this.generateCacheKey(q, subject);
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<any[]>(this.apiUrl, { params }).pipe(
        map(books => books.slice(0, 10)),
        tap(books => localStorage.setItem(cacheKey, JSON.stringify(books)))
      );
    }
  }

  private generateCacheKey(q?: string, subject?: string): string {
    const qKey = q ? `q=${q}` : '';
    const subjectKey = subject ? `subject=${subject}` : '';
    return `booksCache:${qKey}:${subjectKey}`;
  }
}
