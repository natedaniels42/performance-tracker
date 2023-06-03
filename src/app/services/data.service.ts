import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
      // .set('Content-Type', 'multipart/form-data')
      .set('enctype', 'multipart/form-data');
    return this.http.post(this.url, request, {headers});
  }

  getImages() {
    return this.http.get('http://localhost:3000/images');
  }
}
