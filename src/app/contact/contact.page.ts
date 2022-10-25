import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactData: any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private ApiService: ApiService
  ) { }

  ContactForm: FormGroup = this.formBuilder.group({
    senderName: ['', [Validators.required]],
    senderEmail: ['', [Validators.required]],
    senderMessage: ['', [Validators.required]],
  })

  ngOnInit() {
  }

  async onSubmit(){
    let ContactSubmit = {
      'senderName' : this.ContactForm.controls.senderName.value,
      'senderEmail' : this.ContactForm.controls.senderEmail.value,
      'senderMessage' : this.ContactForm.controls.senderMessage.value,
    }
    
    console.log(ContactSubmit);

    this.ApiService.postFeedback(ContactSubmit).subscribe((data: any) => {
    this.contactData = data;
    console.log(data);
    })
  }

}
