import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './notes.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './notes-routing.module';
import { NewNoteComponent } from "../components/new-note/new-note.component";
import { ShareService } from '../services/shareInfo/share.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NewNoteComponent
],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
