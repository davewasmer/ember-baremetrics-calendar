import Ember from 'ember';

export default Ember.Controller.extend({

  currentDate: new Date(),

  startDate: new Date(),
  endDate: new Date(),

  actions: {
    updateSingleDate(newDate) {

    },
    updateDateRange({ startDate, endDate }) {

    }
  }

})
