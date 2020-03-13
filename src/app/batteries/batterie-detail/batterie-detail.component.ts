import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BatterieService } from '../batterie.service';

@Component({
  selector: 'app-batterie-detail',
  templateUrl: './batterie-detail.component.html',
  styleUrls: ['./batterie-detail.component.css']
})
export class BatterieDetailComponent implements OnInit {
  batterie : any;
  id : any

  constructor( private router:Router,
    private route:ActivatedRoute,
    private batterieservice : BatterieService) { }

  ngOnInit() {
    // get batterie id //
    this.id = this.route.snapshot.params['id'];
    this.batterieservice.GetBatterie(this.id).valueChanges().subscribe(batterie => {
      this.batterie = batterie;;
  })
  }

  // supprimer la batterie // 

  onDeleteClick(){
    this.batterieservice.DeleteBattery(this.id);

    this.router.navigate(['/batteries-list']);
  }


}
