import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  user: {
    username: string,
    password: string,
    userId: number,
    phoneNum: number,
    orders: number[]
  } = {} as any;

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  async signIn() {
    var userObj = {
      name: this.user.username,
      password: this.user.password
    };
    var response = await fetch(
      'http://localhost:30000/signin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
      }
    );
    if (response.status === 200) {
      var result = await response.json();
      this.user.userId = result.id;
      this.user.phoneNum = result.phoneNum;
      this.user.orders = result.orders;
      sessionStorage.setItem('userId',result.id);
      sessionStorage.setItem("username", result.name);
      this.navController.navigateForward('tabs/user/sing-in')
    }
    else {
      alert("Fail Login");
    }
  }

  enterSignUp() {
    this.navController.navigateForward('tabs/user/sign-up');
  }

  // backSignIn(){
  //   // this.signUp();
  //   this.navController.navigateForward('tabs/user')
  // }
  goShopping(){this.navController.navigateForward('tabs/home')}

  ionViewDidEnter(){
    this.navController.navigateForward('tabs/user');
    this.user.userId = null;
    sessionStorage.setItem('userId','');}


  // async signUp() {
  //   var userObj = {
  //     name: this.user.username,
  //     password: this.user.password,
  //     phoneNum: 123456
  //   };
  //   var response = await fetch(
  //     'http://localhost:30000/signup',
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(userObj)
  //     }
  //   );
  //   if (response.status === 200) {
  //     const result = await response.json();
  //     this.user.userId = result.id;
  //     this.user.phoneNum = result.phoneNum;
  //     this.user.orders = result.orders;

  //     sessionStorage.setItem('userId', result.id);
  //   }
  //   else {
  //     alert("Fail signup");
  //     sessionStorage.setItem('userId', '');
  //   }
  // }
}