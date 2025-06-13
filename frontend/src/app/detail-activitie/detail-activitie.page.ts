import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para obter a tag da URL
import { ActivityService } from '../services/activitieService/activities.service';
import { Activity } from '../models/types/user.types'
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-activitie',
  templateUrl: './detail-activitie.page.html',
  styleUrls: ['./detail-activitie.page.scss'],
  standalone:false
})
export class DetailActivitiePage implements OnInit {
  categoryTag: string | null = null;
  activities: Activity[] = [];
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;
  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'
  image:String = '';
  tag:String = '';
  title:String = ''
  desc:String = ''

  constructor(
    private activatedRoute: ActivatedRoute, // Para ler a tag da rota
    private activityService: ActivityService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    // Obtém a tag da categoria da URL (ex: /activities/:tag)
    // Configure sua rota em app-routing.module.ts como: { path: 'activities/:tag', component: ActivitiesPage }
    this.categoryTag = this.activatedRoute.snapshot.paramMap.get('tag');

    if (this.categoryTag) {
      this.loadActivities(this.categoryTag);
    } else {
      this.presentAlert('Erro', 'Tag da categoria não fornecida na URL para buscar atividades.');
      this.router.navigateByUrl('/home'); // Redireciona para uma página inicial ou de categorias
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.tag = params['tag']; 
      this.image = params['img']
      this.title = params['title']
      this.desc = params['desc']
    });
  }

  async loadActivities(tag: string) {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando atividades...',
    });
    await this.loading.present();

    this.activityService.getActivitiesByTag(tag).subscribe({
      next: (activitiesResponse: Activity[]) => { // Espera Activity[] diretamente do serviço
        this.activities = activitiesResponse;
        this.loading?.dismiss();
        console.log(`Atividades para a categoria '${tag}' carregadas:`, this.activities);
      },
      error: async (err: Error) => {
        this.loading?.dismiss();
        console.error('Erro ao carregar atividades no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar atividades.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar se o erro for fatal (ex: tag não encontrada)
        // this.router.navigateByUrl('/home');
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
    if (this.categoryTag) {
      this.loadActivities(this.categoryTag).finally(() => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }

  backToActivities(){
    this.navCtrl.navigateBack('/tabs/atividades');
  }

  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }

  goToActivitieDetail(id:string){
    this.navCtrl.navigateForward(['/activitie-content', id]);
  }

}
