import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private ApiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {}


  logout() {
    console.log(localStorage.getItem('token'));
    this.http
      .post(environment.apiURL + '/api/logout',
        localStorage.getItem('token'), this.ApiService.getHeadersWithBearer())
      .subscribe((res: any) => {
        console.log(res);
        localStorage.clear();
        this.router.navigateByUrl('login');
        console.log(localStorage);
        console.log('Logout successfully');
      },)

  }
}
