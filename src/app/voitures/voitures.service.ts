import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges } from '@angular/fire/database';
import { Voiture } from '../voiture';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VoituresService {

  VoituresRef : AngularFireList<any>;
  VoitureRef : AngularFireObject<any>;
  filteredRef : AngularFireList<any>;
  folder : string;
  urlimg ="";

  constructor( private db : AngularFireDatabase,
    private storage : AngularFireStorage ) {
    this.folder = 'images';
   }

  /* Création de Voiture */
  AjoutVoiture(voiture : Voiture){
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('imageUrl')).files[0]]){
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = this.storage.ref(path);
        iRef.put(selectedFile).then((snapshot) => {
          voiture.path = path;
          voiture.imageUrl = selectedFile.name;
          this.VoituresRef.push(voiture);
        });
      console.log(voiture.path);
      console.log(voiture.imageUrl);
      }
    /*this.VoituresRef.push({ 
      modele: voiture.modele,
      prix: voiture.prix,
      fabrication_date: voiture.fabrication_date,
      Vitesse_max: voiture.Vitesse_max,
      Vitesse_Moy: voiture.Vitesse_Moy,
      acceleration: voiture.acceleration,
      disponiblite: voiture.disponiblite,
      Type : voiture.Type,
      options : voiture.options,
      nb_places : voiture.nb_places,
      consommation_energie : voiture.consommation_energie,
      imageUrl : voiture.imageUrl,
      path : voiture.path,


    }).catch( error => {
      this.errorMgmt(error);}
      );*/
      
  }

  /* Get Voiture list */
  GetVoituresList() {
    this.VoituresRef = this.db.list('voitures-list');
    return this.VoituresRef;
  }

  filtervoitures(modele : string): any {
    this.filteredRef = this.db.list('/voitures-list', ref => ref.orderByChild('modele').equalTo(modele));
    return this.filteredRef; 
}

   /* Update book */
   UpdateBook(id, voiture : Voiture) {
    this.VoitureRef.update({
      modele: voiture.modele,
      prix: voiture.prix,
      fabrication_date: voiture.fabrication_date,
      Vitesse_max: voiture.Vitesse_max,
      Vitesse_Moy: voiture.Vitesse_Moy,
      acceleration: voiture.acceleration,
      disponiblite: voiture.disponiblite,
      Type : voiture.Type,
      options : voiture.options,
      nb_places : voiture.nb_places,
      consommation_energie : voiture.consommation_energie,
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

   /* Get Voiture */
   GetVoiture(id: string) {
    this.VoitureRef = this.db.object('voitures-list/' + id);
    return this.VoitureRef;
  } 

  /* Delete Voiture */
  DeleteBook(id: string) {
    this.VoitureRef = this.db.object('voitures-list/' + id);
    this.VoitureRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);


}



}


