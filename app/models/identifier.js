import Ember from 'ember';

export default Ember.Object.extend({
  type: null,
  name: null,

  setup: function() {
    this.set('type', 'identifier');
  }
});
