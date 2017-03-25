import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Walk } from '../../model/walk/Walk';
import { WayPoint } from '../../model/walk/WayPoint';
import { WalkService } from '../../services/walk.service';
import { Marker } from '../../model/common/marker';
import { Review } from '../../model/walk/review';
import { Segment } from '../../model/walk/segment';
import { Feature } from '../../model/walk/feature';
import { Description } from '../../model/walk/description';
import { Router } from '@angular/router';

declare var google: any;

@Component({
    selector: 'walk',
    templateUrl: 'walk.component.html'

})
export class WalkComponent implements OnInit {

    name: string;
    summary: string;
    user: string;
    segment: Segment;
    feature: Feature;
    descriptions: Description[];
    reviews: Review[];
    errorMessage: string;

    constructor(
        private walkService: WalkService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                return this.walkService.getWalk(params['id'])
            })
            .subscribe(
            walk => {
                this.name = walk.path.name;
                this.summary = walk.path.summary;
                this.user = walk.path.user;
                this.segment = walk.path.segment;
                this.feature = walk.path.feature;
                this.descriptions = walk.path.descriptions;
                this.reviews = walk.path.reviews;
                this.showMap(walk.path.segment, walk.path.descriptions);
            },
            error => {
                this.errorMessage = "error";
                let link = ['/search', ""];
                this.router.navigate(link);
            }
            );
    }

    showMap(segment: Segment, descriptions: Description[]) {

        let markerValues = this.extractMaker(segment.waypoints);
        descriptions.sort(function (a, b) {
            if (a.position > b.position)
                return 1;
            if (a.position < b.position)
                return -1;
            return 0;
        })

        var map = new google.maps.Map(document.getElementById('map'), {
            center: segment.origin,
            scrollwheel: false,
            zoom: 7,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            }
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });
        // Set destination, origin and travel mode.     styleUrls: ['walk.component.css']
        var request = {
            destination: segment.destination,
            origin: segment.origin,
            travelMode: google.maps.TravelMode.WALKING,
            waypoints: markerValues,
            optimizeWaypoints: true
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                // For each route, display summary information.
                var summaryPanel = document.getElementById('directions-panel');
                if (summaryPanel !== null) {
                    for (var i = 0; i < route.legs.length; i++) {
                        var routeSegment = i + 1;

                        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                            '</b><br>';
                        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                        summaryPanel.innerHTML += descriptions[i].text + '<br>';
                        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    }
                }

            }
        });
    }

    extractMaker(waypoints: WayPoint[]): Marker[] {
        let markerValues = new Array<Marker>();
        waypoints.sort(function (a, b) {
            if (a.position > b.position)
                return 1;
            if (a.position < b.position)
                return -1;
            return 0;
        })
        for (let p of waypoints) {
            let markerValue = new Marker();
            markerValue.location = p;
            markerValues.push(markerValue);
        }
        return markerValues;
    }


}