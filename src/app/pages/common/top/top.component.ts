import { Component, OnInit } from '@angular/core';
import { Walk } from '../../../model/walk/Walk';
import { WalkService } from '../../../services/walk.service';

@Component({
    selector: 'top-walk',
    templateUrl: 'top.component.html',
    styleUrls: ['top.component.css']

})
export class TopComponent implements OnInit {

    errorMessage: string;
    walks: Walk[] = [];
    name: string;

    constructor(private walkService: WalkService) { }

    ngOnInit(): void {
        this.getWalks();
    }

    getWalks() {
        this.walkService.getWalks()
            .subscribe(
            walks => this.walks = walks,
            error => this.errorMessage = <any>error);
    }

}
