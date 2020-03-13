export interface Voiture {
    $key : string;
    modele : string;
    prix : number
    fabrication_date : Date;
    Vitesse_max : number;
    Vitesse_Moy : number;
    acceleration : number;
    disponiblite : boolean;
    Type : string;
    consommation_energie : number;
    options : Array<string>;
    Gamme_électrique : number;
    Batterie_Capacité : number;
    nb_places : number;
    nb_dispo : number;
    imageUrl:string;
    path : string;

}
