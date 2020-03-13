import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VoituresService } from '../voitures.service';

export interface Options {
  name: string;
}

@Component({
  selector: 'app-modifvoitures',
  templateUrl: './modifvoitures.component.html',
  styleUrls: ['./modifvoitures.component.css']
})



export class ModifvoituresComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList' , {static : true}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedType: string;
  optArray: Options[] = [];
  ModifVoitureForm: FormGroup;
  Type: any = ['Utilitaire', 'Commerciale', 'Transport Publique'];


  constructor( public fb: FormBuilder,    
    private location: Location,
    private voitureservice: VoituresService,
    private actRoute: ActivatedRoute,
    private router: Router) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.voitureservice.GetVoiture(id).valueChanges().subscribe(data => {
        this.optArray = data.options;
        this.ModifVoitureForm.setValue(data);
      });
     }

  ngOnInit() {
    this.modifVoitureForm();
    
  }

  /* Add language */
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.optArray.length < 5) { 
      this.optArray.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove language */
  remove(options: any): void {
    const index = this.optArray.indexOf(options);
    if (index >= 0) {
      this.optArray.splice(index, 1);
    }
  }

  /* Update form */
  modifVoitureForm(){
    this.ModifVoitureForm = this.fb.group({
      modele: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      Vitesse_max: ['', [Validators.required]],
      fabrication_date: ['', [Validators.required]],
      Vitesse_Moy: ['', [Validators.required]],
      acceleration: ['', [Validators.required]],
      consommation_energie: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      disponiblite: ['Yes'],
      options: [''],
      nb_places : [''],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.ModifVoitureForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.ModifVoitureForm.get('fabrication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.router.navigate(['voitures-list']);
  }

  /* Submit book */
  updateBook() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('confirmer la modification ?')){
        this.voitureservice.UpdateBook(id, this.ModifVoitureForm.value);
      this.router.navigate(['voitures-list']);
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
