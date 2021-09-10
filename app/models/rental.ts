import Model, { attr } from '@ember-data/model';

const COMMUNTY_TYPES = new Set(['Condo', 'Townhouse', 'Apartment']);

export default class Rental extends Model {
  @attr declare title: string;
  @attr declare owner: string;
  @attr declare city: string;
  @attr declare location: {
    lat: number;
    lng: number;
  };
  @attr declare category: string;
  @attr declare image: string;
  @attr declare bedrooms: number;
  @attr declare description: string;

  get type() {
    return COMMUNTY_TYPES.has(this.category) ? 'Community' : 'Standalone';
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    rental: Rental;
  }
}
