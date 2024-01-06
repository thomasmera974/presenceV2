import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StagiaireComponent } from './stagiaire/stagiaire.component';
import { FormateurComponent } from './formateur/formateur.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [

  { path : 'stagiaire', component : StagiaireComponent },
  { path : 'formateur', component : FormateurComponent },
  { path : 'admin', component : AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
