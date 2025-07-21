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
  newDay = -1;

  password = new FormControl('');
  date = new FormControl(null, Validators.required);
  weight = new FormControl(null, Validators.required);
  bloodPressureS1 = new FormControl(null, Validators.required);
  bloodPressureD1 = new FormControl(null, Validators.required);
  bloodPressureS2 = new FormControl(null, Validators.required);
  bloodPressureD2 = new FormControl(null, Validators.required);
  workout = new FormControl('Y',Validators.required);
  food = new FormControl('Y', Validators.required);
  alcohol = new FormControl('Y', Validators.required);
  notes = new FormControl('', Validators.required);
  waist = new FormControl('');
  leftArm = new FormControl('');
  rightArm = new FormControl('');
  leftLeg = new FormControl('');
  rightLeg = new FormControl('');

  addForm = new FormGroup({
    password: this.password,
    date: this.date,
    weight: this.weight,
    bloodPressureS1: this.bloodPressureS1,
    bloodPressureD1: this.bloodPressureD1,
    bloodPressureS2: this.bloodPressureS2,
    bloodPressureD2: this.bloodPressureD2,
    workout: this.workout,
    food: this.food,
    alcohol: this.alcohol,
    notes: this.notes,
    waist: this.waist,
    leftArm: this.leftArm,
    rightArm: this.rightArm,
    leftLeg: this.leftLeg,
    rightLeg: this.rightLeg
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
      console.log(this.addForm);
      return;
    }

    this.day = 1;

    while (this.data.data.some((entry: any) => entry.day === this.day)) {
      this.day++;
    }

    const requestObj = {
      day: this.day,
      weight: this.weight.value,
      bloodPressureSystolic1: this.bloodPressureS1.value,
      bloodPressureDiastolic1: this.bloodPressureD1.value,
      bloodPressureSystolic2: this.bloodPressureS2.value,
      bloodPressureDiastolic2: this.bloodPressureD2.value,
      workout: this.workout.value,
      food: this.food.value,
      alcohol: this.alcohol.value,
      notes: this.notes.value,
      date: this.date.value,
      user: this.data.user,
      photo: this.fileName,
      waist: this.waist.value,
      leftArm: this.leftArm.value,
      rightArm: this.rightArm.value,
      leftLeg: this.leftLeg.value,
      rightLeg: this.rightLeg.value
    };

    console.log(requestObj);

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

  handleDateChange() {
    this.newDay = this.date.value ? new Date(this.date.value).getDay() : -1;

    console.log(this.newDay);
  }
}
