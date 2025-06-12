// src/app/services/activity.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Activity, GetActivitiesByTagApiResponse } from '../../models/types/user.types'; // Importa as interfaces

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém todas as atividades relacionadas a uma categoria (tag) específica.
   * Não requer autenticação para este endpoint.
   * @param tag A tag da categoria para a qual buscar as atividades.
   * @returns Observable<Activity[]> Um Observable contendo um array de objetos Activity.
   */
  getActivitiesByTag(tag: string): Observable<Activity[]> {
    if (!tag) {
      return throwError(() => new Error('Tag da categoria é obrigatória para buscar atividades.'));
    }

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-activities-by-tag/TAG_AQUI'
    const endpoint = `${this.apiUrl}/GetActivitiesFromActivitiesTag/${tag}`;

    return this.http.get<GetActivitiesByTagApiResponse>(endpoint).pipe(
      // Transforma a resposta da API para extrair o array de atividades
      map(response => response.activities),
      catchError(error => {
        if (error.status === 404) {
          console.warn(`API Response: Nenhuma atividade encontrada para a categoria ${tag} (Status 404).`);
          // Retorna um Observable com um array vazio de atividades em caso de 404
          return of([]);
        }
        console.error(`Erro ao buscar atividades para a categoria ${tag}:`, error);
        // Para outros erros, lança o erro como um Observable de erro.
        return throwError(() => new Error(error.error?.message || `Erro desconhecido ao carregar atividades para a categoria ${tag}.`));
      })
    );
  }
}