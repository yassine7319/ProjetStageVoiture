import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Batterie } from 'src/app/batterie';
import { BatterieService } from '../batterie.service';

@Component({
  selector: 'app-batteries-list',
  templateUrl: './batteries-list.component.html',
  styleUrls: ['./batteries-list.component.css']
})
export class BatteriesListComponent  {
  dataSource: MatTableDataSource<Batterie>;
  @ViewChild(MatPaginator , {static : false})
  paginator : MatPaginator;
  BatterieData: any = [];
  displayedColumns: any[] = [
    'url',
    'modele',
    'prix', 
    'fabrication_date',
    'Voltage',
    'action'
  ];

  constructor(private batterieservice : BatterieService) {
    this.batterieservice.GetBatteriesList()
    .snapshotChanges().subscribe(batterie => {
        batterie.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BatterieData.push(a as Batterie)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BatterieData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
   }

   /* Delete */
  deleteBattery(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.batterieservice.DeleteBattery(e.$key);
      location.reload();
    }
  }
  }





