// src/app/services/questionary.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { GetQuestionaryByActivitieIdApiResponse, PostUserAnswersApiResponse, PostUserAnswersRequestBody } from '../../models/types/user.types'; // Importa a interface de resposta

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {
  private apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém o questionário relacionado a um ID de atividade específica e verifica se o usuário já respondeu.
   * Requer autenticação (JWT token).
   * @param activitieId O ID da atividade para a qual buscar o questionário.
   * @returns Observable<GetQuestionaryByActivitieIdApiResponse> Um Observable contendo a resposta completa da API.
   */
  getQuestionaryByActivitieId(activitieId: string): Observable<GetQuestionaryByActivitieIdApiResponse> {
    if (!activitieId) {
      return throwError(() => new Error('ID da atividade é obrigatório para buscar o questionário.'));
    }

    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token JWT
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token JWT no cabeçalho
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/get-questions-by-activitie/ID_DA_ATIVIDADE_AQUI'
    const endpoint = `${this.apiUrl}/GetQuestionsFromActivitieId/${activitieId}`;

    return this.http.get<GetQuestionaryByActivitieIdApiResponse>(endpoint, { headers }).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.warn(`API Response: Nenhum questionário encontrado para a atividade ${activitieId} (Status 404).`);
          // Para 404, podemos retornar um Observable de um objeto de resposta com questionário nulo/vazio
          // e hasAnswered false, ou lançar um erro específico se 404 for considerado um erro.
          // Neste caso, lançar um erro para o componente tratar é mais direto.
          return throwError(() => new Error(error.error?.message || `Questionário para a atividade '${activitieId}' não encontrado.`));
        } else if (error.status === 401 || error.status === 403) {
            console.error('Erro de autenticação/autorização ao buscar questionário:', error);
            return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        }
        console.error(`Erro ao buscar questionário para a atividade ${activitieId}:`, error);
        return throwError(() => new Error(error.error?.message || `Erro desconhecido ao carregar questionário para a atividade ${activitieId}.`));
      })
    );
  }


  postUserAnswers(fk_questionarie_id: string, answers: string[]): Observable<PostUserAnswersApiResponse> {
    if (!fk_questionarie_id || !Array.isArray(answers) || answers.some(a => typeof a !== 'string')) {
      return throwError(() => new Error('ID do questionário e respostas (array de strings) são obrigatórios.'));
    }

    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token JWT
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token JWT no cabeçalho
    });

    const body: PostUserAnswersRequestBody = {
      fk_questionarie_id: fk_questionarie_id,
      answers: answers
    };

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/post-user-answers'
    const endpoint = `${this.apiUrl}/PostNewUserAnswers`;

    return this.http.post<PostUserAnswersApiResponse>(endpoint, body, { headers }).pipe(
      catchError(error => {
        if (error.status === 409) { // Conflito: Usuário já respondeu
          console.warn('API Response: Usuário já respondeu a este questionário (Status 409).', error);
          return throwError(() => new Error(error.error?.message || 'Você já enviou respostas para este questionário.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao enviar respostas:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        } else if (error.status === 404) { // Ex: Questionário não encontrado (se o backend tiver essa validação)
          console.error('Erro: Questionário não encontrado (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Questionário não encontrado.'));
        }
        console.error('Erro ao enviar respostas do usuário:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao enviar respostas.'));
      })
    );
  }
}