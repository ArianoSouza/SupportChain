import { activitie, ActivitieStage } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ActivitieFormsComponent } from '../components/activitie-forms/activitie-forms.component';
import allActivities from '../mocks/activities.json'
import { activityDetails } from '../models/types/user.types';
import { ActivitieStageService } from '../services/stagesService/stages.service';

@Component({
  selector: 'app-activitie-content',
  templateUrl: './activitie-content.page.html',
  styleUrls: ['./activitie-content.page.scss'],
  standalone:false
})
export class ActivitieContentPage implements OnInit {

  constructor( 
    private route:ActivatedRoute, 
    private modalCtrl:ModalController, 
    private navCtrl:NavController,
    private activatedRoute: ActivatedRoute, // Para ler o ID da atividade da rota
    private activitieStageService: ActivitieStageService,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  title:String =''
  icon:String =''

  activitieId: string | null = null;
  stages: ActivitieStage[] = [];
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;

  ngOnInit() {

    this.activitieId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.activitieId) {
      this.loadStages(this.activitieId);
    } else {
      this.presentAlert('Erro', 'ID da atividade é obrigatório para buscar estágios.');
      this.navCtrl.navigateBack('/tabs/atividades'); // Redireciona para a página de atividades
    }
    this.route.queryParams.subscribe(params => {
      this.title = params['title']; 
      this.icon = params['icon']
    });

  }

  async loadStages(activitieId: string) {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando estágios...',
    });
    await this.loading.present();

    this.activitieStageService.getStagesByActivitieId(activitieId).subscribe({
      next: (stagesResponse: ActivitieStage[]) => { // Espera ActivitieStage[] diretamente do serviço
        this.stages = stagesResponse;
        this.loading?.dismiss();
        console.log(`Estágios para a atividade '${activitieId}' carregados:`, this.stages);
      },
      error: async (err: Error) => {
        this.loading?.dismiss();
        console.error('Erro ao carregar estágios no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar estágios.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar se o erro for fatal (ex: atividade não encontrada)
        // this.router.navigateByUrl('/activities');
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
    if (this.activitieId) {
      this.loadStages(this.activitieId).finally(() => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }

  allActivitie:activityDetails[] = []


 async openModal() {
       const modal = await this.modalCtrl.create({
         component: ActivitieFormsComponent,
         componentProps: { id:this.activitieId }
       });
       await modal.present();
     }

     formatMinutesHours(value:number):string{
      if (value >=60){
        return `+- ${value/60} hrs`
      }
      else{
        return `${value} min`
      }
     }

     backToActivities(){
      this.navCtrl.navigateBack('/tabs/atividades');
      
    }

}
