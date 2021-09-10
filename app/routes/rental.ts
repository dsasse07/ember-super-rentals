import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RentalRoute extends Route {
  @service declare store;

  async model(params: { [key: string]: string }) {
    return this.store.findRecord('rental', params.rental_id);
  }
}
