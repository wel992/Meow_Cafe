import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
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

  async signUp() {
    var userObj = {
      name: this.user.username,
      password: this.user.password,
      phoneNum: this.user.phoneNum
    };
    var response = await fetch(
      'http://localhost:30000/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      this.user.userId = result.id;
      this.user.phoneNum = result.phoneNum;
      this.user.orders = result.orders;

      sessionStorage.setItem('userId', result.id);
    }
    else {
      alert("Fail signup");
      // sessionStorage.setItem('userId', '');
    }
  }
  backSignIn(){
    this.signUp();
    this.navController.navigateForward('tabs/user')
  }

}
