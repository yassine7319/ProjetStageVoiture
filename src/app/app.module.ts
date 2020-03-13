import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './material.module';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjoutVoitureComponent } from './voitures/ajout-voiture/ajout-voiture.component';
import { ModifvoituresComponent } from './voitures/modifvoitures/modifvoitures.component';
import { VoituresListComponent } from './voitures/voitures-list/voitures-list.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AjoutBatterieComponent } from './batteries/ajout-batterie/ajout-batterie.component';
import { BatteriesListComponent } from './batteries/batteries-list/batteries-list.component';
import { ModifBatterieComponent } from './batteries/modif-batterie/modif-batterie.component';
import { VoitureDetailComponent } from './voitures/voiture-detail/voiture-detail.component';
import { BatterieDetailComponent } from './batteries/batterie-detail/batterie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AjoutVoitureComponent,
    ModifvoituresComponent,
    VoituresListComponent,
    SignUpComponent,
    SignInComponent,
    AjoutBatterieComponent,
    BatteriesListComponent,
    ModifBatterieComponent,
    VoitureDetailComponent,
    BatterieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
