import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {

  id: string;
  menuItem = {} as {
    id: number,
    name: string,
    price: number,
    describe: string,
    categoryID: number,
    imageUrl: string
  };

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var response = await fetch(
      'http://localhost:30000/coffee/' + this.id,
      {
        method: 'GET'
      }
    );
    var result = await response.json();
    this.menuItem = result[0];
  }

  // End_order = [];
  SelectAcount = 0;
  AddClick() {
    this.SelectAcount++;
    // this.End_order.push()
    // add name and quatity inhere
  }


  ReduceClick() {
    // add name and quatity inhere
    if (this.SelectAcount >= 1) {
      this.SelectAcount--;
    }

  }

  async add_to_cart() {
    if (sessionStorage.getItem('userId') != null) {
      var response = await fetch(
        'http://localhost:30000/cart/' + sessionStorage.getItem('userId'),
        {
          method: 'GET'
        }
      );
      var result = await response.json();
      // for(var i = 0; i < result.coffees.length; i++){
      //   if(this.menuItem){}
      // }
      
      console.log(result);
      result.coffees.push({
        name: this.menuItem.name,
        quantity: this.SelectAcount
      })
      var response = await fetch(
        'http://localhost:30000/cart/' + sessionStorage.getItem('userId'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            coffees : result.coffees
          })
        }
      );
      this.navController.navigateForward('tabs/menu/cart');
    }
  }
}
