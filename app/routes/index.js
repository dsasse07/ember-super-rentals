import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  // Inject the {service:store} so we can access the store
  @service store;

  /*
  Model hook is responsible for fetching and preparing
  data needed for a route. The returned object is known
  as the "model" for the route.

  Normally this requires a fetch from a server, so it is async
  */
  async model() {
    return this.store.findAll('rental');
  }

  /* 
    OR IF FETCHING

    return fetch('/api/rentals.json')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const rentals = json.data;
        return rentals;
      });

    let res = await fetch('/api/rentals.json');
    let json = await res.json();
    return json;
    */
}
