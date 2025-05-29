import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent, IonLabel, IonBackButton, IonList, IonItem, IonIcon } from "@ionic/angular/standalone";
import { userData } from 'src/app/models/types/user.types';
import { FormsModule } from '@angular/forms';

interface userMiniData{
  nome:string,
  sobrenome:string,
  email:string
}

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.component.html',
  styleUrls: ['./config-perfil.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
]
})
export class ConfigPerfilComponent  implements OnInit {

  

  actualUserData:userData = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    sexo: '',
    estado_civil: '',
    data_nascimento: '',
    numero_telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
    foto:'',
    termos_de_uso: true,
    envio_de_dados: true
  };
  saveName:string =''
  saveSobreNome: string =''
  saveEmail:string = ''

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
     this.saveName = this.actualUserData.nome
   this.saveSobreNome = this.actualUserData.sobrenome
   this.saveEmail = this.actualUserData.email
  
  } 

  salvar() {
   
    console.log(this.actualUserData)
    this.modalCtrl.dismiss();
     
  }

    closemodal(){
      this.actualUserData.email = this.saveEmail
      this.actualUserData.sobrenome = this.saveSobreNome
      this.actualUserData.nome = this.saveName
    this.modalCtrl.dismiss();
  }

}
