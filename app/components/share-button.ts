import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

interface ShareButtonArgs {
  text?: string;
  hashtags?: string;
  via?: string;
}

const TWEET_INTENT = 'https:twitter.com/intent/tweet';

export default class ShareButton extends Component<ShareButtonArgs> {
  @service declare router: RouterService;

  get currentURL() {
    // return window.location.href;
    // arg1 = route, arg2 = optional base url
    return new URL(this.router.currentURL, window.location.origin);
  }

  get shareURL() {
    let baseUrl = new URL(TWEET_INTENT);
    baseUrl.searchParams.set('url', this.currentURL.toString());

    if (this.args.text) {
      baseUrl.searchParams.set('text', this.args.text);
    }

    if (this.args.hashtags) {
      baseUrl.searchParams.set('hashtags', this.args.hashtags);
    }

    if (this.args.via) {
      baseUrl.searchParams.set('via', this.args.via);
    }

    return baseUrl;
  }
}
