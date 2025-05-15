import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/types/user.types';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone:false
})
export class CadastroPage {
  usuario:userData = {
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
  };

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userService:CadastroService,
    private NavController:NavController
  ) {}

  onregister(){
    this.userService.setDados(this.usuario)
    this.NavController.navigateForward('/login')
    console.log(this.userService.getDados())
  }

 /* async onCadastrar() {
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
    */

  goToLogin(){
    this.NavController.navigateBack('/login')
  }
}