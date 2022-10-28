import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ModalController, NavController } from '@ionic/angular';
import { environment as env } from 'src/environments/environment.prod';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.page.html',
  styleUrls: ['./shop-product.page.scss'],
})
export class ShopProductPage implements OnInit {
  selectedProduct: any;
  productPrev = [];
  imgUrl: any;
  cartItemCount: BehaviorSubject<number>;

  // description: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private navCtrl: NavController,
    private cartService: CartService,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.selectedProduct = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getProductByID(this.selectedProduct).subscribe((data: any)=> {
      this.productPrev = data.results;
      console.log(this.productPrev);
      // this.description = this.productPrev.description;
    });
    this.imgUrl = env.productImg
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  previousPage(){
    this.navCtrl.back();
  }

  addToCart(data){
    if(!data.quantity){
      data["quantity"] = 1;
    }
    console.log(data);
    
    this.cartService.addProduct(data);
  }

  async openCart(){
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal',
    });
    modal.present();
  }

}
