import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  weight = new FormControl(null, Validators.required);
  workout = new FormControl('Y',Validators.required);
  food = new FormControl('Y', Validators.required);
  alcohol = new FormControl('Y', Validators.required);

  addForm = new FormGroup({
    weight: this.weight,
    workout: this.workout,
    food: this.food,
    alcohol: this.alcohol
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService,
    public dialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  addData() {
    console.log(this.addForm);
    if (!this.addForm.valid) {
      console.log('not valid');
      return;
    }

    let day = 1;

    while (this.data.data.some((entry: any) => entry.day === day)) {
      day++;
    }

    console.log(day);

    const requestObj = {
      day: day,
      weight: this.weight.value,
      workout: this.workout.value,
      food: this.food.value,
      alcohol: this.alcohol.value,
      date: new Date()
    };

    this.dataService.addData(requestObj).subscribe((result: any) => {
      console.log(result);

      this.dialogRef.close();
    })
  }
}
