import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-out-of-service',
  imports: [
    CommonModule,
    IonicModule, 
  ],
  templateUrl: './out-of-service.component.html',
  styleUrls: ['./out-of-service.component.scss'],
})
export class OutOfServiceComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
