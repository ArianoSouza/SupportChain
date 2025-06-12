import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { UserInfo, GetUserInfoApiResponse, AlterUserInfoApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém as informações completas do usuário logado (exceto a senha).
   * Requer autenticação (JWT token).
   * @returns Observable<UserInfo> Um Observable contendo o objeto UserInfo.
   */
  getUserInfo(): Observable<UserInfo> {
    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token JWT
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token JWT no cabeçalho
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-user-info'
    const endpoint = `${this.apiUrl}/GetUserInfoFromId`;

    return this.http.get<GetUserInfoApiResponse>(endpoint, { headers }).pipe(
      // Transforma a resposta da API para extrair o objeto UserInfo
      map(response => response.user),
      catchError(error => {
        if (error.status === 404) { // Usuário não encontrado
          console.warn('API Response: Usuário não encontrado (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Usuário não encontrado.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao buscar informações do usuário:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        }
        console.error('Erro ao buscar informações do usuário:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao carregar informações do usuário.'));
      })
    );
  }


  updateUserInfo(updates: Partial<UserInfo>): Observable<AlterUserInfoApiResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/alter-user-info'
    const endpoint = `${this.apiUrl}/AlterUserInfoFromId`;

    // O backend já lida com a remoção de 'senha' e 'id' do objeto 'updates'
    // mas por segurança extra, podemos filtrar aqui também no frontend.
    const filteredUpdates: Partial<UserInfo> = { ...updates };
    if ('id' in filteredUpdates) delete filteredUpdates.id;
    // Se 'senha' estivesse no UserInfo, também removeríamos: if ('senha' in filteredUpdates) delete filteredUpdates.senha;

    return this.http.put<AlterUserInfoApiResponse>(endpoint, filteredUpdates, { headers }).pipe(
      catchError(error => {
        if (error.status === 400) { // Nenhum campo válido para atualização / Corpo vazio
          console.error('Erro de validação da requisição (Status 400):', error);
          return throwError(() => new Error(error.error?.message || 'Nenhum dado válido para atualização fornecido.'));
        } else if (error.status === 404) { // Usuário não encontrado para atualização
          console.error('Erro: Usuário não encontrado para atualização (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Usuário não encontrado para atualização.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao atualizar informações do usuário:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        }
        console.error('Erro ao atualizar informações do usuário:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao atualizar informações do usuário.'));
      })
    );
  }
}