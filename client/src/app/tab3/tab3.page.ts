import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  orderList = [];

  constructor() { }
  // async ngOnInit() {
    
  //   console.log(sessionStorage.getItem('userId'));
  //   if (sessionStorage.getItem('userId')) {
  //     var response = await fetch(
  //       'http://localhost:30000/order/' + sessionStorage.getItem('userId'),
  //       {
  //         method: 'GET'
  //       }
  //     );
  //     var result = await response.json();
  //     console.log(result)
  //     //debugger
  //     this.orderList = result;

  //   }


  // }

  async ionViewDidEnter() {
    console.log(sessionStorage.getItem('userId'));
    if (sessionStorage.getItem('userId')) {
      var response = await fetch(
        'http://localhost:30000/order/' + sessionStorage.getItem('userId'),
        {
          method: 'GET'
        }
      );
      var result = await response.json();
      console.log(result)
      //debugger
      this.orderList = result;

    }
    else {
      this.orderList = [];
    }
  }



}
