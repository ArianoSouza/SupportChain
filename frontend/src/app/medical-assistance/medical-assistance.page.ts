import { Assistance, GetAllAssistancesApiResponse, UserAddress } from './../models/types/user.types';
import { Component, OnInit } from '@angular/core';
import testAssistances from '../mocks/testAssistancesToGetAll.json';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetailsAssistanceComponent } from '../components/detail-assistance/detail-assistance.component';
import { AssistanceService } from '../services/assistancesService/assistances.service';



@Component({
  selector: 'app-medical-assistance',
  templateUrl: './medical-assistance.page.html',
  styleUrls: ['./medical-assistance.page.scss'],
  standalone:false
})
export class MedicalAssistancePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private assistanceService: AssistanceService,
    private loadingController: LoadingController,
    private alertController: AlertController

  ) { }

  ngOnInit() {
    this.loadAssistances()
  }

  searchInput = ''
  assistances: Assistance[] = [];
  userAddress: UserAddress | null = null;
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;
  pageMessage: string | null = null; // Mensagem principal da página
  searchTerm: string = ''; // Para a barra de pesquisa

  filteredAssistances: Assistance[] = []

  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  
  
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value.trim(); // Pega o termo de pesquisa e normaliza
    console.log(this.searchTerm)

    if (this.searchTerm === '' || null ) {
      this.filteredAssistances = [...this.assistances]; // Se o termo estiver vazio, exibe todas as assistências
    } else {
      this.filteredAssistances = this.assistances.filter(assistance => {
        const nameMatch = assistance.name.includes(this.searchTerm);
        // ADAPTAÇÃO AQUI: Se specialities é uma única string
        const specialitiesMatch = (assistance.specialities || '').includes(this.searchTerm);
        
        // Se specialities pudesse ser um array e você o quisesse como array no Type, seria:
        // const specialitiesMatch = Array.isArray(assistance.specialities) &&
        //   assistance.specialities.some(s => s.toLowerCase().includes(this.searchTerm));

        return nameMatch || specialitiesMatch;
      });
    }
  }
  // --- FIM DA ADAPTAÇÃO ---


  async loadAssistances() {
    this.errorMessage = null;
    this.pageMessage = null; // Limpa mensagens anteriores
    this.loading = await this.loadingController.create({
      message: 'Carregando serviços de assistência...',
    });
    await this.loading.present();

    this.assistanceService.getAllAssistancesFromUserAddress().subscribe({
      next: (response: GetAllAssistancesApiResponse) => {
        this.assistances = response.assistances;
        this.userAddress = response.userAddress;
        this.pageMessage = response.message;
        this.filteredAssistances = response.assistances
        this.loading?.dismiss();
        console.log('Serviços de assistência carregados:', this.assistances);
      },
      error: async (err: Error) => { // 'err' será o Error lançado pelo service
        this.loading?.dismiss();
        console.error('Erro ao carregar assistências no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar serviços de assistência.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar em caso de erro fatal (ex: usuário não logado)
        // this.router.navigateByUrl('/login');
      }
    });

  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Opcional: Para pull-to-refresh
  handleRefresh(event: any) {
    this.loadAssistances().finally(() => {
      event.target.complete();
    });
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





