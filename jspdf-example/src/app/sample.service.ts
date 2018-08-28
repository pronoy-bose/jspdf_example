import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }

  getLogoImage(): Observable<any> {
    return this.http.get("http://localhost:4200/assets/images/profilePic.jpg", { responseType: 'blob' });
  }
}
