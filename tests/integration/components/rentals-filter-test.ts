import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rentals-filter', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <RentalsFilter 
        @rentals={{rentals}}
        @query=''
      />
    `);

    assert.dom(this.element).exists();
  });
});
