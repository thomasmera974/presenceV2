import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';


import { FormateurComponent } from './formateur/formateur.component';
import { AdminComponent } from './admin/admin.component';
import { NavComponent } from './nav/nav.component';
import { StagiaireModule } from './stagiaire/stagiaire.module';


@NgModule({
  declarations: [
    AppComponent,

    FormateurComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,

    StagiaireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
