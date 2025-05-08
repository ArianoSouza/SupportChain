import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage  {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router 
  ) {}

  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
    });
    await loading.present();

    this.authService.login(this.email, this.senha).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Sucesso',
          message: res.Messagen,
          buttons: [{text:'OK',
            handler: () => {
              this.router.navigate(['/tabs/home']); // <-- redireciona para login
            }
          }],
        }
        );
        await alert.present();

        // Redirecionar ou salvar dados conforme necessário
        console.log('Usuário logado:', res.Login);
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro ao logar',
          message: err.error.Message || 'Erro desconhecido',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }


}
