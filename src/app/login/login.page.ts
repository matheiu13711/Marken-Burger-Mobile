import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  })
  ngOnInit() {
  }

  async onSubmit(){
    let loginSubmit = {
      'email' : this.loginForm.controls.email.value,
      'password' : this.loginForm.controls.password.value,
    }
    
    console.log(loginSubmit);
    
  }
}
