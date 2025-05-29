import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiEstadosService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  private estadosCache: any[] | null = null;


  // Pega todos os estados com cache
  getAllStates(): Observable<any> {
    if (this.estadosCache) {
      return of(this.estadosCache); // Retorna cache
    }

    return this.http.get<any[]>(`${this.baseUrl}/estados`).pipe(
      map(lista =>
        lista.map((item: any) => ({
          nome: item.nome,
          id: item.id
        }))
      ),
      tap(data => this.estadosCache = data) // Salva no cache
    );
  }

  // Pega todos os municípios de um estado com cache
  getAllMunicipios(idEstado?: string): Observable<any> {

    return this.http.get<any[]>(`${this.baseUrl}/estados/${idEstado}/municipios`).pipe(
      map(lista =>
        lista.map((item: any) => item.nome,)
      )
    )
  }
}
