import { Component } from '@angular/core';
// import { SrvRecord } from 'dns';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  weather = {
    temperature: Number.NaN,
    summary: 'No Data'
  };

  specialCoffee = [] as {
    id: number,
    name: string,
    price: number,
    describe: string,
    categoryId: number,
    imageUrl: string
  }[];

  constructor() { }

  ionViewDidEnter() {
    navigator.geolocation.getCurrentPosition(async (info) => {
      var response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather' +
        '?lat=' + info.coords.latitude +
        '&lon=' + info.coords.longitude +
        '&units=metric' +
        '&appid=f059d4910da6b24c75b92691504099d5',
        {
          method: 'GET'
        }
      );
      var result = await response.json();
      this.weather.temperature = +result.main.temp.toFixed(1);
      this.weather.summary = result.weather[0].main;
      this.special_menu(this.weather.temperature);
    });
  }
  async special_menu(temp){
    var response = await fetch(
      'http://localhost:30000/coffeeweather/'+ this.weather.temperature,
      {
        method: 'GET'
      }
    );
    this.specialCoffee = await response.json();


  }

//   special_codffee1 = [
//     {
//       id: 11,
//       name: "Kitty Q Latte",
//       price: 12.34,
//       describe: "Coffee with milk",
//       categoryId: 1,
//       imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
//   },
//   {
//     id: 21,
//     name: "Meow Cappuccino",
//     price: 31.24,
//     describe: "Coffee with double milk",
//     categoryId: 2,
//     imageUrl: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
// },
// {
//   id: 31,
//   name: "Hairy Tail Espresso",
//   price: 43.21,
//   describe: "Coffee without milk",
//   categoryId: 3,
//   imageUrl: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
// }
//   ]

// special_codffee2= [
//   {
//     id: 12,
//     name: "Pure Cute Latte",
//     price: 12.34,
//     describe: "Coffee with milk",
//     categoryId: 1,
//     imageUrl: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
// },
// {
//   id: 22,
//   name: "Kitty ears Cappuccino",
//   price: 31.24,
//   describe: "Coffee with double milk",
//   categoryId: 2,
//   imageUrl: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
// },
// {
//   id: 32,
//   name: "Glassbead Kiss Espresso",
//   price: 43.21,
//   describe: "Coffee without milk",
//   categoryId: 3,
//   imageUrl: "https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
// }
// ]
/*  
  special(){
    var imSRC: string;
    var picNAAME: String;
    if(this.weather.temperature > 0){
      document.getElementById("img1").innerHTML = this.special_codffee1[0].imageUrl;
      document.getElementById("lab1").innerHTML = this.special_codffee1[0].name;
      document.getElementById("img2").innerHTML = this.special_codffee1[1].imageUrl;
      document.getElementById("lab2").innerHTML = this.special_codffee1[1].name;
      document.getElementById("img3").innerHTML = this.special_codffee1[2].imageUrl;
      document.getElementById("lab3").innerHTML = this.special_codffee1[2].name;

    }else{
      document.getElementById("img1").innerHTML = this.special_codffee2[0].imageUrl;
      document.getElementById("lab1").innerHTML = this.special_codffee2[0].name;
      document.getElementById("img2").innerHTML = this.special_codffee2[1].imageUrl;
      document.getElementById("lab2").innerHTML = this.special_codffee2[1].name;
      document.getElementById("img3").innerHTML = this.special_codffee2[2].imageUrl;
      document.getElementById("lab3").innerHTML = this.special_codffee2[2].name;

    }
  }
*/
}
