import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  menuList = [] as {
    categoryName: string,
    itemList: {
      id: number,
      name: string,
      price: number,
      describe: string,
      categoryID: number,
      imageUrl: string
    }[]
  }[];

  constructor(private navController: NavController) { }

  ionViewDidEnter() {
    navigator.geolocation.getCurrentPosition(async (info) => {
      var response = await fetch(
        'http://localhost:30000/coffee',
        {
          method: 'GET'
        }
      );
      var result = await response.json();
      var tempList = {};
      result.forEach(menuItem => {
        if (!(menuItem.categoryId in tempList)) {
          tempList[menuItem.categoryId] = [];
        }
        tempList[menuItem.categoryId].push(menuItem);
      });
      this.menuList = [];
      Object.keys(tempList).forEach(categoryID => {
        this.menuList.push({
          categoryName: categoryID,
          itemList: tempList[categoryID]
        })
      });
    });
  }

  itemSelected(id: number) {
    this.navController.navigateForward('tabs/menu/detail/' + id);
  }

  enterCart() {
    this.navController.navigateForward('tabs/menu/cart');
  }

}
