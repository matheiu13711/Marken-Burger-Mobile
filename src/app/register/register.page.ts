import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';
import { PasswordValidator } from './register.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [DatePipe]
})
export class RegisterPage implements OnInit {
  placeholderBday: any;

  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private navCtrl: NavController,
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
      'birthdate': this.datepipe.transform(this.registerForm.controls.birthdate.value, 'yyyy/dd/MM'),
      'phone_number': this.registerForm.controls.phone_number.value,
      'password': this.registerForm.controls.password.value,
      'password_confirmed': this.registerForm.controls.password_confirmed.value,
    }
    console.log(registerSubmit);
  }

  datePicked(value){
    this.placeholderBday = this.datepipe.transform(value, 'MMMM dd, YYYY');
  }

  previousPage(){
    this.navCtrl.back();
  }
}
