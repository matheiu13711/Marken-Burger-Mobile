import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any;
  imgUrl: any;

  sliderConfig = {
    slidesPerView: 1.5,
    spaceBetween: 3,
    centeredSlides: true,
    initialSlide: 1,
  };

  constructor(
    private apiService:  ApiService
  ) {}

  ngOnInit() {
    this.getProductInfo();
    this.imgUrl = env.productImg;
  }

  getProductInfo(){
    this.apiService.getProducts().subscribe((data: any)=>{
      this.products = data.results;
      console.log(this.products);
      
    });
  }

}
