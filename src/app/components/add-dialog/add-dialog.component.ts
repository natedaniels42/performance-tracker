import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  fileName = '';
  file: any;
  formData!: FormData;
  day = 1;

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
    public dialogRef: MatDialogRef<AddDialogComponent>, private uploadService: UploadService) { 
      this.formData = new FormData();
    }

  ngOnInit(): void {
    console.log(this.data);
  }

  addData() {
    if (!this.addForm.valid) {
      console.log('not valid');
      return;
    }

    this.day = 1;

    while (this.data.data.some((entry: any) => entry.day === this.day)) {
      this.day++;
    }

    const requestObj = {
      day: this.day,
      weight: this.weight.value,
      workout: this.workout.value,
      food: this.food.value,
      alcohol: this.alcohol.value,
      date: new Date(),
      user: this.data.user,
      photo: this.fileName
    };

    // console.log(requestObj);
    // this.formData.append('day', String(day));
    // this.formData.append('weight', String(this.weight.value));
    // this.formData.append('workout', String(this.workout.value));
    // this.formData.append('food', String(this.food.value));
    // this.formData.append('alcohol', String(this.alcohol.value));
    // this.formData.append('user', String(this.data.user));
    // this.formData.append('file', this.file);

    this.dataService.addData(requestObj).subscribe((result: any) => {
      console.log(result);

      this.dialogRef.close();
    })
  }

  fileUpload() {
    console.log('upload');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    console.log(file);

      
    if (file) {
        this.fileName = file.name;
        this.file = file;
      
        const formData = new FormData();
        formData.append('file', this.file);

        this.uploadService.upload(formData).subscribe((result: any) => {
          console.log(result);
        })
    }
  }
}
