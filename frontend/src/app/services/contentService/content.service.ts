// src/app/services/content.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Content, GetContentByTopicIdApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém o conteúdo relacionado a um ID de tópico específico.
   * Não requer autenticação para este endpoint.
   * @param topicId O ID do tópico para o qual buscar o conteúdo.
   * @returns Observable<Content> Um Observable contendo o objeto Content.
   */
  getContentByTopicId(topicId: string): Observable<Content> {
    if (!topicId) {
      return throwError(() => new Error('ID do tópico é obrigatório para buscar conteúdo.'));
    }

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-content-by-topic/ID_DO_TOPICO_AQUI'
    const endpoint = `${this.apiUrl}/GetContentFromTopicsId/${topicId}`;

    return this.http.get<GetContentByTopicIdApiResponse>(endpoint).pipe(
      // Transforma a resposta da API para extrair o objeto Content
      map(response => response.content),
      catchError(error => {
        if (error.status === 404) {
          console.warn(`API Response: Nenhum conteúdo encontrado para o tópico ${topicId} (Status 404).`);
          // Retorna um Observable de 'null' ou 'undefined' ou lança um erro específico
          // para indicar que não há conteúdo, dependendo da sua lógica.
          // Por clareza, vamos lançar um erro específico para o componente tratar.
          return throwError(() => new Error(`Conteúdo para o tópico '${topicId}' não encontrado.`));
        }
        console.error(`Erro ao buscar conteúdo para o tópico ${topicId}:`, error);
        return throwError(() => new Error(error.error?.message || `Erro desconhecido ao carregar conteúdo para o tópico ${topicId}.`));
      })
    );
  }
}