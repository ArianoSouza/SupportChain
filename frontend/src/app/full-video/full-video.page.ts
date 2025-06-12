import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import allVideos from '../mocks/videos.json'
import { Video, VideoInfo } from '../models/types/user.types';
import { VideoService } from '../services/videoservice/video.service';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';


@Component({
  selector: 'app-full-video',
  templateUrl: './full-video.page.html',
  styleUrls: ['./full-video.page.scss'],
  standalone:false
})
export class FullVideoPage implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

 

  isLiked:boolean = false

  showAll:boolean = false

  videoId: string | null = null;
  video: Video| null = null;

  toggleVideo() {
    const video = document.getElementById('videoPlayer') as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    } else {
      console.error('Elemento de vídeo não encontrado!');
    }
  }
  constructor(
    private navctrl:NavController,
    private route: ActivatedRoute, 
    private videoService:VideoService,
    private toastControler:ToastController,
    private loadingController: LoadingController,
    private alertContoler:AlertController
  ) { }

  ngOnInit() {
    // Obtém o ID do vídeo da URL (ex: /video-detail/SEU_ID_DO_VIDEO)
    this.videoId = this.route.snapshot.queryParamMap.get('id');
    if (this.videoId) {
      this.loadVideoDetails(this.videoId);
    } else {
      this.navctrl.navigateBack('/tabs/app-videos'); // Redireciona para a página inicial ou anterior
    }
  }


  async loadVideoDetails(id: string) {

    this.videoService.getVideoById(id).subscribe({
      next: (data) => {
        this.video = data;
        console.log('Detalhes do vídeo:', this.video);
      },
      error: async (err: HttpErrorResponse) => {
        console.error('Erro ao carregar detalhes do vídeo:', err);

        let errorMessage = 'Ocorreu um erro ao carregar os detalhes do vídeo.';
        if (err.status === 404) {
          errorMessage = 'Vídeo não encontrado.';
        } else if (err.status === 401 || err.status === 403) {
          errorMessage = 'Sessão expirada ou não autorizada. Por favor, faça login novamente.';
          // Opcional: Redirecionar para a página de login
          // this.router.navigateByUrl('/login');
        } else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }


        this.navctrl.navigateBack('/tabs/app-videos'); // Redireciona após erro
      }
    });
  }
  
  backToVideos(){
    this.navctrl.navigateBack('/tabs/app-videos');
  }

  toggleShowAll(){
    this.showAll = !this.showAll
  }

  async onLikeVideo(videoId: string | null) {
    const loader = await this.loadingController.create({
      message: 'Curtindo vídeo...',
    });
    await loader.present();

    this.videoService.addLikeToVideo(videoId).subscribe({
      next: (response) => {
        loader.dismiss();
        console.log('Like adicionado/verificado:', response);
        this.presentToast(response.message, 'success');
      },
      error: async (err: Error) => {
        loader.dismiss();
        console.error('Erro ao curtir vídeo:', err);
        this.presentAlert('Erro ao Curtir Vídeo', err.message || 'Falha ao curtir vídeo.');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertContoler.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastControler.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}


