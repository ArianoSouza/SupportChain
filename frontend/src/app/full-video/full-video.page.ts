import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import allVideos from '../mocks/videos.json'
import { VideoDetails } from '../models/types/user.types';

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

  actualVideo:VideoDetails[] = []

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
      this.title = params['title']; 
      this.actualVideo = allVideos.filter(video=> video.title.toLocaleLowerCase()===this.title.toLocaleLowerCase()) as VideoDetails[]
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
      this.actualVideo[0].likes+=1
    }
    this.isLiked = true
  }

}
