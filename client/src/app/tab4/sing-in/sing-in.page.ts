import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {
  name:string;
  id:string;

  constructor(private navController: NavController) { }
  ngOnInit(){}
  async ionViewDidEnter() {

    this.id = sessionStorage.getItem('userId');
    this.name = sessionStorage.getItem('username');
  
  }
  goShopping(){this.navController.navigateForward('tabs/home')}

  async out(){
    
    sessionStorage.removeItem('userId');
    this.navController.navigateForward('tabs/user');}

}
