import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment as env } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  products: any;
  imgUrl: any;
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private navCtrl: NavController,
    private cartService: CartService,
    private modalCtrl: ModalController

  ) { }

  ngOnInit() {
    this.getProductInfo();
    this.imgUrl = env.productImg;
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  getProductInfo(){
    this.apiService.getProducts().subscribe((data: any)=>{
      this.products = data.results;
      console.log(this.products);
      
    });
  }

  viewProduct(id){
    this.router.navigateByUrl(`shop/${id}`);
  }

  previousPage(){
    // this.navCtrl.back();
    this.router.navigateByUrl('home');
  }

  async openCart(){
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal',
    });
    modal.present();
  }

}
