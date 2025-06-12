import { Component, Input, OnInit } from '@angular/core';
import {  AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent, IonLabel, IonBackButton, IonList, IonItem, IonIcon } from "@ionic/angular/standalone";
import { userData, UserInfo } from 'src/app/models/types/user.types';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/UserInfoService/user-info.service';

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

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController, // Injete ToastController
    private fb: FormBuilder, 
    private modalCtrl:ModalController // <-- Injete FormBuilder
  ){}

  @Input() user!: UserInfo;
  loading: HTMLIonLoadingElement | null = null;

  ngOnInit() {
  
  } 

  async salvar() {
   
    const loader = await this.loadingController.create({
      message: 'Salvando alterações...',
    });
    this.userService.updateUserInfo(this.user).subscribe({
      next: (response) => {
        loader.dismiss();
        this.presentToast(response.message, 'success');
        this.modalCtrl.dismiss();
      },
      error: async (err: Error) => {
        loader.dismiss();
        console.error('Erro ao salvar perfil:', err);
        this.presentAlert('Erro ao Salvar Perfil', err.message || 'Falha ao salvar as alterações.');
      }
    });
     
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

    closemodal(){
    this.modalCtrl.dismiss();
  }

}
