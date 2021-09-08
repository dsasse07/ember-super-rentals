import Route from '@ember/routing/route';

const COMMUNTY_TYPES = new Set(['Condo', 'Townhouse', 'Apartment']);

export default class IndexRoute extends Route {
  /*
  Model hook is responsible for fetching and preparing
  data needed for a route. The returned object is known
  as the "model" for the route.

  Normally this requires a fetch from a server, so it is async
  */

  async model() {
    return fetch('/api/rentals.json')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const rentals = json.data;

        return rentals.map((rental) => {
          const { id, attributes } = rental;
          const type = COMMUNTY_TYPES.has(attributes.category)
            ? 'Community'
            : 'Standalone';
          return { id, type, ...attributes };
        });
      });

    /* 
    OR

    let res = await fetch('/api/rentals.json');
    let json = await res.json();
    return json;
    */
  }
}
