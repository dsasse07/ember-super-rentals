import EmberRouter from '@ember/routing/router';
import config from 'super-rentals/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // adds /about as a valid route
  this.route('about');
  // Will load the contact.hbs template at route /getting-in-touch
  this.route('contact', { path: 'getting-in-touch' });
  // A Dynamic route using :rental_id slug
  this.route('rental', { path: '/rentals/:rental_id' });
});
