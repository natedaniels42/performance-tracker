import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data, YesNo } from 'src/app/models/dataModel';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DataService } from 'src/app/services/data.service';
import Chart, { ChartItem } from 'chart.js/auto';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  @ViewChild('weightTable') weightTable!: ChartItem;
  data: Data[] = [];
  chart: any;

  displayedColumns: string[] = ['day', 'weight', 'workout', 'food', 'alcohol', 'date'];

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data);
      
      this.data = data;
      
      setTimeout(() => {
        console.log(this.weightTable);
        console.log(data.map((item: any) => item.weight));

        new Chart(this.weightTable, {
          type: 'line',
          data: data.map((item: any) => item.weight),
        })
      }, 10000)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent,
      {
        data: {data: this.data},
        height: '400px',
        width: '600px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
