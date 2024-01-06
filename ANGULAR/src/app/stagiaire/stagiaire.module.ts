import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagiaireComponent } from './stagiaire.component';

import { NavComponent } from '../nav/nav.component';
import { FicheComponent } from './section/fiche/fiche.component';




@NgModule({
  declarations: [
    StagiaireComponent,
    
    NavComponent,
    FicheComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap : [StagiaireComponent]
})
export class StagiaireModule { }
