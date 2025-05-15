import { Injectable } from '@angular/core';
import { userData } from 'src/app/models/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor() { }

  private userData:userData[] = [
    {
      nome: 'André',
      sobrenome: 'Caetano',
      email: 'andrecaetano@gmail.com',
      senha: '123456',
      sexo: 'Masculino',
      estado_civil: '',
      data_de_nascimento: '',
      numero_de_telefone: '',
      estado: 'pernambuco',
      cidade: 'Recife',
      bairro: 'Graças',
    }
  ]

  actualUser:userData = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    sexo: '',
    estado_civil: 'S',
    data_de_nascimento: '',
    numero_de_telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
  }

  setActualUser(user:userData){
    this.actualUser = user
  }

  getActualUser(){
    return this.actualUser
  }
  
  setDados(dados:userData){
    this.userData = [...this.userData,dados]
  }
  getDados(){
    return this.userData
  }
}
