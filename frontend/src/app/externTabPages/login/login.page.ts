import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';

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

    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userData:CadastroService,
    private navCtrl:NavController
  ) {}

   onLogin() {
    const userEmail = this.userData.getDados().filter(user=> user.email.includes(this.email))

    if(userEmail.length === 0){
      console.log("usuário não cadastrado")
    }
    else{
      if (userEmail[0].senha === this.senha){
        this.userData.setActualUser(userEmail[0])
        this.router.navigate(['/tabs/home'],{
          queryParams:{
            id:userEmail[0].nome
          }
        })

      }
      else{
        console.log("senha incorreta")
      }
    }
  }
  
  goToCadastro(){
    this.navCtrl.navigateForward('/cadastro')
  }
}
