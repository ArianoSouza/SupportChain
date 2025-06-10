// src/app/services/video.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/types/user.types';
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
  private apiUrl = 'http://localhost:3000' // Ex: 'http://localhost:3000'

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
    return this.http.get<ApiResponse>(`${this.apiUrl}/getAllVideoInfoFromTestDB`, { headers });
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
    return this.http.get<Video>(`${this.apiUrl}/getVideoFromTestDB/${videoId}`, { headers });
  }
}