import Ember from 'ember';
import { parse } from '../utils/esprima-parser';

var ObjectController = Ember.ObjectController;
var throttle         = Ember.run.throttle;

export default ObjectController.extend({
  text:  null,
  node:  null,

  parseNode: function() {
    var node = parse(this.get('text'));
    this.set('node', node);
  },

  textChanged: function() {
    throttle(this, this.parseNode, 200);
  }.observes('text')
});
