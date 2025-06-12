import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para obter o ID da URL
import { TopicService } from '../../services/topicService/topics.service';
import { Topic } from '../../models/types/user.types';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { ConteudoComponent } from 'src/app/components/conteudo/conteudo.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.page.html',
  styleUrls: ['./modulos.page.scss'],
  standalone:false
})
export class ModulosPage implements OnInit {

  trilhaId: string | null = null;
  topics: Topic[] = [];
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, // Para ler o ID da trilha da rota
    private topicService: TopicService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalContoler:ModalController,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtém o ID da trilha da URL (ex: /modulos/:trilhaId)
    // Configure sua rota em app-routing.module.ts como: { path: 'modulos/:trilhaId', component: ModulosPage }
    this.trilhaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.trilhaId) {
      this.loadTopics(this.trilhaId);
    } else {
      this.presentAlert('Erro', 'ID da trilha não fornecido na URL para buscar tópicos.');
      this.router.navigateByUrl('/tabs/trilhas'); // Redireciona para a página de trilhas
    }
  }

  async loadTopics(trilhaId: string) {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando tópicos...',
    });
    await this.loading.present();

    this.topicService.getTopicsByTrilhaId(trilhaId).subscribe({
      next: (topicsResponse: Topic[]) => { // Espera Topic[] diretamente do serviço
        this.topics = topicsResponse;
        console.log(topicsResponse)
        this.loading?.dismiss();
        console.log(`Tópicos para a trilha ${trilhaId} carregados:`, this.topics);
      },
      error: async (err: Error) => {
        this.loading?.dismiss();
        console.error('Erro ao carregar tópicos no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar tópicos.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar se o erro for fatal (ex: trilha não encontrada)
        // this.router.navigateByUrl('/trilhas');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Opcional: Para pull-to-refresh
  handleRefresh(event: any) {
    if (this.trilhaId) {
      this.loadTopics(this.trilhaId).finally(() => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }


  async openModal(id: string) {
      const modal = await this.modalContoler.create({
        component: ConteudoComponent,
        componentProps: { id }
      });
      await modal.present();
    }
 
    goBack(){
      this.navCtrl.navigateForward('/tabs/trilhas', {
        animated: true,
        animationDirection: 'back'
      }
    )
    }
}
