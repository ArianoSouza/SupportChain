import { activitie } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ActivitieFormsComponent } from '../components/activitie-forms/activitie-forms.component';
import allActivities from '../mocks/activities.json'
import { activityDetails } from '../models/types/user.types';

@Component({
  selector: 'app-activitie-content',
  templateUrl: './activitie-content.page.html',
  styleUrls: ['./activitie-content.page.scss'],
  standalone:false
})
export class ActivitieContentPage implements OnInit {

  constructor( private route:ActivatedRoute, private modalCtrl:ModalController, private navCtrl:NavController) { }

  title:String =''
  icon:String =''

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title']; 
      this.icon = params['icon']
    });

    this.allActivitie = allActivities.filter(atvDetail=> atvDetail.title.toLocaleLowerCase() === this.title.toLocaleLowerCase()) as activityDetails[]
    console.log(this.title.toLocaleLowerCase())
    console.log(this.allActivitie)
  }

  allActivitie:activityDetails[] = []


 async openModal() {
       const modal = await this.modalCtrl.create({
         component: ActivitieFormsComponent,
         componentProps: { title:this.title }
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
