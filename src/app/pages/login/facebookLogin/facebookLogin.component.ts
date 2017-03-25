import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Profile } from '../../../model/common/profile';
declare var FB: any;

@Component({
    selector: 'facebookLogin',
    templateUrl: 'facebookLogin.component.html',
    styleUrls: ['facebookLogin.component.css']
})
export class FacebookLoginComponent {

    profile: Profile;
    @Output() onFacebookSign = new EventEmitter();

    constructor(
        private zone: NgZone
    ) { }

    ngOnInit() {
        FB.init({
            appId: '981441135324170',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
        FB.AppEvents.logPageView();
    }

    login() {
        let that = this;
        FB.login(function(response) {
            console.log("rentre dans checkLoginState");
            that.statusChangeCallback(response);
        }, { scope: 'public_profile,email' });
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            console.log("connected");
            // Logged into your app and Facebook.
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    }

    testAPI() {
        let that = this;
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=name,email', (response) => {
            this.zone.run(() => {
                //document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
                //document.getElementById('username').innerHTML = response.name;
                that.profile = new Profile();
                that.profile.name = response.name;
                that.profile.id = response.id;
                that.profile.imageUrl = "http://graph.facebook.com/" + response.id + "/picture?type=normal";
                that.profile.mail = response.email;
                that.onFacebookSign.emit(that.profile);
            });
        });
    }

    signOutFB() {
        let that = this;
        FB.logout((response) => {
            this.zone.run(() => {
                // Person is now logged out
                //console.log('responsefb=' + response.authResponse.userID);
                that.profile = null;
                that.onFacebookSign.emit(that.profile);
                //document.getElementById('status').innerHTML ='Thanks for logging out, ' + response.name + '!';
            });

        });
    }

}
