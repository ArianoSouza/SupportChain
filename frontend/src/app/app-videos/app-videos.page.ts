import { VideoDetails } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import allVideos from '../mocks/videos.json'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-app-videos',
  templateUrl: './app-videos.page.html',
  styleUrls: ['./app-videos.page.scss'],
  standalone: false
})
export class AppVideosPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  videos:VideoDetails[] = allVideos as VideoDetails[]
  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'


  ngOnInit() {
  }

  goToFullVideo(title:string){
    this.navCtrl.navigateForward('/full-video',
      {
        queryParams:{
          title:title
        }
      }
    )
  }
  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }
}
