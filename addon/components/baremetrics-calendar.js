/* global Calendar */

import Ember from 'ember';

const computed = Ember.computed;
const { equal } = Ember.computed;
const run = Ember.run;

/**
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: [
    'baremetrics-calendar',
    'daterange'
  ],

  // -------------------------------------------------------------------------
  // Events

  didRender() {
    this.set('calendar', this._buildCalendar());
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * When used as a single date picker, `currentDate` should be the value of the
   * currently selected date.
   *
   * @type {Date}
   */
  currentDate: null,

  /**
   * When used as a double date picker (i.e. date ranges), `startDate` should be
   * the value of the currently selected start date.
   *
   * Note: this value is purposely set to `undefined` as a default. See the
   * `type` property for why.
   *
   * @type {Date}
   */
  startDate: undefined,

  /**
   * When used as a double date picker (i.e. date ranges), `endDate` should be
   * the value of the currently selected start date.
   *
   * @type {Date}
   */
  endDate: null,

  /**
   * When used as a double date picker (i.e. date ranges), `earliestDate`
   * is the earliest date that the UI will allow the user to select.
   *
   * @type {Date}
   */
  earliestDate: null,

  /**
   * When used as a double date picker (i.e. date ranges), `latestDate`
   * is the latest date that the UI will allow the user to select.
   *
   * @type {Date}
   */
  latestDate: null,

  /**
   * A moment.js format string for how dates should appear in the inputs.
   *
   * @type {String}
   */
  inputFormat: 'MMMM D, YYYY',

  /**
   * A moment.js format string for how month labels should appear when switching
   * months.
   *
   * @type {String}
   */
  jumpMonthFormat: 'MMMM',

  /**
   * A moment.js format string for how year labels should appear when switching
   * years.
   *
   * @type {String}
   */
  jumpYearFormat: 'YYYY',

  /**
   * A moment.js format string for how preset labels should appear in the preset
   * menu. Only applicable in double mode (see `.type).
   *
   * @type {String}
   */
  presetFormat: null,

  /**
   * An array of strings for the day of week labels, starting with Sunday.
   *
   * @type {String[]}
   */
  dayLabels: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],

  /**
   * An array of preset objects to display. If not supplied, it will default to a basic
   * set of built-in presets.
   *
   * Preset objects should look like:
   *
   *     {
   *       label: 'Last month',
   *       start: moment().subtract(1, 'month').startOf('month'),
   *       end: moment().subtract(1, 'month').endOf('month')
   *     }
   *
   * @type {Object[]}
   */
  presets: false,

  /**
   * When using in single date mode (see `.type`), use this flag to indicate
   * that the input field must always have a valid selected date.
   *
   * @type {Boolean}
   */
  required: false,

  /**
   * Placeholder string that appears in single date mode (see `.type`), and only
   * if `required` is set to false. Defaults to the `inputFormat` string.
   *
   * @type {String}
   */
  placeholder: null,

  /**
   * In double mode (see `.type`), is a single day a valid range selection?
   *
   * @type {Boolean}
   */
  sameDayRange: true,

  /**
   * What kind of date picker is this:
   *
   *  * `'single'`: picks a single date
   *  * `'double'`: picks a date range (i.e. a start and end date)
   *
   * If you don't supply a value, it will attempt to automatically detect by
   * checking to see if you supplied any value (including `null`) for
   * `startDate`. If so, it will be treated as `'double'`.
   *
   * @type {String}
   */
  type: computed('startDate', function() {
    if (Ember.typeOf(this.get('startDate')) !== 'undefined') {
      return 'double';
    }
    return 'single';
  }),

  /**
   * Convenience computed property for the `type === 'single'`
   *
   * @type {Boolean}
   */
  isSingle: equal('type', 'single'),

  /**
   * Convenience computed property for the `type === 'double'`
   *
   * @type {Boolean}
   */
  isDouble: equal('type', 'double'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Builds the config object that the Calendar constructor expects
   *
   * @method _buildCalendar
   * @private
   * @return {Object}
   */
  _buildCalendar() {
    let component = this;
    let element = Ember.$('<div class="baremetrics-calendar">');
    this.$().empty().append(element);
    let config = {
      element: element,
      format: {
        input: this.get('inputFormat'),
        jump_month: this.get('jumpMonthFormat'),
        jump_year: this.get('jumpYearFormat')
      },
      days_array: this.get('dayLabels'),
      presets: this.get('presets'),
      callback() {
        component._parseCallback(this);
      }
    };
    if (this.get('type') === 'single') {
      config.current_date = this.get('currentDate');
      config.required = true;
      element.addClass('daterange--single');
    } else {
      config.earliest_date = this.get('earliestDate');
      config.latest_date = this.get('latestDate');
      config.start_date = this.get('startDate');
      config.end_date = this.get('endDate');
      config.format.preset = this.get('presetFormat');
      config.same_day_range = this.get('sameDayRange');
      element.addClass('daterange--double');
    }
    return new Calendar(config);
  },

  /**
   * Invoked by the Calendar library when a date value changes. Responsible for
   * parsing the values and invoking the supplied `onchange` action with the
   * relevant change data.
   *
   * @method _parseCallback
   * @param calendar {Calendar} the calendar instance
   * @private
   */
  _parseCallback({ current_date, start_date, end_date }) {
    run(() => {
      let result = start_date ? { startDate: start_date, endDate: end_date } : current_date;
      this.sendAction('onchange', result);
    });
  }

});
