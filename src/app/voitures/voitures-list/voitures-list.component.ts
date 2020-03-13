import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Voiture } from 'src/app/voiture';
import { VoituresService } from '../voitures.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-voitures-list',
  templateUrl: './voitures-list.component.html',
  styleUrls: ['./voitures-list.component.css']
})
export class VoituresListComponent  {

  dataSource: MatTableDataSource<Voiture>;
  @ViewChild(MatPaginator , {static : false})
  paginator : MatPaginator;
  VoitureData: any = [];
  searchvalue : Observable<any>;
  SearchForm : FormGroup;
  displayedColumns: any[] = [
    'url',
    'modele',
    'prix', 
    'fabrication_date',
    'Vitesse_max',
    'action'
  ];



  constructor(private voitureservice : VoituresService,
    public fb : FormBuilder) {

        this.SearchForm  = new FormGroup({
        modele: new FormControl('')
      });
    this.voitureservice.GetVoituresList()
    .snapshotChanges().subscribe(voitures => {
        voitures.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.VoitureData.push(a as Voiture)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.VoitureData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })

  }

   filter(){
     this.searchvalue = this.SearchForm.get('modele').valueChanges;
   }

   /* Delete */
  deleteBook(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.voitureservice.DeleteBook(e.$key);
      location.reload();
    }
  }
  
}





