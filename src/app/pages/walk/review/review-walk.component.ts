import { Component, Input } from '@angular/core';
import { Review } from '../../../model/walk/Review';

@Component({
    selector: 'review-walk',
    templateUrl: 'review-walk.component.html',
    styleUrls: ['review-walk.component.css']
})
export class ReviewWalkComponent {

    @Input() reviewsValue: Review[];

    getReviewsValue(){
        return this.reviewsValue;
    }

    setReviewsValue(value){
        this.reviewsValue = value;
    }
}