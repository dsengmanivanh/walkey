import { Component, Input } from '@angular/core';


@Component({
    selector: 'feature-walk',
    templateUrl: 'feature-walk.component.html',
    styleUrls: ['feature-walk.component.css']

})
export class FeatureWalkComponent {

    @Input() featureValue: string;

    getFeatureValue(){
        return this.featureValue;
    }
    setFeatureValue(value){
        this.featureValue = value;
    }
}
