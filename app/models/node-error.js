import Ember from 'ember';

var EObject = Ember.Object;

export default EObject.extend({
  type:       'error',
  lineNumber: null,
  index:      null,
  column:     null,
  name:       null,

  setup: function() {
    this.setProperties({
      name:       this.get('description'),
      column:     this.get('column'),
      lineNumber: this.get('lineNumber'),
      index:      this.get('index')
    });
  }.on('init')
});
