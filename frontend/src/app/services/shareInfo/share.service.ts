import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userData, userNotes } from 'src/app/models/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private mensagemSource = new BehaviorSubject<userNotes[]>([]);
  private typeNote = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<userData | undefined>(undefined);

  mensagemAtual = this.mensagemSource.asObservable();
  tipoAtual = this.typeNote.asObservable()
  userAtual = this.user.asObservable()

  adicionarNota(nova: userNotes) {
    const atual = this.mensagemSource.getValue();
    this.mensagemSource.next([...atual, nova]);
  }
  mudarValorDeTipo(nova:string){
    this.typeNote.next(nova)
  }
  cadastro(nova:userData){
    this.user.next(nova)
  }

}