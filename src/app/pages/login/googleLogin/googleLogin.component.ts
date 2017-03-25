import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Profile } from '../../../model/common/profile';
declare var gapi: any;


@Component({
    selector: 'googleLogin',
    templateUrl: 'googleLogin.component.html',
    styleUrls: ['googleLogin.component.css']
})
export class GoogleLoginComponent {

    profile: Profile;
    @Output() onGoogleSign = new EventEmitter();

    public auth2: any;

    constructor(
        private zone: NgZone
    ) { }

    public googleInit() {
        let that = this;
        gapi.load('auth2', function() {
            that.auth2 = gapi.auth2.init({
                client_id: '291577172127-d9vnufbg8qh75ar328g8asdkqmm0079i.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            that.attachSignin(document.getElementById('googleBtn'));
        });
    }

    public attachSignin(element) {
        let that = this;
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
                this.zone.run(() => {
                    let profile = googleUser.getBasicProfile();
                    //console.log('Token || ' + googleUser.getAuthResponse().id_token);
                    //document.getElementById("profileImageGoogle").setAttribute("src", profile.getImageUrl());
                    that.profile = new Profile();
                    that.profile.name = profile.getName();
                    that.profile.id = profile.getId();
                    that.profile.imageUrl = profile.getImageUrl();
                    that.profile.mail = profile.getEmail();
                    that.onGoogleSign.emit(that.profile);
                });
            }, function(error) {
                alert(JSON.stringify(error, undefined, 2));
            });
    }

    public signOut() {
        let that = this;
        this.auth2.signOut().then(() => {
            this.zone.run(() => {
                console.log('User signed out.');
                that.profile = null;
                that.onGoogleSign.emit(that.profile);
            });
        });
    };

    ngAfterViewInit() {
        this.googleInit();
    }

}
