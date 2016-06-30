/* global moment */
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('baremetrics-calendar', 'Integration | Component | baremetrics calendar', {
  integration: true
});

test('it renders a single date', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let currentDate = new Date();
  this.set('currentDate', currentDate);
  this.on('changed', (newDate) => {
    assert.equal(Ember.typeOf(newDate), 'date', 'changed action returns a Date');
    assert.notEqual(currentDate.now, newDate.now, 'changed action returns updated Date');
  });

  this.render(hbs`{{baremetrics-calendar currentDate=currentDate onchange="changed"}}`);

  this.$().click();
  this.$('.dr-current').next('.dr-day').click();

  assert.equal(this.$('.dr-input').text().trim(), moment().add(1, 'day').format('MMMM D, YYYY'));

});
