

// src/app/conteudo/conteudo.component.ts

import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importe 'Input'
import { ModalController, LoadingController, AlertController, IonicModule } from '@ionic/angular'; // Importe ModalController para fechar o modal
import { Content } from '../../models/types/user.types'; // Use o modelo Content que definimos
import { ContentService } from '../../services/contentService/content.service'; // Seu serviço para buscar o conteúdo
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutOfServiceComponent } from '../out-of-service/out-of-service.component';

@Component({
  selector: 'app-conteudo', // Seu seletor HTML para usar o componente
  templateUrl: './conteudo.component.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutOfServiceComponent
  ],
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnInit {

  @Input() id: string = ''; // <--- AQUI! Receberá o ID do tópico do componente pai/modal

  content: Content | null = null;
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;

  constructor(
    private modalController: ModalController, // Para fechar o modal (se for usado como modal)
    private contentService: ContentService,   // Serviço para buscar o conteúdo
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if (this.id) {
      console.log('ID recebido no ConteudoComponent (via @Input):', this.id);
      this.loadContent(this.id); // Carrega o conteúdo com o ID recebido
    } else {
      console.error('ID do tópico não recebido no ConteudoComponent. Não é possível carregar o conteúdo.');
      this.errorMessage = 'Não foi possível carregar o conteúdo. ID inválido.';
    }
  }

  async loadContent(topicId: string) {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando conteúdo...',
    });
    await this.loading.present();

    this.contentService.getContentByTopicId(topicId).subscribe({
      next: (contentData: Content) => {
        this.content = contentData;
        this.loading?.dismiss();
      },
      error: async (err: Error) => {
        this.loading?.dismiss();
        console.error('Erro ao carregar conteúdo:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar conteúdo.';
        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  // Se este componente for usado como modal, este método será chamado para fechá-lo
  async closeModal() {
    await this.modalController.dismiss();
  }
}
