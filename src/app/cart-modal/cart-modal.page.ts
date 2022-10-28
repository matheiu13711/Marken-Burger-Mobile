import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { environment as env } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart: any;
  total = 0;
  imgUrl: any;
  order: any;
  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    for(let p of this.cart){
      this.total += parseFloat(p.price.toFixed(2))*p.quantity;
    }
    this.imgUrl = env.productImg;
  }

  closeCart(){
    this.modalCtrl.dismiss(null);
  }

  removeItem(item){
    this.total -= item.price*item.quantity
    this.total = parseFloat(this.total.toFixed(2));
    this.cartService.removeProduct(item);
  }

  increaseItem(item){
    this.total += item.price;
    this.total = parseFloat(this.total.toFixed(2));
    this.cartService.addProduct(item);
  }

  decreaseItem(item){
    this.total -= parseFloat(item.price.toFixed(2));
    this.total = parseFloat(this.total.toFixed(2));
    this.cartService.decreaseProduct(item);
    console.log(item);
  }

  postOrder(){
    this.modalCtrl.dismiss(null);
    let orderDesc = " ";
    let orderID: any;
    for(let i of this.cart){
      if(orderDesc == " "){
        orderDesc = "<li>" + i.price.toString() + " " + i.quantity.toString() + "x " + i.name.toString() + "</li>";
      } else{
        orderDesc = orderDesc + '\n'+ "<li>" + i.price.toString() + " " + i.quantity.toString() + "x " + i.name.toString() + "</li>";
      }
      
    }
    orderID = this.randomString(20);

    this.order = {
      'userID': localStorage.getItem('id'),
      'orderID': orderID,
      'orderPrice': this.total,
      'orderDescription': orderDesc
    }

    console.log(this.order);

    this.apiService.postOrder(this.order).subscribe((data: any)=>{
      console.log(data);
      this.router.navigateByUrl('order-success');
      this.apiService.successActionAlert('Your order is complete.');
      this.cartService.successOrder(this.order);
    }, (err: any)=>{
      console.log(err);
      this.apiService.failedActionAlert('Order Failed.');
    })
    
  }
  
  randomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
