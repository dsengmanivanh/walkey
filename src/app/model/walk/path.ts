import { Segment } from './Segment';
import { Feature } from './Feature';
import { Description } from './Description';
import { Review } from './Review';

export class Path {
  name: string;
  summary: string;
  segment: Segment;
  feature: Feature;
  descriptions: Array<Description>;
  reviews: Array<Review>;
  user: string;
  color: string;
  average:number;
}