import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Batterie } from '../batterie';

@Injectable({
  providedIn: 'root'
})

export class BatterieService {
  BatteriesRef : AngularFireList<any>;
  BatterieRef : AngularFireObject<any>;
  constructor( private db : AngularFireDatabase) { }

  /* Création de Batterie */
  AjoutBatterie(batterie : Batterie){
    this.BatteriesRef.push({ 
      modele_bat: batterie.modele_bat,
      prix: batterie.Prix,
      fabrication_date: batterie.fabrication_date,
      imageUrl : batterie.imageUrl,
      capacite : batterie.capacite,
      voltage : batterie.voltage,
      hauteur : batterie.hauteur,
      largeur : batterie.largeur,
      contenu_chimique : batterie.contenu_chimique,
      duree_vie : batterie.duree_vie,
      decharge_max : batterie.decharge_max
    }).catch( error => {
      this.errorMgmt(error);}
      );
  }

  /* Get Batterie list */
  GetBatteriesList() {
    this.BatteriesRef = this.db.list('batteries-list'); 
    return this.BatteriesRef;
  }

  

   /* Modifier Batterie */
   UpdateBatterie(id, batterie : Batterie) {
    this.BatterieRef.update({
      modele_bat: batterie.modele_bat,
      prix: batterie.Prix, 
      fabrication_date: batterie.fabrication_date,
      imageUrl : batterie.imageUrl,
      capacite : batterie.capacite,
      voltage : batterie.voltage,
      hauteur : batterie.hauteur,
      largeur : batterie.largeur,
      contenu_chimique : batterie.contenu_chimique,
      duree_vie : batterie.duree_vie,
      decharge_max : batterie.decharge_max
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

   /* Batterie */
   GetBatterie(id: string) {
    this.BatterieRef = this.db.object('batteries-list/' + id);
    return this.BatterieRef;
  } 

  /* Supprimer Batterie */
  DeleteBattery(id: string) {
    this.BatterieRef = this.db.object('batteries-list/' + id);
    this.BatterieRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);


}
}
