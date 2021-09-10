import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface RentalsArgs {}

export default class Rentals extends Component<RentalsArgs> {
  @tracked query: string = '';
}
