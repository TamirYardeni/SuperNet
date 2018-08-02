import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';
import { UserService } from '../Services/user/user.service'
import { MapService } from '../Services/map/map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  selectedItinerariesGeolocations: Array<object> = undefined;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  markers: Array<google.maps.Marker> = []

  constructor(private geoLocationService: MapService,
              private userService: UserService) { }

  ngOnInit() {
    debugger;
    var latlng = new google.maps.LatLng(-34.397, 150.644);

    var mapProp = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    this.userService.address.subscribe(itinerary => {
      if(itinerary) {
        let arr: Array<string>=[itinerary];
        this.geoLocationService.addressesToLatLong(arr)
          .then(res => {
            this.selectedItinerariesGeolocations = res;
            this.deleteMarkers()
            this.markers = res.map<google.maps.Marker>(geoLocation => {
              //this.map.setCenter(new google.maps.LatLng(geoLocation.lat(), geoLocation.lng()));
              this.map.setCenter(geoLocation);
              var marker = new google.maps.Marker({
                position: geoLocation,
                map: this.map
              });

              return marker;
            })

            console.log(this.markers);
          })
      }
    });

    const that = this;
  }

  deleteMarkers() {
    this.markers.forEach(marker => marker.setMap(undefined))
    this.markers = []
  }

}
