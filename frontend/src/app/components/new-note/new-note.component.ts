import { CommonModule } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule, ModalController } from '@ionic/angular';
import { userNotes } from 'src/app/models/types/user.types';
import { Tab2Page } from 'src/app/notes/notes.page';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ShareService } from 'src/app/services/shareInfo/share.service';



@Component({
  selector: 'app-new-note',
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // ✅ isso inclui IonContent, IonCard, IonButton, etc.
  ],
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent  implements OnInit {

  constructor(private modalController: ModalController, private share:ShareService) { }

  newNote:userNotes = {
    title:"",
    content:"",
    noteDate: new Date().toLocaleString(),
    noteType: "note"
   }
//AQUI
 ngOnInit() {
  this.share.tipoAtual.subscribe(dados => {
    console.log(dados)
    this.newNote.noteType = dados
    console.log(this.newNote.noteType)
  });
 }
 


closeModal() {
  this.modalController.dismiss();
}

 formatToMySQLDate = (dateStr:string):String => {
  const date = new Date(dateStr);

  // Se a data não for válida
  if (isNaN(date.getTime())) {
    throw new Error("Data inválida");
  }

  // Monta o formato YYYY-MM-DD HH:MM:SS
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

sendDataTest = ()=>{
  this.newNote.noteDate = this.formatToMySQLDate(this.newNote.noteDate.toString())
  this.share.adicionarNota(this.newNote);
  this.closeModal()
}
}
