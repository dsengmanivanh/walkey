import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'search-filter',
    templateUrl: 'search-filter.component.html',
    styleUrls: ['search-filter.component.css']

})
export class SearchFilterComponent {

    @Output() weatherChange = new EventEmitter();

    public weatherValue = [
        { value: 'SUN', display: 'sun' },
        { value: 'RAIN', display: 'rain' },
        { value: 'SNOW', display: 'snow' },
        { value: 'ALL', display: 'all' }
    ];

    private sendWeather(weather) {
        console.log("search filter");
        this.weatherChange.emit(weather);
    }
}


