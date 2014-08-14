import Ember from 'ember';
import { lookup } from '../utils/node-lookup';

var emberO = Ember.Object;

export default emberO.extend({
  type: null,
  name: null,

  setup: function() {
    this.set('type', lookup(this.get('type')));
  }.on('init')
});
