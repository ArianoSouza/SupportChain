import { userData } from './../models/types/user.types';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigPerfilComponent } from 'src/app/components/config-perfil/config-perfil.component';
import { Router } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";


@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
  standalone: false
})
export class ConfiguracoesPage {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  actualUser: userData | undefined = undefined

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
