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

  submenus: Array<{title: string, component: any}>;
  mainmenus: Array<{title: string, component: any, icon:any}>;
  mainmenus1: Array<{title: string, component: any, icon:any}>;
  submenus1: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

    this.mainmenus = [ 
      { title: 'General', component: "PatientReceptionPage" ,icon:""},
      { title: 'Payment', component: "PatientReceptionPage" , icon:""},
    ];
    this.submenus = [ 
      { title: 'SUB MENU 1', component: "AddBillingCategoryPage" },
      { title: 'SUB MENU 2', component: "AddSpecialityPage" },
      { title: 'SUB MENU 3', component: "AddMedicinePage" },
      
    ];
    this.mainmenus1 = [ 
      { title: 'Work / Home', component: "PatientReceptionPage" ,icon:""},
      { title: 'Friends / Family', component: "PatientReceptionPage" , icon:""},
    ];
    this.submenus1 = [ 
      { title: 'SUB MENU 4', component: "PatientReceptionPage" ,icon:""},
      { title: 'SUB MENU 5', component: "PatientReceptionPage" , icon:""},
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
