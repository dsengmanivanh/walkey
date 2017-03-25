import { Component } from '@angular/core';
import { Profile } from '../../model/common/profile';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
declare var gapi: any;

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    connected: boolean;

    constructor(
        private router: Router) { }

    onGoogleSign(profile: Profile) {
        if (profile != null) {
            console.log("on rentre");
            console.log("profile.name=" + profile.name);
            console.log("profile.id=" + profile.id);
            console.log("profile.imageUrl=" + profile.imageUrl);
            console.log("profile.mail=" + profile.mail);
            this.connected = true;
            let link = ['/dashboard', ""];
            this.router.navigate(link);
        } else {
            this.connected = false;
        }
        console.log("connected=" + this.connected);
    }



    onFacebookSign(profile: Profile) {
        if (profile != null) {
            console.log("profile.name=" + profile.name);
            console.log("profile.id=" + profile.id);
            console.log("profile.imageUrl=" + profile.imageUrl);
            console.log("profile.mail=" + profile.mail);
            this.connected = true;
            let link = ['/dashboard', ""];
            this.router.navigate(link);
        } else {
            this.connected = false;
        }
        console.log("connected=" + this.connected);
    }

}
