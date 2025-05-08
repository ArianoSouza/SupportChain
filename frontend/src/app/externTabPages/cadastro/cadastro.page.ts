import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone:false
})
export class CadastroPage {
  usuario = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    sexo: '',
    estado_civil: '',
    data_de_nascimento: '',
    numero_de_telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
    foto: 'aloha'
  };

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async onCadastrar() {
    const loading = await this.loadingCtrl.create({ message: 'Cadastrando...' });
    await loading.present();

    this.authService.cadastrar(this.usuario).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Sucesso',
          message: 'Usuário cadastrado com sucesso!',
          buttons: [{text:'OK',
            handler: () => {
              this.router.navigate(['/login']); // <-- redireciona para login
            }
          }]
        });
        await alert.present();

      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro ao cadastrar',
          message: err.error.Message || 'Erro inesperado.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}