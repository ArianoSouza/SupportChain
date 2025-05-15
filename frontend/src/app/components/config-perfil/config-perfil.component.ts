import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent, IonLabel, IonBackButton, IonList, IonItem, IonIcon } from "@ionic/angular/standalone";
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';
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



  actualUserData:userData= this.userData.getActualUser()
  saveName:string =''
  saveSobreNome: string =''
  saveEmail:string = ''

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private userData:CadastroService) {}

  ngOnInit() {
   this.saveName = this.actualUserData.nome
   this.saveSobreNome = this.actualUserData.sobrenome
   this.saveEmail = this.actualUserData.email
  } 

  salvar() {
    this.userData.actualUser.nome = this.actualUserData.nome
    this.userData.actualUser.sobrenome = this.actualUserData.sobrenome
    this.userData.actualUser.email = this.actualUserData.email
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
