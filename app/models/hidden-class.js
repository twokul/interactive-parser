import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Object.extend({
  properties: computed(function() {
    return Ember.A();
  })
});
