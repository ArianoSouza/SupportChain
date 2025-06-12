// src/app/services/assistance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Importe 'of'
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Assistance, UserAddress, GetAllAssistancesApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém todos os serviços de assistência filtrados pelo estado do usuário logado.
   * Requer autenticação (JWT token).
   * @returns Observable<GetAllAssistancesApiResponse> Um Observable contendo a resposta completa da API.
   */
  getAllAssistancesFromUserAddress(): Observable<GetAllAssistancesApiResponse> {
    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token JWT
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token JWT no cabeçalho
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-assistances-by-user-address'
    const endpoint = `${this.apiUrl}/GetAllAssistancesFromUserAdress`;

    return this.http.get<GetAllAssistancesApiResponse>(endpoint, { headers }).pipe(
      catchError(error => {
        if (error.status === 404) { // Usuário não encontrado
          console.warn('API Response: Usuário não encontrado (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Usuário não encontrado.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao buscar assistências:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        } else if (error.status === 200 && error.error?.assistances && error.error.assistances.length === 0) {
            // Se o backend retorna 200 OK mas com array vazio de assistências
            // Retorna um Observable de um objeto de resposta que indica 0 assistências
            console.warn('API Response: Nenhuma assistência encontrada para o estado do usuário.');
            return of({
                message: error.error?.message || 'Nenhum serviço de assistência encontrado para o seu estado.',
                userAddress: error.error?.userAddress || { estado: 'Desconhecido', cidade: 'Desconhecido', bairro: 'Desconhecido' },
                assistances: []
            });
        }
        console.error('Erro ao buscar assistências:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao carregar assistências.'));
      })
    );
  }
}