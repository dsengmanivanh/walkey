import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Walk } from '../model/walk/walk';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WalkService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {

        this.actionUrl = "http://localhost:3000/api/walks";
        //this.actionUrl = "https://arcane-reef-87409.herokuapp.com/api/walks";

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    getWalks(): Observable<Walk[]> {
        return this.http.get(this.actionUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getWalk(id: string): Observable<Walk> {
        return this.http.get(this.actionUrl + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addWalk(newWalk) {
        return this.http.post(this.actionUrl, JSON.stringify(newWalk), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
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