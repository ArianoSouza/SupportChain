import { userData, UserInfo } from './../models/types/user.types';
import { ModalController } from '@ionic/angular';
import { ConfigPerfilComponent } from 'src/app/components/config-perfil/config-perfil.component';
import { Router } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserInfoService/user-info.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http'; // Par


@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
  standalone: false
})
export class ConfiguracoesPage implements OnInit {
  constructor(
    private modalCtrl: ModalController
    ,private router: Router,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit(){
    this.loadUserInfo()
  }

  user: UserInfo | null = null;
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;



  async loadUserInfo() {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando perfil...',
    });
    await this.loading.present();

    this.userService.getUserInfo().subscribe({
      next: (userInfo: UserInfo) => { // Espera UserInfo diretamente do serviço
        this.user = userInfo;
        this.loading?.dismiss();
        console.log('Informações do usuário carregadas:', this.user);
      },
      error: async (err: Error) => { // 'err' será o Error lançado pelo service
        this.loading?.dismiss();
        console.error('Erro ao carregar perfil do usuário:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar perfil.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar em caso de erro de autenticação ou usuário não encontrado
        // if (err.message.includes('Sessão expirada') || err.message.includes('não autorizado')) {
        //   this.router.navigateByUrl('/login');
        // }
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


  async presentConfirmCancelAlert(
    header: string,
    message: string,
    confirmHandler: () => void, // Função a ser executada no clique em "Confirmar"
    cancelHandler?: () => void // Função opcional a ser executada no clique em "Cancelar"
  ) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', // Define o papel do botão como 'cancel'
          cssClass: 'secondary', // Classe CSS opcional para estilo (ex: cinza)
          handler: () => {
            console.log('Botão Cancelar clicado');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm', // Define um papel personalizado ou 'destructive' para ações perigosas
          cssClass: 'primary', // Classe CSS opcional para estilo (ex: azul)
          handler: () => {
            console.log('Botão Confirmar clicado');
            confirmHandler(); // Executa a função de confirmação fornecida
          },
        },
      ],
    });
  
    await alert.present();
  }

  // Opcional: Para pull-to-refresh
  handleRefresh(event: any) {
    this.loadUserInfo().finally(() => {
      event.target.complete();
    });
  }

  async openModal(user:UserInfo | null  ) {
    const modal = await this.modalCtrl.create({
      component: ConfigPerfilComponent,
      componentProps: { user }
    },
  );

    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        console.log("Dados atualizados do perfil", detail.data);
      }
    });

    await modal.present();
  }

  logOut(){
    this.presentConfirmCancelAlert(
      "Sair do aplicativo",
      "Deseja mesmo sair do aplicativo?",
      ()=>{this.doSomethingOnConfirm()} // Função a ser executada no clique em "Confirmar"
    )

  }


  doSomethingOnConfirm():void {
    localStorage.removeItem('token');
     this.router.navigate(['/login'])
  }
  

}
