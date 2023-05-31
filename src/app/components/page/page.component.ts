import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data, YesNo } from 'src/app/models/dataModel';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  data: Data[] = [];
  chart: any;

  displayedColumns: string[] = ['day', 'weight', 'workout', 'food', 'alcohol', 'date'];

  photoArr = ['dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp'];

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data);
      
      this.data = data;
      
      this.chart = new Chart('weight-table', {
        type: 'line',
        data: {
          labels: data.map((item: any) => item.day),
          datasets: [
            {
              label: 'Weight',
              data: data.map((item: any) => item.weight),
              borderColor: 'purple',
              backgroundColor: 'light-purple',
              pointStyle: 'circle',
              pointRadius: 5,
            }
          ],
        },
        options: {
          responsive: true
        },
      })
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent,
      {
        data: {
          data: this.data,
          dialog: DialogRef
        },
        height: 'fit-content',
        width: '600px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.chart.destroy();

      this.loadData();
    });
  }
}
