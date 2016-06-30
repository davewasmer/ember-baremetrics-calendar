/*jshint node:true*/
module.exports = {
  description: 'Add baremetrics-calendar dependencies',
  normalizeEntityName: function() {},
  afterInstall: function() {
    this.addBowerPackageToProject('BaremetricsCalendar');
  }
};
