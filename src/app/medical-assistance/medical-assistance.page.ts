import { Assistance } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import testAssistances from '../mocks/testAssistancesToGetAll.json';
import { ModalController } from '@ionic/angular';
import { DetailsAssistanceComponent } from '../components/detail-assistance/detail-assistance.component';

@Component({
  selector: 'app-medical-assistance',
  templateUrl: './medical-assistance.page.html',
  styleUrls: ['./medical-assistance.page.scss'],
  standalone:false
})
export class MedicalAssistancePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  searchInput = ''
  allAssistances: Assistance[] = testAssistances;
  

  filteredAssistances: Assistance[] = [...this.allAssistances];

  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  searchAssistances(query: string): Assistance[] {
    const lowerQuery = query.toLowerCase().trim();
  
    return this.allAssistances.filter(assistance => {
      const nameMatch = assistance.name.toLowerCase().includes(lowerQuery);
      const serviceMatch = assistance.services.some(service =>
        service.toLowerCase().includes(lowerQuery)
      );
      return nameMatch || serviceMatch;
    });
  }

  onSearch(event: any) {
    const query = event.detail.value;
    this.filteredAssistances = this.searchAssistances(query);
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.genericImage;
  }

  async openModal(assistance: Assistance) {
    const modal = await this.modalController.create({
      component: DetailsAssistanceComponent,
      componentProps: { assistance }
    });
    await modal.present();
  }
}





