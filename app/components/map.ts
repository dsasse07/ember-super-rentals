import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

interface MapArgs {
  lng: number;
  lat: number;
  width: number;
  height: number;
  zoom: number;
}

const MAPBOX_URL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export default class Map extends Component<MapArgs> {
  // Getters cannot be marked as tracked, but all args in this.args
  // Are automatically marked as tracked and getters will
  // be re-computed if they change

  get src() {
    let { lng, lat, width, height, zoom } = this.args;

    let coords = `${lng},${lat},${zoom}`;
    let dimensions = `${width}x${height}`;
    let access = `access_token=${this.token}`;

    return `${MAPBOX_URL}/${coords}/${dimensions}@2x?${access}`;
  }

  get token() {
    const token = ENV.APP.MAPBOX_ACCESS_TOKEN;
    if (typeof token === 'string') {
      return encodeURIComponent(token);
    }
    return null;
  }
}
