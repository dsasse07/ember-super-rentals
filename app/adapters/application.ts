import DS from 'ember-data';

export default class Application extends DS.JSONAPIAdapter.extend({
  // anything which *must* be merged on the prototype
}) {
  // Part of the JSONAPIAdapter API
  // adds /api/ to the url
  namespace = 'api';

  // Override buildUrl to include the needed .json
  // super.buildUrl() calls the original method, which would
  // return /api/rentals. Our override adds .json
  buildURL(...args: any[]) {
    return `${super.buildURL(...args)}.json`;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: Application;
  }
}
