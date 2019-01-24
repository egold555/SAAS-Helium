import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
    
     login() {
        console.log("Login clicked");
        this.navCtrl.setRoot(LoginPage);
    }
    
    signup(){
        console.log("Signup clicked");
        this.navCtrl.setRoot(HomePage);
    }
    

}
