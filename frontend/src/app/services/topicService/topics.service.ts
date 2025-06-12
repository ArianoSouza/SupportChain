import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Topic, GetTopicsByTrilhaIdApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém todos os tópicos relacionados a um ID de trilha específico.
   * Não requer autenticação para este endpoint.
   * @param trilhaId O ID da trilha para a qual buscar os tópicos.
   * @returns Observable<Topic[]> Um Observable contendo um array de objetos Topic.
   */
  getTopicsByTrilhaId(trilhaId: string): Observable<Topic[]> {
    if (!trilhaId) {
      return throwError(() => new Error('ID da trilha é obrigatório para buscar tópicos.'));
    }

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-topics-by-trilha/ID_DA_TRILHA_AQUI'
    const endpoint = `${this.apiUrl}/GetTopicsFromTrilhaIdFromTestDB/${trilhaId}`;

    return this.http.get<GetTopicsByTrilhaIdApiResponse>(endpoint).pipe(
      // Transforma a resposta da API para extrair o array de tópicos
      map(response => response.topics),
      catchError(error => {
        if (error.status === 404) {
          console.warn(`API Response: Nenhum tópico encontrado para a trilha ${trilhaId} (Status 404).`);
          // Retorna um Observable com um array vazio de tópicos em caso de 404
          return of([]);
        }
        console.error(`Erro ao buscar tópicos para a trilha ${trilhaId}:`, error);
        // Para outros erros, lança o erro como um Observable de erro.
        return throwError(() => new Error(error.error?.message || `Erro desconhecido ao carregar tópicos para a trilha ${trilhaId}.`));
      })
    );
  }
}