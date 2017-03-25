import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
declare var google: any;

@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.component.html'
})
export class SearchBarComponent implements OnInit {

    selectedCitySelector = 'paris';
    cities = [{ selector: 'paris', name: 'paris' }];
    address: string = "";


    constructor(
        private router: Router) { }

    ngOnInit(): void {
        var searchText = document.getElementById('address');
        var paris = new google.maps.LatLng(48.856614, 2.3522219000000177);
        var place = new google.maps.LatLngBounds(
            paris
        );
        var options = {
            bounds: place,
            componentRestrictions: { country: 'fr' }
        };
        var address = new google.maps.places.Autocomplete(searchText, options);
        address.addListener('place_changed', function () {
            var place = address.getPlace();
            var latlng = document.getElementById('latlng');
            latlng.innerHTML = place.geometry.location.lat() + "-" + place.geometry.location.lng();
        });
    }


    gotoSearch(): void {
        let latlng = document.getElementById('latlng').innerHTML;
        let link;
        if (latlng == "") {
            link = ['/search', ""];
        } else {
            link = ['/search', latlng];
        }
        this.router.navigate(link);
    }

}