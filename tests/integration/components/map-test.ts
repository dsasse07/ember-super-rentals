import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'super-rentals/config/environment';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified paramaters', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
      />
    `);

    // Destructures src from found element
    // @ts-ignore
    let { src } = find('.map img');
    let token = ENV.APP.MAPBOX_ACCESS_TOKEN;

    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the src starts with "https://api.mapbox.com/"'
    );

    assert.ok(
      src.includes('-122.4184,37.7797,10'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      src.includes('150x120@2x'),
      'the src should include the width,height and @2x parameter'
    );

    assert.ok(
      src.includes(`access_token=${token}`),
      'the src should include the escaped access token'
    );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        alt="A map of San Francisco"
      />
    `);

    assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
  });

  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        src="/assets/images/teaching-tomster.png"
        width="200"
        height="300"
      />
    `);

    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api\.mapbox\.com\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });

  test('it updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      lat: 37.7749,
      lng: -122.4194,
      zoom: 10,
      width: 150,
      height: 120,
    });

    await render(hbs`<Map
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let img = find('.map img');

    assert.ok(
      // @ts-ignore
      img.src.includes('-122.4194,37.7749,10'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      // @ts-ignore
      img.src.includes('150x120@2x'),
      'the src should include the width,height and @2x parameter'
    );
    /*
    'this' refers to a special test context object
    which we gain access to from the render-helper
    */
    this.setProperties({
      width: 300,
      height: 200,
      zoom: 12,
    });

    assert.ok(
      // @ts-ignore
      img.src.includes('-122.4194,37.7749,12'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      // @ts-ignore
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter'
    );

    this.setProperties({
      lat: 47.6062,
      lng: -122.3321,
    });

    assert.ok(
      // @ts-ignore
      img.src.includes('-122.3321,47.6062,12'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      // @ts-ignore
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter'
    );
  });
});
