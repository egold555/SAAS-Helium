import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  shownGroup = null;
  shownGroup1 = null;

  sublevel='yes';
  sublevel1='no';


  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  submenus: Array<{title: string, component: any, icon:any}>;
  mainmenus: Array<{title: string, component: any, icon:any}>;
  submenus1: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

    this.mainmenus = [ 
      { title: 'Car Type', component: "selectCarPage" ,icon:"car"},
      { title: 'Work / Home', component: "workHomePage" , icon:"filing"},
        { title: 'Friends / Family', component: "FriendsFamilyPage" , icon:"contacts"},
    ];
    this.submenus = [ 
      { title: 'Icon Size', component: "IconSizePage", icon:"contract" },
      { title: 'Traffic Colors', component: "TrafficCOlorsPage", icon:"color-palette" },
      
    ];
    this.submenus1 = [ 
      { title: 'Visa ****3254', component: "SelectCard1" ,icon:"radio-button-on"},
      { title: 'Debit ****9812', component: "SelectCard2" , icon:"radio-button-off"},
        { title: 'Add Card', component: "AddCard" , icon:"add-circle-outline"},
    ];

  } 

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleGroup(group) {
    console.log("Group  "+group);
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
        this.shownGroup1 = null;
    }
  }
  isGroupShown(group) {
      return this.shownGroup === group;
  }

  toggleGroup1(group) {
    console.log("Group  "+group);
    if (this.isGroupShown1(group)) {
        this.shownGroup1 = null;

    } else {
        this.shownGroup1 = group;
        this.shownGroup = null;
    }
  }
  isGroupShown1(group) {
      return this.shownGroup1 === group;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
