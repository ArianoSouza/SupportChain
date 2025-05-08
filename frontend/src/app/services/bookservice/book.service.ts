import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/Books'; // ou o endpoint real da sua API

  constructor(private http: HttpClient) {}

  getBooks(q?: string, subject?: string): Observable<any[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    if (subject) params = params.set('subject', subject);

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(books => books.slice(0, 10)) // pega só os 10 primeiros
    );
  }
}
