import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiLogin = 'http://localhost:3000/user/login'; // URL da sua API
  private apiCadastro = 'http://localhost:3000/user/cadastro'

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.apiLogin, { email, senha });
  }
  
  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.apiCadastro, usuario);
  }
}