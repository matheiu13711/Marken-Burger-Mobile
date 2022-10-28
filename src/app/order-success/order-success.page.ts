import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Clipboard } from '@capacitor/clipboard';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {
  orderDetails: any;
  orderDescription: any;
  summary: any;
  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.orderDetails = this.cartService.getOrderDetails();
    this.orderDescription = this.orderDetails.orderDescription.toString(); 
  }

  copyID(){
    Clipboard.write({
      string: this.orderDetails.orderID.toString(),
    })
  }
}
