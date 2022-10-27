import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private ApiService: ApiService,
    private router: Router
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
  ngOnInit() {
  }

  async onSubmit(){
    let loginSubmit = {
      'email' : this.loginForm.controls.email.value,
      'password' : this.loginForm.controls.password.value,
    }
    console.log(loginSubmit);

    this.ApiService.postLogin(loginSubmit).subscribe((data: any) => {
    this.loginData = data;
    if(data.status_code == 200){
      this.router.navigate(['home']);
      console.log(data);
      localStorage.setItem('token', data.token);
      console.log(data.token);
    } else{
      console.log(data);
      console.log('Email or password is incorrect');
    }
    });
    
  }

  previousPage(){
    this.navCtrl.back();
  }
}
