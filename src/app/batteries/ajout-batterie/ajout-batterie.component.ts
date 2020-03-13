import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material';
import { BatterieService } from '../batterie.service';

@Component({
  selector: 'app-ajout-batterie',
  templateUrl: './ajout-batterie.component.html',
  styleUrls: ['./ajout-batterie.component.css']
})
export class AjoutBatterieComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList' , {static : true}) chipList;
  @ViewChild('resetBookForm' , {static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedType: string;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  BatteryForm: FormGroup;
  Type: any = ['Utilitaire', 'Commerciale', 'Transport Publique'];
  constructor( public fb: FormBuilder,
    private batterieervice: BatterieService) { }

  ngOnInit() {
    this.batterieervice.GetBatteriesList(); 
    this.submitBatterieForm();
  }

  /* Remove dynamic Options 
  remove(options: Options): void {
    const index = this.optArray.indexOf(options);
    if (index >= 0) {
      this.optArray.splice(index, 1);
    }
  }*/

  submitBatterieForm() {
    this.BatteryForm = this.fb.group({
      modele_bat: ['', [Validators.required]],
      Prix: ['', [Validators.required]],
      imageUrl:['', Validators.required],
      capacite : ['', [Validators.required]],
      fabrication_date: ['', [Validators.required]],
      voltage: ['', [Validators.required]],
      hauteur: ['', [Validators.required]],
      largeur: ['', [Validators.required]],
      contenu_chimique: ['', [Validators.required]],
      duree_vie: ['', [Validators.required]],
      decharge_max: ['', [Validators.required]],
    });
  }

  /* Get errors*/
  public handleError = (controlName: string, errorName: string) => {
    return this.BatteryForm.controls[controlName].hasError(errorName);
  }

  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.BatteryForm.get('fabrication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.BatteryForm.reset();
    Object.keys(this.BatteryForm.controls).forEach(key => {
      this.BatteryForm.controls[key].setErrors(null)
    });

  }

  /* Submit batterie */
  submitBattery(formvalue) {
      
      this.batterieervice.AjoutBatterie(formvalue);
      this.resetForm();
    
  }

  /* Add dynamic languages 
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
  }*/

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
