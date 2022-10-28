import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  TrackForm: FormGroup = this.formBuilder.group({
    senderName: ['', [Validators.required]],
  })

  ngOnInit() {
  }

  async onSubmit(){
    let ContactSubmit = {
      'senderName' : this.TrackForm.controls.senderName.value
    }
    
    console.log(ContactSubmit);
  }

  

}
