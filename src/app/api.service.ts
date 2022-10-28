import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
  ) { }

  getProducts(){
    return this.http.get(env.apiURL + '/api/product');
  }

  getProductByID(id: any){
    return this.http.get(env.apiURL + '/api/product/' + id);
  }

  postRegister(data: any) {
    return this.http.post(env.apiURL + '/api/register', data,
    );
  }

  postLogin(data: any) {
    return this.http.post(env.apiURL + '/api/login', data,
    );
  }

  postFeedback(data: any) {
    return this.http.post(env.apiURL + '/api/feedback', data
    );
  }

  getHeadersWithBearer() {
    let accessToken = localStorage.getItem('token');
    let httpOptionsWithBearer = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
      }),
    };
    return httpOptionsWithBearer;
  }

  postOrder(data: any){
    return this.http.post(env.apiURL + '/api/order', data);
  }

  // Alerts
  async failedActionAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'error-prompt',
      header: 'Error',
      message: message,
      buttons: ['Confirm'],
    });
    await alert.present();
  }

  async successActionAlert(m: any) {
    const alert = await this.alertController.create({
      cssClass: 'violation-prompt',
      header: 'Success!',
      message: m,
      buttons: ['Confirm'],
    });
    await alert.present();
  }
}
