import { VideoInfo, Tag } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import allVideos from '../mocks/videos.json'
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { VideoService } from '../services/videoservice/video.service';

@Component({
  selector: 'app-app-videos',
  templateUrl: './app-videos.page.html',
  styleUrls: ['./app-videos.page.scss'],
  standalone: false
})
export class AppVideosPage implements OnInit {

  constructor(
    private navCtrl:NavController,
    private videoService:VideoService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  videos:VideoInfo[] = []

  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  ngOnInit(): void {
    this.videoService.getSuggestedVideos().subscribe({
      next: (response:any) => {
        this.videos = response.videos;
        console.log('Fetched videos:', this.videos);
      },
      error: (error:any) => {
        console.error('Error fetching uploads:', error);
        // Handle error appropriately
      },
    });
  }


  async onVideoClick(video: VideoInfo,title:string) {
    console.log('Vídeo clicado:', video.title);
    console.log('Tags do vídeo:', video.tags);

    if (video.tags && video.tags.length > 0) {
      const loader = await this.loadingController.create({
        message: 'Adicionando tags de interesse...',
        duration: 1500 // Duração curta para um feedback rápido, ou remova para controlar manualmente
      });
      await loader.present();

      this.videoService.addVideoTags(video.tags).subscribe({
        next: (response) => {
          loader.dismiss(); // Garante que o loader seja fechado
          console.log('Tags adicionadas com sucesso:', response.updatedTags);
          // Opcional: Mostrar um toast ou uma mensagem de sucesso discreta
          // this.presentToast('Tags de interesse atualizadas!', 'success');
        },
        error: async (err: Error) => {
          loader.dismiss(); // Garante que o loader seja fechado
          console.error('Erro ao adicionar tags do vídeo:', err);
          // Opcional: Mostrar um alerta ou mensagem de erro
          this.presentAlert('Erro ao Adicionar Tags', err.message || 'Falha ao atualizar tags de interesse.');
        }
      });
      this.navCtrl.navigateForward('/full-video',
        {
          queryParams:{
            id:title
          }
        }
      )
    } else {
      console.log('Vídeo não possui tags para adicionar.');
      // Opcional: Feedback ao usuário se o vídeo não tiver tags
    }

    // Opcional: Aqui você pode adicionar lógica para abrir o player de vídeo ou navegar para detalhes
    // Ex: this.router.navigate(['/video-player', video.id]);
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }


  

}
