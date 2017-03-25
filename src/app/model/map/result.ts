import { AddressComponent } from './AddressComponent'
import { Geometry } from './Geometry'

export class Result {
    address_components: Array<AddressComponent>;
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: Array<string>;

}