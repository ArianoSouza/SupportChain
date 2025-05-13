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

    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router 
  ) {}

   onLogin() {
    this.router.navigate(['/tabs/home'])
  }
}
