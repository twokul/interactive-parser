import Ember from 'ember';

var Router = Ember.Router.extend({
  location: InteractiveParserENV.locationType
});

Router.map(function() {
  this.route('eval', { path: '/' });
});

export default Router;
