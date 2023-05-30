import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url!: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/v1/reports';
  }

  getData() {
    return this.http.get(this.url);
  }

  addData(request: any) {
    return this.http.post(this.url, request);
  }
}
