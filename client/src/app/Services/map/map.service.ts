import { Injectable } from '@angular/core';
var geocluster = require("geocluster");
import { createClient } from '@google/maps'

@Injectable()
export class MapService {

  GeocodingApiKey = "AIzaSyAD7nHhdViAzK9KMSAY8YgSNYmixN1wv9c"

  mapsClient = undefined

  constructor() {
    this.mapsClient = createClient({
      key: "AIzaSyAD7nHhdViAzK9KMSAY8YgSNYmixN1wv9c",
      Promise: Promise
    })
   }

   addressToLatLong(address: string) {
    return this.mapsClient.geocode({
      address: address
    }).asPromise()
  }

  addressesToLatLong(addresses: Array < string > ): Promise < Array < google.maps.LatLng >> {

    let distinctedAddresses = addresses.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });

    let LatLongOfAllLocations = []

    distinctedAddresses.forEach(currentAddress => {
      LatLongOfAllLocations.push(this.addressToLatLong(currentAddress))
    });

    return Promise.all(LatLongOfAllLocations).then((values) => {
      return values.map(val => val.json.results[0].geometry.location)
    });
  }

  latLngToPrimitivesArray(locations: Array < google.maps.LatLng > ) {
    return locations.map(location => {
      return [location.lat, location.lng]
    })
  }

  primitiveToLatlng(lat, lng) : google.maps.LatLng {
    return new google.maps.LatLng(lat, lng)
  }


  removeOutliers(locations: Array < google.maps.LatLng >, bias: number = 1 ): Array < google.maps.LatLng > {
    let locationsInPrimitiveForm = this.latLngToPrimitivesArray(locations)
    var result = geocluster(locationsInPrimitiveForm, bias)
    var biggestClusterIIndex = result.reduce((maxIndex, currentElement,i,arr) => {
      return currentElement.elements.length > result[maxIndex].elements.length ? i : maxIndex 
    }, 0)

    return result[biggestClusterIIndex].elements.map(latlng => this.primitiveToLatlng(latlng[0], latlng[1]))
  }
}
