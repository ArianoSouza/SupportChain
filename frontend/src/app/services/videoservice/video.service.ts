
// src/app/services/video.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AddLikeApiResponse, AlterClickTagsVideoApiResponse, AlterClickTagsVideoRequestBody, Video } from 'src/app/models/types/user.types';
import { environment } from '../../environments/environment';
// Para sua URL da API

// Defina as interfaces para os dados que você espera receber da API
export interface VideoInfo {
  id: string;
  title: string;
  tags: string[];
  likesCount: number;
  // Se você expandir sua API para retornar mais campos (description, tumbURL, URL), adicione-os aqui:
  // description?: string;
  // tumbURL?: string;
  // URL?: string;
}

export interface ApiResponse {
  message: string;
  videos: VideoInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = environment.apiBaseUrl;// Ex: 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista de vídeos ordenada por sugestão.
   * Assume que o token JWT é armazenado localmente (ex: localStorage).
   * @returns Observable<ApiResponse>
   */
  getSuggestedVideos(): Observable<ApiResponse> {
    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token

    if (!token) {
      // Lidar com a falta do token, talvez redirecionar para login
      console.error('Token JWT não encontrado. Por favor, faça login.');
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ajuste '/getAllVideoInfoFromTestDB' se a rota for diferente no seu Express.js
    return this.http.get<ApiResponse>(`${this.apiUrl}/getAllVideoInfo`, { headers });
  }

  getVideoById(videoId: string): Observable<Video> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token JWT não encontrado. Por favor, faça login.');
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // A rota no seu Express.js deve ser algo como '/videos/:id' ou '/getVideoInfoFromTestDB/:id'
    // Ajuste a URL abaixo para corresponder à sua rota de API
    return this.http.get<Video>(`${this.apiUrl}/getVideo/${videoId}`, { headers });
  }


  addVideoTags(tags: string[]): Observable<AlterClickTagsVideoApiResponse> {
    if (!Array.isArray(tags) || tags.some(t => typeof t !== 'string')) {
      return throwError(() => new Error('É necessário fornecer um array de tags (strings) válido.'));
    }
    if (tags.length === 0) {
      // Se não há tags para adicionar, pode-se retornar um observable que completa imediatamente
      // ou um erro, dependendo da sua lógica de negócio.
      console.warn('Tentativa de adicionar array de tags vazio.');
      return throwError(() => new Error('O array de tags não pode estar vazio.'));
    }

    const token = localStorage.getItem('token'); // Ou onde quer que você armazene seu token JWT
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token JWT no cabeçalho
    });

    const body: AlterClickTagsVideoRequestBody = {
      tags: tags
    };

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/alter-clicktags-video'
    const endpoint = `${this.apiUrl}/AlterClickTagsVideoFromUserId`;

    return this.http.put<AlterClickTagsVideoApiResponse>(endpoint, body, { headers }).pipe(
      catchError(error => {
        if (error.status === 404) { // Registro de ClickTags não encontrado
          console.error('Erro: Registro de ClickTags não encontrado para o usuário (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Registro de ClickTags não encontrado para o usuário.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao alterar ClickTags:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        }
        console.error('Erro ao adicionar tags às ClickTags do usuário:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao adicionar tags.'));
      })
    );
  }

  addLikeToVideo(videoId: string | null): Observable<AddLikeApiResponse> {
    if (!videoId) {
      return throwError(() => new Error('ID do vídeo é obrigatório para adicionar like.'));
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado. Por favor, faça login.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // A rota da API deve corresponder exatamente à rota do seu backend
    // Ex: '/like-video/ID_DO_VIDEO_AQUI'
    const endpoint = `${this.apiUrl}/AddLikeOnVideo/${videoId}`;

    // A API é um POST, mas o corpo pode ser vazio se todas as informações estiverem na URL/cabeçalho
    return this.http.post<AddLikeApiResponse>(endpoint, {}, { headers }).pipe( // Passa um objeto vazio como corpo
      catchError(error => {
        // A API retorna 200 mesmo se já curtiu, então o erro 409 não será comum aqui
        // Verifique outros status de erro relevantes
        if (error.status === 404) { // Vídeo não encontrado
          console.error('Erro: Vídeo não encontrado (Status 404).', error);
          return throwError(() => new Error(error.error?.message || 'Vídeo não encontrado para curtir.'));
        } else if (error.status === 401 || error.status === 403) {
          console.error('Erro de autenticação/autorização ao adicionar like:', error);
          return throwError(() => new Error(error.error?.message || 'Sessão expirada ou não autorizado.'));
        }
        console.error('Erro ao adicionar like ao vídeo:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido ao adicionar like.'));
      })
    );
  }
}