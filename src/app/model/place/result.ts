import { AddressComponent } from './AddressComponent'
import { Geometry } from './Geometry'
import { Photo } from './Photo'

export class Result {
    address_components: Array<AddressComponent>;
    adr_address: string;
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    id: string;
    photos: Array<Photo>;
    place_id: string;
    reference: string;
    scope: string;
    types: Array<string>;
    url: string;
    utc_offset: number;
    vicinity: string;

}