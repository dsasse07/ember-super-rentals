import Route from '@ember/routing/route';

const COMMUNTY_TYPES = new Set(['Condo', 'Townhouse', 'Apartment']);

export default class RentalRoute extends Route {
  async model(params: { [key: string]: string }) {
    return fetch(`/api/rentals/${params.rental_id}.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw 'Unable to parse';
        }
      })
      .then((json) => {
        const rental = json.data;
        const { id, attributes } = rental;
        const type = COMMUNTY_TYPES.has(attributes.category)
          ? 'Community'
          : 'Standalone';
        return { id, type, ...attributes };
      })
      .catch((err) => console.log(err));
  }
}
