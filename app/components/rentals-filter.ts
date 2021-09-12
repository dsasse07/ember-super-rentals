import Component from '@glimmer/component';

interface RentalsFilterArgs {
  rentals: any[];
  query: string;
}

export default class RentalsFilter extends Component<RentalsFilterArgs> {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      rentals = rentals.filter((rental) => rental.title.includes(query));
    }

    return rentals;
  }
}
