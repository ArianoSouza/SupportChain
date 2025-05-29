import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Assistance } from 'src/app/models/types/user.types';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-details-assistance',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // ✅ isso inclui IonContent, IonCard, IonButton, etc.
  ],
  templateUrl: './detail-assistance.component.html',
  styleUrls: ['./detail-assistance.component.scss'],
})
export class DetailsAssistanceComponent {
  @Input() assistance!: Assistance;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  copyToClipboard(phone: string) {
    navigator.clipboard.writeText(phone).then(() => {
      console.log('Número copiado com sucesso!');
    }).catch(err => {
      console.error('Erro ao copiar', err);
    });
  }
  
  async abrirGoogleMaps(endereco: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    await Browser.open({ url });
  }
}


