import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { GeoResult } from '../../model/map/Georesult';
import { WayPoint } from '../../model/walk/WayPoint';
import { WalkService } from '../../services/walk.service';
import { Walk } from '../../model/walk/walk';
import { Marker } from '../../model/common/marker';
import { Point } from '../../model/common/point';
import { Pin } from '../../model/common/pin';
import { Router } from '@angular/router';
declare var google: any;

@Component({
    selector: 'search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

    address: string;
    errorMessage: string;
    name: string;
    summary: string;
    user: string;

    markers: Array<Pin>;
    northEast: Point;
    southWest: Point;
    walkAround: Walk[];
    walks: Walk[] = [];
    default: boolean = false;

    weather: string = "ALL";

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private walkService: WalkService,
        private router: Router,
        private zone: NgZone
    ) { }

    ngOnInit(): void {
        this.weather= "ALL";
        this.route.params.subscribe(
                (params: Params) => {
                    let lat = 48.85661400000001;
                    let lng = 2.3522219000000177;
                    this.default = true;
                    if(params['lnglat'] != ""){
                        let param: string = params['lnglat'].split("-");
                        if(param.length>1){
                            lat = +param[0];
                            lng = +param[1];
                            this.default = false;
                        }
                    }
                    this.errorMessage = "none";
                    this.showMap(lat, lng)
                },
                error => {
                    this.errorMessage = "error";
                }
            );
    }

    private showMap(_lat: number, _lng: number) {
        let myLatLng = { lat: _lat, lng: _lng };
        let zoom: number = this.default ? 13 : 17;
        let map = new google.maps.Map(document.getElementById('mapsearch'), {
            zoom: zoom,
            scrollwheel: false,
            center: myLatLng,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            }
        });

        map.addListener('bounds_changed', () => {
            this.zone.run(() => {
                this.northEast = new Point(map.getBounds().getNorthEast().lat(), map.getBounds().getNorthEast().lng());
                this.southWest = new Point(map.getBounds().getSouthWest().lat(), map.getBounds().getSouthWest().lng());
                this.onWeatherChanged(this.weather);
            });
        });

        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });

        this.addMarkers(map);

    }

    private addMarkers(map) {
        this.walkService.getWalks()
            .subscribe(
            w => {
                this.walks = w;
                this.withAverage();
                this.markers = new Array<Pin>();
                var infowindow = new google.maps.InfoWindow();
                for (let walk of w) {
                    let origin: WayPoint = walk.path.segment.origin;
                    var marker = new google.maps.Marker({
                        position: { lat: origin.lat, lng: origin.lng },
                        map: map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    });

                    let pin: Pin = new Pin();
                    pin.id = walk._id;
                    pin.marker = marker;
                    this.markers.push(pin);

                    pin.marker.addListener('mouseover', function () {
                        this.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
                    });

                    pin.marker.addListener('mouseout', function () {
                        this.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
                    });
                
                    pin.marker.addListener('click', function () {
                        //var contentString = '<a href="https://arcane-reef-87409.herokuapp.com/walk/' + pin.id + '" target=_blank>go</a> ';
                        var contentString = '<a href="http://localhost:3000/walk/' + pin.id + '" target=_blank>go</a> ';
                        infowindow.setContent(contentString);
                        infowindow.open(this.get('mapsearch'), this);
                    });
                }
            },
            error => this.errorMessage = "error");
    }

    onWeatherChanged(value: string) {
        this.walkAround = this.around(this.northEast, this.southWest);
        this.weather = value;
        this.walkAround = this.withWeather(value);
    }



    public around(northEast: Point, southWest: Point): Walk[] {
        let aroundWalk = new Array<Walk>();
        for (let walk of this.walks) {
            if ((walk.path.segment.origin.lat < northEast.lat && walk.path.segment.origin.lat > southWest.lat) &&
                (walk.path.segment.origin.lng < northEast.lng && walk.path.segment.origin.lng > southWest.lng)) {
                aroundWalk.push(walk);
            }
        }
        return aroundWalk;
    }

    public withAverage() {
        this.walks.forEach(
            walk => {
                let average: number = this.calculateAverage(walk);
                walk.path.average = average;
            }
        );
    }

    private calculateAverage(_walk: Walk): number {
        let average: number = 0;
        for (let review of _walk.path.reviews) {
            average += review.rate
        }
        return average = average / _walk.path.reviews.length;
    }

    public withWeather(value: string): Walk[] {
        return value == "ALL" ? this.walkAround : this.walkAround.sort(
            function (a, b) {
                if (b.path.feature.weather == value) {
                    return 1;
                }
                if (b.path.feature.weather != value) {
                    return -1;
                }
                return 0;
            }
        );
    }
}

