import Ember from 'ember';

var Route = Ember.Route;

export default Route.extend({
  afterModel: function() {
    this.transitionTo('eval');
  }
});
