import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VoituresService } from '../voitures.service';
import { MatChipInputEvent } from '@angular/material';
import {Router} from '@angular/router'


export interface Options {
  name: string;
}

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList' , {static : true}) chipList;
  @ViewChild('resetBookForm' , {static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedType: string;
  optArray: Options[] = [];
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  VoitureForm: FormGroup;
  Type: any = ['Utilitaire', 'Commerciale', 'Transport Publique'];
  constructor( public fb: FormBuilder,
    private voitureservice: VoituresService,
    private router : Router ) { }

  ngOnInit() {
    this.voitureservice.GetVoituresList(); 
    this.submitVoitureForm();
  }

  /* Remove dynamic Options */
  remove(options: Options): void {
    const index = this.optArray.indexOf(options);
    if (index >= 0) {
      this.optArray.splice(index, 1);
    }
  }

  submitVoitureForm() {
    this.VoitureForm = this.fb.group({
      modele: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      Vitesse_max: ['', [Validators.required]],
      fabrication_date: ['', [Validators.required]],
      Vitesse_Moy: ['', [Validators.required]],
      acceleration: ['', [Validators.required]],
      consommation_energie: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      disponiblite: ['Yes'],
      options : [this.optArray],
      nb_places : ['',[Validators.required]],
      imageUrl :['', Validators.required],

    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.VoitureForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.VoitureForm.get('fabrication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.VoitureForm.reset();
    Object.keys(this.VoitureForm.controls).forEach(key => {
      this.VoitureForm.controls[key].setErrors(null)
    });
    this.imgSrc ="/assets/unnamed.jpg";
    this.selectedImage = null;

  }

  /* Submit book */ 
  submitBook() {
      
      this.voitureservice.AjoutVoiture(this.VoitureForm.value);
      this.resetForm();
      this.router.navigate(['voitures-list']);
    
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.optArray.length < 5) {
      this.optArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = "/assets/unnamed.jpg"
      this.selectedImage = null; 
    }
  }

}
