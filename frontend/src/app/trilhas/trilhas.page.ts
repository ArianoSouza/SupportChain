import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TrilhaService } from '../services/trilhasService/trilhas.service';
import { Trilha } from '../models/types/user.types';



@Component({
  selector: 'app-trilhas',
  templateUrl: './trilhas.page.html',
  styleUrls: ['./trilhas.page.scss'],
  standalone:false
})
export class TrilhasPage implements OnInit {

  allTrilhas: Trilha[] = []; // Guarda todas as trilhas, sem filtro
  searchTerm: string = ''; // Variável para o termo de pesquisa
  trilhas: Trilha[] = [];
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null; // Para exibir mensagens de erro ao usuário

  constructor( private trilhaService: TrilhaService,
    private LoadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    this.loadTrilhas();
  }

 
  async loadTrilhas() {
    this.errorMessage = null; // Limpa mensagens de erro anteriores
    this.loading = await this.LoadingController.create({
      message: 'Carregando trilhas...',
    });
    await this.loading.present();

    this.trilhaService.getAllTrilhas().subscribe({
      next: (response: Trilha[]) => { // Use GetAllTrilhasApiResponse aqui
        this.allTrilhas = response; // Popula todas as trilhas
        this.trilhas = [...this.allTrilhas]; // Inicializa as trilhas exibidas com todas elas
        this.loading?.dismiss();
        console.log('Trilhas carregadas:', this.trilhas);
      },
      error: async (err: Error) => { // A 'err' aqui será o Error lançado pelo service
        this.loading?.dismiss();
        console.error('Erro ao carregar trilhas no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar trilhas.';
        
        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  // Opcional: Para pull-to-refresh
  handleRefresh(event: any) {
    this.loadTrilhas().finally(() => {
      event.target.complete(); // Finaliza o evento de refresh
    });
  }

   // Função de filtragem
   onSearchChange(event: any) {
    this.searchTerm = event.detail.value.toLowerCase(); // Pega o termo de pesquisa e normaliza

    if (this.searchTerm.trim() === '') {
      this.trilhas = [...this.allTrilhas]; // Se o termo estiver vazio, exibe todas as trilhas
    } else {
      this.trilhas = this.allTrilhas.filter(trilha =>
        trilha.title.toLowerCase().includes(this.searchTerm) // Filtra pelo título da trilha
      );
    }
  }




goToModulos(trilhaId:string){
  
  this.navCtrl.navigateForward(['/modulos', trilhaId]);
}
}
