import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  orderDetails=[];
  orderDescription: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  TrackForm: FormGroup = this.formBuilder.group({
    orderID: ['', [Validators.required]],
  })

  ngOnInit() {
  }

  async onSubmit(){
    let ContactSubmit = {
      'orderID' : this.TrackForm.controls.orderID.value
    }
    this.apiService.trackOrder(this.TrackForm.controls.orderID.value).subscribe((data: any) =>{
      console.log(data.results[0]);
      this.orderDetails = data.results[0];
      this.orderDescription = data.results[0].orderDescription.toString();
      console.log(ContactSubmit);
    })
  }

  

}
