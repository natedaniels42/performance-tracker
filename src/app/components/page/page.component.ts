import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data, YesNo } from 'src/app/models/dataModel';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { DialogRef } from '@angular/cdk/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  user!: string;
  data: Data[] = [];
  chart: any;
  pieChart1: any;
  pieChart2: any;
  pieChart3: any;
  photo = 'dog1.jpg';
  showPhoto = false;
  showLogout = false;
  displayedColumns: string[] = ['day', 'weight', 'bloodPressure', 'workout', 'food', 'alcohol', 'date'];

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    const loginRef = this.dialog.open(LoginDialogComponent,
      {
        height: 'fit-content',
        // width: '350px'
      }
    );

    loginRef.afterClosed().subscribe(result => {
      this.user = result;

      this.loadData();
      this.showLogout = true;
    });
  }

  loadData() {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data);
      
      this.data = data.filter((item: any) => item.user === this.user);
      
      this.chart = new Chart('weight-table', {
        type: 'line',
        data: {
          labels: this.data.map((item: any) => item.day),
          datasets: [
            {
              label: 'Weight',
              data: this.data.map((item: any) => item.weight),
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

  onLogout() {
    this.showLogout = false;
    this.data = [];
    this.user = '';
    this.chart.destroy();
    this.pieChart1.destroy();
    this.pieChart2.destroy();
    this.pieChart3.destroy();

    const loginRef = this.dialog.open(LoginDialogComponent,
      {
        height: 'fit-content',
        // width: '600px'
      }
    );

    loginRef.afterClosed().subscribe(result => {
      this.user = result;

      this.loadData();
      this.showLogout = true;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent,
      {
        data: {
          data: this.data,
          user: this.user,
          dialog: DialogRef
        },
        height: 'fit-content',
        width: '600px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.chart.destroy();
      this.pieChart1.destroy();
      this.pieChart2.destroy();
      this.pieChart3.destroy();

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
