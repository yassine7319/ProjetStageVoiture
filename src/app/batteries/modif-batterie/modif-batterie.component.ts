import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BatterieService } from '../batterie.service';

@Component({
  selector: 'app-modif-batterie',
  templateUrl: './modif-batterie.component.html',
  styleUrls: ['./modif-batterie.component.css']
})
export class ModifBatterieComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList' , {static : true}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedType: string;
  ModifBatterieForm: FormGroup;

  constructor(public fb: FormBuilder,    
    private location: Location,
    private batterieservice: BatterieService,
    private actRoute: ActivatedRoute,
    private router: Router) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.batterieservice.GetBatterie(id).valueChanges().subscribe(data => {
        this.ModifBatterieForm.setValue(data);
      })
     }

  ngOnInit() {
    this.modifBatterieForm();  
  }
  
  /* Update form */
  modifBatterieForm(){
    this.ModifBatterieForm = this.fb.group({
      modele_bat: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      imageUrl:['', Validators.required],
      capacite : ['', [Validators.required]],
      fabrication_date: ['', [Validators.required]],
      voltage: ['', [Validators.required]],
      hauteur: ['', [Validators.required]],
      largeur: ['', [Validators.required]],
      contenu_chimique: ['', [Validators.required]],
      duree_vie: ['', [Validators.required]],
      decharge_max: ['', [Validators.required]],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.ModifBatterieForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.ModifBatterieForm.get('fabrication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.router.navigate(['batteries-list']);
  }

  /* Submit book */
  updateBatterie() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('confirmer la modification ?')){
        this.batterieservice.UpdateBatterie(id, this.ModifBatterieForm.value);
      this.router.navigate(['batteries-list']);
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }




}
