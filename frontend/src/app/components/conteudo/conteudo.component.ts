import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { OutOfServiceComponent } from '../out-of-service/out-of-service.component';

@Component({
  selector: 'app-conteudo',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutOfServiceComponent
  ],
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent  implements OnInit {

  constructor(private modalcontroler:ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalcontroler.dismiss();
  }
}
