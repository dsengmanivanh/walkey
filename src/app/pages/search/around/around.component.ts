import { Component, Input } from '@angular/core';
import { Walk } from '../../../model/walk/Walk';
import { Pin } from '../../../model/common/pin';
import { Point } from '../../../model/common/point';
declare var google: any;

@Component({
    selector: 'around',
    templateUrl: 'around.component.html'
})
export class AroundComponent {
    @Input() walksValue: Walk[];

    @Input() markersValue: Array<Pin>;


    getWalksValue() {
        return this.walksValue;
    }

    setWalksValue(value) {
        this.walksValue = value;
    }

    getMarkersValue() {
        return this.markersValue;
    }

    setMarkersValue(value) {
        this.markersValue = value;
    }

    private mouseOver(walkId: number): void {
        let _marker = this.markersValue.find(pin => pin.id == walkId.toString());
        new google.maps.event.trigger(_marker.marker, 'mouseover');
    }

    private mouseOut(walkId: number): void {
        let _marker = this.markersValue.find(pin => pin.id == walkId.toString());
        new google.maps.event.trigger(_marker.marker, 'mouseout');
    }

    private gotoWalkId(walkId: number): void {
        let url = "http://localhost:3000/walk/" + walkId;
        //let url ='https://arcane-reef-87409.herokuapp.com/walk/' + walkId;
        let win = window.open(url, '_blank');
        win.focus();
    }

}