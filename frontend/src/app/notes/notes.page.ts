import { Component, OnInit } from '@angular/core';
import { userNotes } from '../models/types/user.types';
import { ModalController } from '@ionic/angular';
import { NewNoteComponent } from '../components/new-note/new-note.component';
import { ShareService } from '../services/shareInfo/share.service';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  ngOnInit(): void {
    this.share.mensagemAtual.subscribe(dados => {
      console.log(dados)
      this.allNotes = dados
      console.log(this.allNotes)
    });
  }
  constructor( private modalController: ModalController , private share: ShareService, ) {}

  allNotes: userNotes[]= []


  formatIsoDateToEn = (dateIso: String): String => {
    const date = new Date(dateIso.toString());
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }

  sortNotesByDateDesc = (notes: userNotes[]): userNotes[] => {
    return notes.sort((a, b) => {
      return new Date(b.noteDate as string).getTime() - new Date(a.noteDate as string).getTime();
    });
    
  }


  async abrirModal(event:Event) {
    const elementId = (event.currentTarget as HTMLElement).id.toString();
    const modal = await this.modalController.create({
      component: NewNoteComponent
    });
    this.changeTypeById(elementId)
    await modal.present();
  }

  changeTypeById (id:string){
    this.share.mudarValorDeTipo(id);
  }

  sortByDateAllNotes = this.sortNotesByDateDesc(this.allNotes)

}
