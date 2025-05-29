import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { userData } from 'src/app/models/types/user.types';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  ngOnInit(): void {
    this.testToken()
  }

  email = '';
  senha = '';

  loginButtonChangeIcon:String = 'default'
  
  token = localStorage.getItem('token')

  testToken(){
    if (this.token){
        this.errorEmail = false
          this.errorPassword = false
          this.loginButtonChangeIcon = 'sucess'
          this.toastMansage = true
      setTimeout(()=>{
        this.navCtrl.navigateForward('/tabs')
        }, 2000)
    }
  }

  errorMensageEmail:string = ''
  errorMensagePassword:string = ''
  errorEmail:Boolean = false
  errorPassword:Boolean = false
  toastMansage:Boolean = false

  constructor(

    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService:AuthService,
    private navCtrl:NavController
  ) {}

   onLogin() {
  
      this.loginButtonChangeIcon='syncing'
      this.authService.login(this.email,this.senha).subscribe({
        next: async(res) =>{
          this.errorEmail = false
          this.errorPassword = false
          this.loginButtonChangeIcon = 'sucess'
          this.toastMansage = true
          setTimeout(()=>{
          localStorage.setItem('token', res.token);
          this.navCtrl.navigateForward('/tabs')
          }, 2000)
          
        },
        error: async (err) => {
          this.errorEmail = true
          this.errorPassword = true
          if (err.status === 400){
            this.errorEmail = true
            this.errorMensageEmail = 'Usuário não encontrado'
             this.loginButtonChangeIcon = 'fail'
             this.toastMansage = false
          }
          else if(err.status === 401){
            this.errorEmail = false
            this.errorPassword = true
             this.loginButtonChangeIcon = 'fail'
            this.errorMensagePassword = "Senha incorreta"
            this.senha =''
            this.toastMansage = false
          }
          else if (err.status === 422){
            this.errorEmail = true
            this.errorPassword = true
            this.errorMensageEmail = "Preencha o campo 'Email'"
            this.errorMensagePassword = "Preencha o campo 'Senha'"
             this.loginButtonChangeIcon = 'fail'
             this.toastMansage = false
          }
          else{
            this.errorEmail = true
            this.errorPassword = true
            this.errorMensageEmail = "Algo deu errado. Tente novamente mais tarde'"
             this.loginButtonChangeIcon = 'fail'
             this.toastMansage = false
          }
        }
      });

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
