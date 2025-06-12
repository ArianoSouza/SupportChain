import { Component, OnInit } from '@angular/core';
import {  activitie, ActivityCategory, Tag } from '../models/types/user.types';
import { NavController } from '@ionic/angular';
import { query } from '@angular/animations';
import dataAtvCategories from '../mocks/activitiesCategories.json'

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
  standalone: false
})
export class AtividadesPage implements OnInit {

  selectedTag:string | null = null
  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'
 tags: Tag[] = [
    "desintoxicação digital",
    "conexão social",
    "relaxamento",
    "saúde mental",
    "positividade",
    "auto-reflexão",
    "atividade física",
    "bem-estar",
    "autocontrole",
    "culinária"
  ];

  allactivities: ActivityCategory[] = dataAtvCategories as ActivityCategory[]
  orderActivities:ActivityCategory[] = this.allactivities.sort((a,b)=>a.title.localeCompare(b.title))
  filteredActivities: ActivityCategory[] = this.orderActivities

  constructor( private navCtrl:NavController) {}
  ngOnInit(): void {}

  clearFilter(){
    this.filteredActivities = this.orderActivities
    this.selectedTag = null
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filteredActivities = this.allactivities.filter(activitie => activitie.title.toLocaleLowerCase() === target.value.toLocaleLowerCase())
  }

  goToActivitieDetail(tag: string, img:String, title:String, desc:String){
    this.navCtrl.navigateForward(['/tabs/atividades/detailActivitie',tag],
      {
        queryParams:{
          tag: tag,
          img:img,
          info:{
            title:title,
            desc:desc
          }
      }
    }
    )
  }

  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }

}
