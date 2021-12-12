import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // var result;
  cartList = [];
  total_price = 0;
  nameList = [];
  // SelectAcount = 0;
  // deleteItem = true;

  constructor(private navController: NavController) { }

  async ngOnInit() {
    var response = await fetch(
      'http://localhost:30000/cart/' + sessionStorage.getItem('userId'),
      {
        method: 'GET'
      }
    );
    var result = await response.json();
    this.cartList = result.coffees;
    for (var i = 0; i < this.cartList.length; i++) {
      this.nameList.push(this.cartList[i].name)
    }
    this.total();
  }

  async AddClick(item_name) {
    for (var i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].name == item_name) {
        this.cartList[i].quantity += 1;
        break;
      }
    }
    var response = await fetch(
      'http://localhost:30000/cart/' + sessionStorage.getItem('userId'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coffees: this.cartList
        })
      }
    );
    this.total();
  }

  async ReduceClick(item_name) {
    // add name and quatity inhere
    for (var i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].name == item_name) {
        if (this.cartList[i].quantity > 0) {
          this.cartList[i].quantity -= 1;
        }
        else {
          this.cartList.splice(i, 1);
        }
        break;
      }
    }
    var response = await fetch(
      'http://localhost:30000/cart/' + sessionStorage.getItem('userId'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coffees: this.cartList
        })
      }
    );
    this.total();
  }
  async total() {
    //get all coffees
    var response = await fetch(
      'http://localhost:30000/coffee',
      {
        method: 'GET'
      }
    );
    var Presult = await response.json();
    //for (var i = 0; i < this.nameList.length; i++) {
    //  var price = Presult.coffees.find()
    //}
    console.log(Presult);
    this.total_price= 0;

    for (var i = 0; i < Presult.length; i++) {
      for (var j = 0; j < this.nameList.length; j++) {
        if (Presult[i].name == this.nameList[j]) {
          this.total_price += Presult[i].price * this.cartList[j].quantity;
        }
      }

    }
    console.log(this.total_price);
  }

  async pay() {
    var response = await fetch(
      'http://localhost:30000/order',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coffees: this.cartList,
          userID: sessionStorage.getItem('userId'),
          total: this.total_price
        })
      }
    );
    this.navController.navigateForward('tabs/menu');
  }


}
