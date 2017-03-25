import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { GeoResult } from '../model/map/Georesult';

@Injectable()
export class MapService {

    private actionGeoUrl: string;
    private country: string;
    private key: string;
    private headers: Headers;


    constructor(private http: Http) {

        //this.actionGeoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDIOOFmNwUnVQDm9jY7_brrYn5QDQukfog";
        this.actionGeoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        this.country = ",+paris,+FR";
        this.key = "&key=AIzaSyDIOOFmNwUnVQDm9jY7_brrYn5QDQukfog";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getGeoResult(address: string): Observable<GeoResult> {
        let _address = this.actionGeoUrl + this.handleAddress(address) + this.country + this.key;
        return this.http.get(_address)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleAddress(_address: string) {
        if (_address.indexOf("address") > 0) {
            _address = _address.replace("address", "");
        }
        return _address.replace(/ /g, "+");
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}