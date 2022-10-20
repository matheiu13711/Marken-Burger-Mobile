import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [DatePipe]
})
export class RegisterPage implements OnInit {
  testBday: any;
  testInp: any;

  registerInfo = {
    email: 'aaaaa',
    birthday: 'asd',
  }
  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
    ) { }

  ngOnInit() {
    this.testInp = '100 percent';
  }

  registerForm: FormGroup = this.formBuilder.group({
    email: [''],
    firstName: [''],
    middleName: [''],
    lastName: [''],
    birthdate: [''],
    password: [''],
    confirmPass: [''],
  })

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  dateChange(value){
    this.testBday = value;
    console.log(this.testBday);
    
  }

  async onSubmit(){
    let registerSubmit = {
      'email': this.registerForm.controls.email.value,
      'birthdate': this.registerForm.controls.birthdate.value,
    }
    console.log(registerSubmit);
  }

  test(value){
    this.registerInfo.birthday = this.datepipe.transform(value, 'MMMM dd, YYYY');
  }
}
