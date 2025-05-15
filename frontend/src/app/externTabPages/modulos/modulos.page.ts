import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import moduloMock from '../../mocks/modulos.json'
import { ActivatedRoute, Router } from '@angular/router';
import {TrilhaModulo} from '../../models/types/user.types'
import { ConteudoComponent } from 'src/app/components/conteudo/conteudo.component';
import { animate, animateChild, animation } from '@angular/animations';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.page.html',
  styleUrls: ['./modulos.page.scss'],
  standalone: false
})
export class ModulosPage implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private modalContoller:ModalController, private navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.allmodules.length)
  }
  number = 0
  trilhaId = this.route.snapshot.queryParamMap.get('id')
  allmodules:TrilhaModulo[] = moduloMock.filter(modulo=>modulo.id.toString()== this.trilhaId as String) 


  minus(){
    if (this.number<=0){
      console.log('cannot')
    }else{
      console.log(this.number)
      this.number-=1
    }
  }
  plus(){
    if (this.number>=this.allmodules.length-1){
      console.log('cannot')
    }else{
      console.log(this.number)
      this.number+=1
    }
  }

  defineMinusColor(){
    if (this.number = 0){
      return  {
        color: "grey"    
      }
  }
    else{
      return {}
    }
  }

  async openModal(id: number) {
      const modal = await this.modalContoller.create({
        component: ConteudoComponent,
        componentProps: { id }
      });
      await modal.present();
    }
 
    goBack(){
      this.navCtrl.navigateForward('/tabs/trilhas', {
        animated: true,
        animationDirection: 'back'
      }
    )
    }
}
