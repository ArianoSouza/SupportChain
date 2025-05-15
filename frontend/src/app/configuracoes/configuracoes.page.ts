import { userData } from './../models/types/user.types';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigPerfilComponent } from 'src/app/components/config-perfil/config-perfil.component';
import { Router } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";
import { CadastroService } from '../services/cadastro/cadastro.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
  standalone: false
})
export class ConfiguracoesPage {
  constructor(private modalCtrl: ModalController, private router: Router, private userData:CadastroService) {}

  actualUser: userData | undefined = this.userData.actualUser

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ConfigPerfilComponent,
    });

    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        console.log("Dados atualizados do perfil", detail.data);
      }
    });

    await modal.present();
  }

}
