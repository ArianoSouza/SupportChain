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

  errorMensageEmail:string = 'Insira um email válido'
  errorMensagePassword:string = 'Senha incorreta'
  errorEmail:Boolean = false
  errorPassword:Boolean = false

  constructor(

    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userData:CadastroService,
    private navCtrl:NavController
  ) {}

   onLogin() {
    const userEmail = this.userData.getDados().filter(user=> user.email.includes(this.email))

    if(this.email.length === 0){
      this.errorMensageEmail = "Campo em branco"
      this.errorEmail = true
    }
    if(userEmail.length === 0){
      this.errorMensageEmail = "Usuário não cadastrado"
      console.log("usuário não cadastrado")
      this.senha = ''
      this.errorEmail = true
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
        this.senha = ''
        this.errorPassword = true
      }
    }
  }
  
  goToCadastro(){
    this.navCtrl.navigateForward('/cadastro')
  }

  errorMensageSwitch(event:Event){
    const target = event.target as HTMLInputElement 
    const tType = target.type

    if (tType === 'email'){
      this.errorEmail = false;
    }
    if (tType === 'password'){
      this.errorPassword = false;
    }
  }

}
