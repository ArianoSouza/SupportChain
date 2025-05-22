import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import allQuestions from '../../mocks/questions.json'
import { question, questionFull } from 'src/app/models/types/user.types';


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

  constructor(private navCtrl: NavController, private modalCtrl:ModalController){}
  @Input() title!: string;
  genericImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s'

  ngOnInit(): void {
    if (allQuestions) {
      this.questions = allQuestions.filter(question => 
        question.id_atividade.toLocaleLowerCase() === this.title.toLocaleLowerCase()
      ) as questionFull[];
    } else {
      console.warn("allQuestions não está definido!");
    }
    
    console.log("Título recebido:", this.title);
  }

  questions:questionFull[] = []


  answers: string[] = [];

  submitAnswers() {
    console.log(this.answers);
    this.navCtrl.navigateBack('/tabs/atividades')
    this.modalCtrl.dismiss();
    // aqui vai ficar a logica de enviar as respostas
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/atividades')
    this.modalCtrl.dismiss();
  }

  onclick(){
    console.log(this.answers)
  }

  onImgError(event:Event){
    const evento = event.target as HTMLImageElement 

    evento.src = this.genericImage; // Caminho da imagem substituta
  }

}
