// src/app/services/trilha.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Importe 'of' também
import { catchError, map } from 'rxjs/operators'; // Importe 'map'
import { environment } from '../../environments/environment';

import { Trilha, GetAllTrilhasApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class TrilhaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtém todas as trilhas do banco de dados.
   * Não requer autenticação para este endpoint.
   * @returns Observable<Trilha[]> Um Observable contendo um array de objetos Trilha.
   */
  getAllTrilhas(): Observable<Trilha[]> { // A assinatura do método continua Observable<Trilha[]>
    const endpoint = `${this.apiUrl}/getAllTrilhas`;

    return this.http.get<GetAllTrilhasApiResponse>(endpoint).pipe(
      // Primeiro, transforme a resposta da API para extrair o array de trilhas
      map(response => response.trilhas), // <-- ADICIONADO ESTE OPERADOR 'MAP'
      catchError(error => {
        if (error.status === 404) {
          console.warn('API Response: Nenhuma trilha encontrada (Status 404).');
          // No caso de 404, retorne um Observable de um array vazio de Trilhas.
          // 'of([])' cria um Observable que emite apenas um array vazio e depois completa.
          return of([]); // <-- CORRIGIDO AQUI PARA EMITIR Observable<Trilha[]>
        }
        console.error('Erro ao buscar trilhas:', error);
        // Para outros erros, lança o erro como um Observable de erro.
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao carregar trilhas.'));
      })
    );
  }
}