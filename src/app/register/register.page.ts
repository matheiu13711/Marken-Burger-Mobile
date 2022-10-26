import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';
import { PasswordValidator } from './register.validator';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [DatePipe]
})
export class RegisterPage implements OnInit {
  placeholderBday: any;
  Registerdata: any;

  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private navCtrl: NavController,
    private ApiService: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    birthdate: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password_confirmed: ['', [Validators.required]],
  }, { validator: PasswordValidator })

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async onSubmit(){
    let registerSubmit = {
      'email': this.registerForm.controls.email.value,
      'username': this.registerForm.controls.username.value,
      'name': this.registerForm.controls.name.value,
      'birthdate': this.datepipe.transform(this.registerForm.controls.birthdate.value, 'yyyy-MM-dd'),
      'phone_number': this.registerForm.controls.phone_number.value,
      'password': this.registerForm.controls.password.value,
      'password_confirmed': this.registerForm.controls.password_confirmed.value,
    }
    console.log(registerSubmit);

    this.ApiService.postRegister(registerSubmit).subscribe((data: any) => {
      this.Registerdata = data;
      this.router.navigate(['login']);
      console.log(data);
    });

  
  }

  datePicked(value){
    this.placeholderBday = this.datepipe.transform(value, 'MMMM dd, YYYY');
  }

  previousPage(){
    this.navCtrl.back();
  }
}
