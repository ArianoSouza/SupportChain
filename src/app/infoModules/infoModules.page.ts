import { Component } from '@angular/core';

@Component({
  selector: 'app-infoModules',
  templateUrl: 'infoModules.page.html',
  styleUrls: ['infoModules.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor() {}

  abrirTopico(topico: number) {
    console.log('Abrindo tópico:', topico);
    // Aqui você pode navegar para uma nova página ou abrir um modal, etc.
  }
}
