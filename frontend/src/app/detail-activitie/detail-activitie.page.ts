import { activitie, Tag } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { activityDetails } from '../models/types/user.types';
import allActivities from '../mocks/activities.json'

@Component({
  selector: 'app-detail-activitie',
  templateUrl: './detail-activitie.page.html',
  styleUrls: ['./detail-activitie.page.scss'],
  standalone:false
})
export class DetailActivitiePage implements OnInit {
genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'
  image:String = '';
  tag:String = '';
  title:String = ''
  desc:String = ''

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tag = params['tag']; 
      this.image = params['img']
      this.title = params['info'].title
      this.desc = params['info'].desc
      this.filteredActivities= this.activities.filter(activity => activity.tags.includes(this.tag as Tag))

      console.log(this.activities)
    });
  }

  activities:activityDetails[] = allActivities as activityDetails[]

  filteredActivities: activityDetails[] =[]

  constructor(private navCtrl: NavController,private route: ActivatedRoute) {}

  openActivityPage(title: string, icon:String) {
    this.navCtrl.navigateForward('/tabs/atividades/detailActivitie/activitie-content', {
      queryParams: { 
        title: title,
        icon: icon
       },
    });
  }

  backToActivities(){
    this.navCtrl.navigateBack('/tabs/atividades');
  }

  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }

}
