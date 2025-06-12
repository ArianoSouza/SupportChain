import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ActivitieStage, GetStagesByActivitieIdApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class ActivitieStageService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém todos os estágios relacionados a um ID de atividade específica.
   * Não requer autenticação para este endpoint.
   * @param activitieId O ID da atividade para a qual buscar os estágios.
   * @returns Observable<ActivitieStage[]> Um Observable contendo um array de objetos ActivitieStage.
   */
  getStagesByActivitieId(activitieId: string): Observable<ActivitieStage[]> {
    if (!activitieId) {
      return throwError(() => new Error('ID da atividade é obrigatório para buscar estágios.'));
    }

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-stages-by-activitie/ID_DA_ATIVIDADE_AQUI'
    const endpoint = `${this.apiUrl}/GetStagesFromActivitieIdFromTestDB/${activitieId}`;

    return this.http.get<GetStagesByActivitieIdApiResponse>(endpoint).pipe(
      // Transforma a resposta da API para extrair o array de estágios
      map(response => response.stages),
      catchError(error => {
        if (error.status === 404) {
          console.warn(`API Response: Nenhum estágio encontrado para a atividade ${activitieId} (Status 404).`);
          // Retorna um Observable com um array vazio de estágios em caso de 404
          return of([]);
        }
        console.error(`Erro ao buscar estágios para a atividade ${activitieId}:`, error);
        // Para outros erros, lança o erro como um Observable de erro.
        return throwError(() => new Error(error.error?.message || `Erro desconhecido ao carregar estágios para a atividade ${activitieId}.`));
      })
    );
  }
}