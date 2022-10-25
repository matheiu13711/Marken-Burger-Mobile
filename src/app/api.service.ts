import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  getProducts(){
    return this.http.get(env.apiURL + '/api/product');
  }

  postRegister(data: any) {
    return this.http.post(env.apiURL + '/api/register', data
    );
  }

  postLogin(data: any) {
    return this.http.post(env.apiURL + '/api/login', data
    );
  }

  postFeedback(data: any) {
    return this.http.post(env.apiURL + '/api/feedback', data
    );
  }
}
