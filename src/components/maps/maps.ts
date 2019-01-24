import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable'
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HeliumData} from './data';

declare var google : any;

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent implements OnInit{

  @Input() isPickupRequested : boolean;
  @Input() destination;

  public map;
  public isMapIdle : boolean;
  public currentLocation;
    
  constructor(public geolocation : Geolocation,
              public loadingCtrl : LoadingController, public http: Http) {
    console.log('Hello MapsComponent Component');
      
  }

  ngOnInit(){
    this.map =this.createMap();
    this.addMapEventListeners();

    this.getCurrentLocation().subscribe(location => {
      this.map.setCenter(location);
    })
  }

  updatePickupLocation(location){
    this.currentLocation = location;
    this.centerLocation(location);
  }

  addMapEventListeners(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }


  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content:'Locating...'
    });

    loading.present();

    let options = {timeout : 10000 , enableHighAccuracy:true};
    let locationObs = new Observable(observable => {
      this.geolocation.getCurrentPosition(options)
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        console.log('lat '+ lat +' == '+ 'long '+lng )
        let location = new google.maps.LatLng(lat, lng);
        console.log('current location '+location)
        observable.next(location);

        loading.dismiss();
       },
       (err) => {
         console.log('Geolocation err: '+ err.message); //Not sure why this occurrs but I get a position error
         loading.dismiss();
       })
    })
    return locationObs;
  }

    addPin(map:any, location:any, img:any, text:any){
        let marker = new google.maps.Marker({
          map: map,
        //  animation: google.maps.Animation.DROP,
          position: location,
            icon: 'http://10.10.193.114:8080/icons/' + img + '.png'
        });
      
      let infoWindow = new google.maps.InfoWindow({
      content: text
    });
        
        google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
        
        //console.log("Pin added: " + JSON.stringify(location))
        
    }
    

  createMap(location = new google.maps.LatLng(47.6128703,-122.3154972)){
    console.log('init location ' + location)
    let mapOptions = {
      center: location,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);
      
    this.addPin(map, map.getCenter(), "you", "You");

//    for(var x = 0; x < 10; x++){
//        for(var y = 0; y < 10; y++){
//            this.addPin(map, new google.maps.LatLng(47.6128703 + x,-122.3154972 + y), "TESTING")
//        }
//    }
      var self = this; //https://stackoverflow.com/questions/29626729/how-to-function-call-using-this-inside-foreach-loop
      JSON.parse(HeliumData.JSON_DATA).forEach(function(obj) { 
          //console.log(obj.X + " " + obj.Y + " " ); 
          //console.log("--------------------------"); 
          let icon = "spots/";
          
          let randomIconNumber = self.randomInt(1, 12);
          
          let text = obj.UNITDESC;
          
          if(randomIconNumber == 1){
              icon+= "parking";
          }
          else if(randomIconNumber == 2){
              icon+= "parking_bicycle";
          }
          else if(randomIconNumber == 3){
              icon+= "parking_disabled";
          }
          else if(randomIconNumber == 4){
              icon+= "parking_garage";
          }
          else if(randomIconNumber == 5){
              icon+= "premium_parking";
              text = "<b>Premium</b> " + text;
          }
          else if(randomIconNumber == 6){
              icon+= "premium_parking_bicycle";
              text = "<b>Premium</b> " + text;
          }
          else if(randomIconNumber == 7){
              icon+= "premium_parking_disabled";
              text = "<b>Premium</b> " + text;
          }
          else if(randomIconNumber == 8){
              icon+= "premium_parking_garage";
              text = "<b>Premium</b> " + text;
          }
          else if(randomIconNumber == 9){
              icon+= "taken_parking";
              text = "<b>TAKEN</b> " + text;
          }
          else if(randomIconNumber == 10){
              icon+= "taken_parking_bicycle";
              text = "<b>TAKEN</b> " + text;
          }
          else if(randomIconNumber == 11){
              icon+= "taken_parking_disabled";
              text = "<b>TAKEN</b> " + text;
          }
          else if(randomIconNumber == 12){
              icon+= "taken_parking_garage";
              text = "<b>TAKEN</b> " + text;
          }
          
          
          
          
          
          self.addPin(map, new google.maps.LatLng(obj.Y, obj.X), icon, text);
      });
      
    return map;
  }
    
     randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

  centerLocation(location){
    if(location){
      this.map.setCenter(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.setCenter(currentLocation);
      })
    }
  }
}
