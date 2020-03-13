import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { VoituresService } from '../voitures.service';
import { Voiture } from 'src/app/voiture';

@Component({
  selector: 'app-voiture-detail',
  templateUrl: './voiture-detail.component.html',
  styleUrls: ['./voiture-detail.component.css']
})
export class VoitureDetailComponent implements OnInit {
  voiture : Voiture;
  id : any

  constructor( private router:Router,
    private route:ActivatedRoute,
    private voitureservice : VoituresService) { }

  ngOnInit() {
    // get voiture id //
    this.id = this.route.snapshot.params['id'];
    this.voitureservice.GetVoiture(this.id).valueChanges().subscribe(voiture => {
      this.voiture = voiture;;
  })
  }

  // supprimer la voiture // 

  onDeleteClick(){
    this.voitureservice.DeleteBook(this.id);

    this.router.navigate(['/voitures-list']);
  }

}
