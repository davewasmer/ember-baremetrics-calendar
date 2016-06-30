[![Build Status](https://travis-ci.org/davewasmer/ember-baremetrics-calendar.svg?branch=master)](https://travis-ci.org/davewasmer/ember-baremetrics-calendar)

# ember-baremetrics-calendar

A wrapper for [the awesome date range picker from Baremetrics](https://github.com/Baremetrics/calendar).

## Installation

```sh
$ ember install ember-baremetrics-calendar
```

## Usage

The supplied Ember component supports all the options of the underlying plugin,
the only difference is that the options are camelCased rather than snake_cased
like the original plugin.

## Configuration

See the [Baremetrics Calendar docs](https://github.com/Baremetrics/calendar#base-calendar-params)
for all the available options. The component supports all of them - just
camelCase the option names, and flatten nested objects.

For example, to set the month jumper label format (`format.jump_month` in the
underlying plugin), you'd pass in `{{baremetrics-calendar formatJumpMonth='MM'}}`.

The calendar component supports two modes: single date entry, and date range
("double") entry.

### Single Dates

If you supply a single date as `currentDate`, the component will automatically
use the single date entry mode:

```hbs
{{baremetrics-calendar currentDate=someDate onchange=(action 'updateMyDate')}}
```

When the user selects a different date, the `onchange` action will fire, and
will pass in the new Date as the first argument:

```js
actions: {
  updateMyDate(newDate) {
    this.set('currentDate', newDate);
  }
}
```

### Date Ranges

If you supply both a start and end date (`startDate` and `endDate`), the
component will automatically use the date range entry mode:

```hbs
{{baremetrics-calendar startDate=myStartDate endDate=myEndDate onchange=(action 'updateMyDateRange')}}
```

When the user selects a different date (start or end, either one), the
`onchange` action will fire, and will pass in an object with the new start and
end dates:

```js
actions: {
  updateMyDateRange({ startDate, endDate }) {
    this.set('myStartDate', startDate);
    this.set('myEndDate', endDate);
  }
}
```

## Styling

This addon will automatically import the styles that ship with the underlying
plugin - nothing additional work required.

If you want to customize the look and feel, you can override the included styles
with your own CSS rules with greater specificity.

Or, if you'd rather style the component from scratch, you add the following to
your `ember-cli-build.js` file:

```js
// ember-cli-build.js

var app = new EmberApp(defaults, {
  baremetricsCalendar: {
    includeStyles: false
  }
});
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
