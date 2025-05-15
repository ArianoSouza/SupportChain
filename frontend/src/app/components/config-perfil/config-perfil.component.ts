import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonContent, IonLabel, IonBackButton, IonList, IonItem, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.component.html',
  styleUrls: ['./config-perfil.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
]
})
export class ConfigPerfilComponent  implements OnInit {

  perfilForm!: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    this.perfilForm = this.fb.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", Validators.required],
      sexo: ["", Validators.required],
      estadocivil: ["", Validators.required],
      datadenascimento: ["", Validators.required],
      telefone: [""],
      cidade: ["", Validators.required],
      bairro: [""],
      estado: ["", Validators.required],

    })
  }

  salvar() {
    if (this.perfilForm.valid) {
      console.log("Dados salvos", this.perfilForm.value);
      this.modalCtrl.dismiss(this.perfilForm.value);
    }
    else {
      console.log("Formulário inválido");
    }
  }

    closemodal(){
    this.modalCtrl.dismiss();
  }

}
