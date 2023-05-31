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
  pieChart1: any;
  pieChart2: any;
  pieChart3: any;
  photo = 'dog1.jpg';
  showPhoto = false;
  displayedColumns: string[] = ['day', 'weight', 'workout', 'food', 'alcohol', 'date'];


  photoArr = ['dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp',
    'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp', 'dog1.jpg', 'dog2.jpg', 'dog3.webp'];

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
              borderColor: 'rgb(123,31,162)',
              backgroundColor: 'rgb(66,66,66)',
              pointStyle: 'circle',
              pointRadius: 5,
            }
          ],
        },
        options: {
          responsive: true
        },
      })

      this.pieChart1 = new Chart('workout-table', {
        type: 'pie',
        data: {
          labels: [
            'Yes',
            'No'
          ],
          datasets: [{
            label: 'Workout',
            data: [this.data.filter((item: any) => item.workout === 'Y').length, this.data.filter((item: any) => item.workout === 'N').length],
            backgroundColor: [
              'rgb(123,31,162)',
              'rgb(66,66,66)'
            ],
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Workout'
            }
          }
        }
      })
      
      this.pieChart2 = new Chart('food-table', {
        type: 'pie',
        data: {
          labels: [
            'Yes',
            'No'
          ],
          datasets: [{
            label: 'Food',
            data: [this.data.filter((item: any) => item.food === 'Y').length, this.data.filter((item: any) => item.food === 'N').length],
            backgroundColor: [
              'rgb(123,31,162)',
              'rgb(66,66,66)'
            ],
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Food'
            }
          }
        }
      })

      this.pieChart3 = new Chart('alcohol-table', {
        type: 'pie',
        data: {
          labels: [
            'Yes',
            'No'
          ],
          datasets: [{
            label: 'Alcohol',
            data: [this.data.filter((item: any) => item.alcohol === 'Y').length, this.data.filter((item: any) => item.alcohol === 'N').length],
            backgroundColor: [
              'rgb(123,31,162)',
              'rgb(66,66,66)'
            ],
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Alcohol'
            }
          }
        }
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

  onMouseEnter(photo: string) {
    this.photo = photo;

    this.showPhoto = true;

  }

  onMouseLeave() {
    this.photo = '';
    this.showPhoto = false;
  }
}
