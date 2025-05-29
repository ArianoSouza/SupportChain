import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userData } from 'src/app/models/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiLogin = 'https://supportchain.onrender.com/user/login'; // URL da sua API
  private apiCadastro = 'https://supportchain.onrender.com/user/cadastro'

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.apiLogin, { email, senha });
  }
  
  cadastrar(usuario: userData): Observable<any> {
    return this.http.post(this.apiCadastro, usuario);
  }


}