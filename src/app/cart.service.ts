import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  private orderDetails: any;
  constructor() { }

  addProduct(product){
    let added = false;
    for(let p of this.cart){
      if(p.id === product.id){
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(product);
    } 
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product){
    for(let [index, p] of this.cart.entries()){
      if(p.id === product.id){
        p.quantity -= 1;
        if(p.quantity == 0){
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product){
    for(let [index, p] of this.cart.entries()){
      if(p.id === product.id){
        this.cartItemCount.next(this.cartItemCount.value - p.quantity);
        this.cart.splice(index, 1);
      }
    }
  }

  successOrder(data: any){
    this.orderDetails = data;
  }

  getCartItemCount(){
    return this.cartItemCount;
  }

  getCart(){
    return this.cart;
  }

  getOrderDetails(){
    return this.orderDetails;
  }
}
