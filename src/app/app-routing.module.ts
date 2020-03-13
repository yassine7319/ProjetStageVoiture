import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'sign-in' },
{ path: 'ajout-voiture', component: AjoutVoitureComponent },
{ path: 'modif-voiture/:id', component: ModifvoituresComponent },
{ path: 'voitures-list', component: VoituresListComponent},
{ path :'ajout-batterie' , component : AjoutBatterieComponent},
{path :'voiture-detail/:id',component : VoitureDetailComponent},
{path : 'batterie-detail/:id', component: BatterieDetailComponent},
{ path :'batteries-list' , component : BatteriesListComponent},
{ path :'modif-batterie/:id' , component : ModifBatterieComponent},
{ path: 'register-user', component : SignUpComponent },
{ path: 'sign-in', component: SignInComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
