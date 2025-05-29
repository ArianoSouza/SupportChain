import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import allVideos from '../mocks/videos.json'
import { VideoInfo } from '../models/types/user.types';


@Component({
  selector: 'app-full-video',
  templateUrl: './full-video.page.html',
  styleUrls: ['./full-video.page.scss'],
  standalone:false
})
export class FullVideoPage implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  ngAfterViewInit() {
    console.log('Video Player carregado:', this.videoPlayer);
  }

  isLiked:boolean = false

  showAll:boolean = false

  title:string = ''

  actualVideo:VideoInfo[] = []

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
  constructor(private navctrl:NavController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cache = localStorage.getItem('uploadsCache')
      this.title = params['title']; 
      console.log(cache)
    }
  )

  console.log(this.actualVideo)
  
  }

  backToVideos(){
    this.navctrl.navigateBack('/tabs/app-videos');
  }

  toggleShowAll(){
    this.showAll = !this.showAll
  }

  like(){
    if(this.isLiked == false){
    
    }
    this.isLiked = true
  }

}
