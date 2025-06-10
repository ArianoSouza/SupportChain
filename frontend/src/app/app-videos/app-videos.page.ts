import { VideoInfo, Tag } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import allVideos from '../mocks/videos.json'
import { NavController } from '@ionic/angular';
import { VideoService } from '../services/videoservice/video.service';

@Component({
  selector: 'app-app-videos',
  templateUrl: './app-videos.page.html',
  styleUrls: ['./app-videos.page.scss'],
  standalone: false
})
export class AppVideosPage implements OnInit {

  constructor(private navCtrl:NavController, private videoService:VideoService) { }

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

  goToFullVideo(title:string){
    this.navCtrl.navigateForward('/full-video',
      {
        queryParams:{
          id:title
        }
      }
    )
  }
  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }


  

}
