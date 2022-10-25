import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment as env } from 'src/environments/environment.prod';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  products: any;
  imgUrl: any;
  constructor(
    private apiService: ApiService,
  ) { }

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
