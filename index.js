/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-baremetrics-calendar',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var options = app.options.baremetricsCalendar || {};

    var isFastBoot = process.env.EMBER_CLI_FASTBOOT === 'true';
    if (!isFastBoot) {
      app.import('bower_components/BaremetricsCalendar/public/js/Calendar.js');
    }
    if (options.includeStyles !== false) {
      app.import('bower_components/BaremetricsCalendar/public/css/application.css');
    }

    return app;
  }

};
