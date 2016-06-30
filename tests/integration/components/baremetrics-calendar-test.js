/* global moment */
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('baremetrics-calendar', 'Integration | Component | baremetrics calendar', {
  integration: true
});

test('it renders a single date', function(assert) {
  let done = assert.async();
  assert.expect(3);

  let currentDate = moment();
  this.set('currentDate', currentDate.toDate());
  this.on('changed', (newDate) => {
    assert.equal(Ember.typeOf(newDate), 'date', 'changed action returns a Date');
    assert.notEqual(currentDate.toISOString(), newDate.toISOString(), 'changed action returns updated Date');
  });

  this.render(hbs`{{baremetrics-calendar currentDate=currentDate onchange="changed"}}`);

  this.$('.dr-date').click();
  this.$('.dr-current').next('.dr-day').mousedown();

  Ember.run.later(() => {
    assert.equal(this.$('.dr-input').text().trim(), format(currentDate.add(1, 'day')), 'renders updated date');
    done();
  }, 10);
});

test('it renders a date range', function(assert) {
  let done = assert.async();
  assert.expect(5);

  let startDate = moment().subtract(1, 'week');
  let endDate = moment();
  this.set('startDate', startDate.toDate());
  this.set('endDate', endDate.toDate());
  this.on('changed', (result) => {
    assert.equal(Ember.typeOf(result.startDate), 'date', 'changed action returns a start date');
    assert.equal(Ember.typeOf(result.endDate), 'date', 'changed action returns a end date');
    assert.notEqual(endDate.toISOString(), result.endDate.toISOString(), 'changed action returns updated startDate');
  });

  this.render(hbs`{{baremetrics-calendar startDate=startDate endDate=endDate onchange="changed"}}`);

  assert.equal(this.$('.dr-input').text().trim(), `${ format(startDate) }–${ format(endDate) }`, 'renders initially supplied date');

  this.$('.dr-date').click();
  this.$('.dr-end.dr-current').next('.dr-day').mousedown();

  Ember.run.later(() => {
    let expectedResult = `${ format(startDate) }–${ format(endDate.add(1, 'day')) }`;
    assert.equal(this.$('.dr-input').text().trim(), expectedResult, 'renders updated date');
    done();
  }, 10);
});


function format(date) {
  return moment(date).format('MMMM D, YYYY');
}
