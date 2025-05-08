import { Component, OnInit } from '@angular/core';
import { userNotes } from '../models/types/user.types';
import { ModalController } from '@ionic/angular';
import { NewNoteComponent } from '../components/new-note/new-note.component';
@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  ngOnInit(): void {
    console.log(new Date().toLocaleString())
  }
  constructor( private modalController: ModalController) {}

  allNotes: userNotes[] = [
    {
      content:'Hoje percebi que meu filho estava mais quieto e irritado que o normal, sempre no quarto com o celular, e isso me preocupou. Em vez de brigar ou tirar o aparelho, resolvi conversar com calma. No começo ele resistiu, mas depois acabou contando que teve um desentendimento com uma colega na escola e ficou muito chateado com a situação. Disse que se sentiu excluído e até pensou em faltar às aulas. Fiquei triste por ele estar guardando tudo sozinho, mas feliz por ter conseguido criar um momento de escuta verdadeira. Essa conversa me fez entender que, muitas vezes, por trás do uso excessivo da internet, existem sentimentos mal resolvidos que eles não sabem expressar.',
      noteType:'note',
      noteDate: '05/05/2025, 14:14:09'
    },
    {
      title:'Não sei oq está acontecendo',
      content:'Hoje percebi que meu filho estava mais quieto e irritado que o normal, sempre no quarto com o celular, e isso me preocupou. Em vez de brigar ou tirar o aparelho, resolvi conversar com calma. No começo ele resistiu, mas depois acabou contando que teve um desentendimento com uma colega na escola e ficou muito chateado com a situação. Disse que se sentiu excluído e até pensou em faltar às aulas. Fiquei triste por ele estar guardando tudo sozinho, mas feliz por ter conseguido criar um momento de escuta verdadeira. Essa conversa me fez entender que, muitas vezes, por trás do uso excessivo da internet, existem sentimentos mal resolvidos que eles não sabem expressar.',
      noteType:'diary',
      noteDate: new Date().toISOString()
    }
    ,
    {
      title:'Não sei oq está acontecendo',
      content:'Hoje percebi que meu filho estava mais quieto e irritado que o normal, sempre no quarto com o celular, e isso me preocupou. Em vez de brigar ou tirar o aparelho, resolvi conversar com calma. No começo ele resistiu, mas depois acabou contando que teve um desentendimento com uma colega na escola e ficou muito chateado com a situação. Disse que se sentiu excluído e até pensou em faltar às aulas. Fiquei triste por ele estar guardando tudo sozinho, mas feliz por ter conseguido criar um momento de escuta verdadeira. Essa conversa me fez entender que, muitas vezes, por trás do uso excessivo da internet, existem sentimentos mal resolvidos que eles não sabem expressar.',
      noteType:'diary',
      noteDate: "03/05/2025, 14:14:09"
    },
    {
      title:'Não sei oq está acontecendo',
      content:'Hoje percebi que meu filho estava mais quieto e irritado que o normal, sempre no quarto com o celular, e isso me preocupou. Em vez de brigar ou tirar o aparelho, resolvi conversar com calma. No começo ele resistiu, mas depois acabou contando que teve um desentendimento com uma colega na escola e ficou muito chateado com a situação. Disse que se sentiu excluído e até pensou em faltar às aulas. Fiquei triste por ele estar guardando tudo sozinho, mas feliz por ter conseguido criar um momento de escuta verdadeira. Essa conversa me fez entender que, muitas vezes, por trás do uso excessivo da internet, existem sentimentos mal resolvidos que eles não sabem expressar.',
      noteType:'diary',
      noteDate: "03/30/2025, 14:14:09"
    },
    {
      title:'Não sei oq está acontecendo',
      content:'Hoje percebi que meu filho estava mais quieto e irritado que o normal, sempre no quarto com o celular, e isso me preocupou. Em vez de brigar ou tirar o aparelho, resolvi conversar com calma. No começo ele resistiu, mas depois acabou contando que teve um desentendimento com uma colega na escola e ficou muito chateado com a situação. Disse que se sentiu excluído e até pensou em faltar às aulas. Fiquei triste por ele estar guardando tudo sozinho, mas feliz por ter conseguido criar um momento de escuta verdadeira. Essa conversa me fez entender que, muitas vezes, por trás do uso excessivo da internet, existem sentimentos mal resolvidos que eles não sabem expressar.',
      noteType:'diary',
      noteDate: "03/30/2025, 17:14:09"
    }
  ]

  newNoteType:String = "note"

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

  public typeNote:String = "sei lá man kkkkk" 

  changeTypeNotes = ()=>{
    this.typeNote= "teste"
    console.log(this.typeNote)
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: NewNoteComponent
    });
  
    await modal.present();
  }

  sortByDateAllNotes = this.sortNotesByDateDesc(this.allNotes)

}
