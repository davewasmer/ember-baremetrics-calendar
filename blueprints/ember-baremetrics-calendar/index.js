/*jshint node:true*/
module.exports = {
  description: ''
  normalizeEntityName: function() {},
  afterInstall: function(options) {
    this.addBowerPackageToProject('BaremetricsCalendar');
  }
};
