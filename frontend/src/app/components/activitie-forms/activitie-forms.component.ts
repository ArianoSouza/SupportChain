import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController, NavController } from '@ionic/angular';
import allQuestions from '../../mocks/questions.json'
import { GetQuestionaryByActivitieIdApiResponse, question, Questionary, questionFull } from 'src/app/models/types/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionaryService } from 'src/app/services/questionaryService/questionary.service';


@Component({
  selector: 'app-activitie-forms',
  templateUrl: './activitie-forms.component.html',
  styleUrls: ['./activitie-forms.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
]
})
export class ActivitieFormsComponent implements OnInit {
  activitieId: string | null = null;
  questionary: Questionary | null = null;
  hasAnswered: boolean = false;
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;

   @Input() id!: string;
  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  // Para gerenciar a seleção de respostas (se o usuário for responder)
  selectedAnswers: (number | null)[] = []; // Para guardar o índice da opção selecionada para cada pergunta

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionaryService: QuestionaryService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private navCtrl:NavController,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
  

    if (this.id) {
      this.loadQuestionary(this.id);
    } else {
      this.presentAlert('Erro', 'ID da atividade é obrigatório para buscar o questionário.');
      this.router.navigateByUrl('/activities'); // Redireciona
    }
  }

  async loadQuestionary(activitieId: string) {
    this.errorMessage = null;
    this.loading = await this.loadingController.create({
      message: 'Carregando questionário...',
    });
    await this.loading.present();

    this.questionaryService.getQuestionaryByActivitieId(activitieId).subscribe({
      next: (response: GetQuestionaryByActivitieIdApiResponse) => {
        this.questionary = response.questionary;
        this.hasAnswered = response.hasAnswered;
        // Inicializa o array de respostas selecionadas
        if (this.questionary) {
          this.selectedAnswers = new Array(this.questionary.questions.length).fill(null);
        }
        this.loading?.dismiss();
        console.log(`Questionário para a atividade '${activitieId}' carregado:`, this.questionary);
        console.log('Usuário já respondeu:', this.hasAnswered);
      },
      error: async (err: Error) => {
        this.loading?.dismiss();
        console.error('Erro ao carregar questionário no componente:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao carregar questionário.';

        const alert = await this.alertController.create({
          header: 'Erro',
          message: this.errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        // Opcional: Redirecionar se o erro for fatal ou de autenticação
        // this.router.navigateByUrl('/login');
      }
    });
  }

  // Lógica para selecionar uma resposta (ex: usando ion-radio ou ion-segment)
  onAnswerSelected(questionIndex: number, optionIndex: number) {
    this.selectedAnswers[questionIndex] = optionIndex;
    console.log(`Pergunta ${questionIndex}: Selecionada opção ${optionIndex}`);
  }

  // Lógica para submeter as respostas
  async submitAnswers() {
    // 1. Validação: verificar se todas as perguntas foram respondidas
    if (!this.questionary) {
      this.presentAlert('Erro', 'Questionário não carregado.');
      return;
    }
    if (this.selectedAnswers.includes(null)) {
      this.presentAlert('Atenção', 'Por favor, responda a todas as perguntas antes de enviar.');
      return;
    }

    // 2. Preparar as respostas no formato string[] para a API
    const answersToSend: string[] = [];
    for (let i = 0; i < this.questionary.questions.length; i++) {
        const selectedOptionIndex = this.selectedAnswers[i] as number;
        // Pega o texto da opção selecionada usando o índice
        if (this.questionary.options && this.questionary.options[i] && this.questionary.options[i][selectedOptionIndex]) {
            answersToSend.push(this.questionary.options[i][selectedOptionIndex]);
        } else {
            // Caso algo dê errado (opção não encontrada), adicione um placeholder ou lance um erro
            answersToSend.push(`Opção inválida para Pergunta ${i}`);
        }
    }

    const loader = await this.loadingController.create({
      message: 'Enviando respostas...',
    });
    await loader.present();

    // 3. Chamar o serviço PostNewUserAnswers
    this.questionaryService.postUserAnswers(this.questionary.id, answersToSend).subscribe({
      next: (response) => {
        loader.dismiss();
        this.presentAlert('Sucesso', response.message);
        this.hasAnswered = true; // Atualiza o estado para indicar que o usuário respondeu
      },
      error: async (err: Error) => {
        loader.dismiss();
        console.error('Erro ao enviar respostas:', err);
        const alert = await this.alertController.create({
          header: 'Erro',
          message: err.message || 'Falha ao enviar respostas.',
          buttons: ['OK'],
        });
        await alert.present();
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
    if (this.activitieId) {
      this.loadQuestionary(this.activitieId).finally(() => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/atividades')
    this.modalCtrl.dismiss();
  }

  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }

}
