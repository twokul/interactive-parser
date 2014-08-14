import Ember      from 'ember';
import { lookup } from '../utils/node-lookup';

export default Ember.Object.extend({
  type:   null,
  params: null,
  id:     null,
  name:   null,

  setup: function() {
    var body = this.get('body')[0];
    var id   = body.id || body.expression;

    this.set('type',   lookup(body.type));
    this.set('name',   id.name);
  }.on('init')
});
