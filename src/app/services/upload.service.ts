import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url!: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/api/v1/upload';
  }

  upload(request: any) {
    return this.http.post(this.url, request);
  } 
}
