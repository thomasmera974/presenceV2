import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { StagiaireComponent } from './stagiaire/stagiaire.component';
import { FormateurComponent } from './formateur/formateur.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,

    StagiaireComponent,
    FormateurComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
