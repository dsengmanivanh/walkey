import { Component, Input } from '@angular/core';

@Component({
    selector: 'presentation-walk',
    templateUrl: 'presentation-walk.component.html',
    styleUrls: ['presentation-walk.component.css']

})
export class PresentationWalkComponent {

    @Input() nameValue: string;

    @Input() summaryValue: string;

    @Input() userValue: string;

    @Input() averageValue: string;

    @Input() walkIdValue: string;

    getNameValue() {
        return this.nameValue;
    }
    setNameValue(value) {
        this.nameValue = value;
    }

    getSummaryValue() {
        return this.summaryValue;
    }
    setSummaryValue(value) {
        this.summaryValue = value;
    }

    getUserValue() {
        return this.userValue;
    }
    setUserValue(value) {
        this.userValue = value;
    }

    getAverageValue() {
        return this.averageValue;
    }
    setAverageValue(value) {
        this.averageValue = value;
    }

    getWalkIdValue() {
        return this.walkIdValue;
    }

    setWalkIdValue(value) {
        this.walkIdValue = value;
    }
}
