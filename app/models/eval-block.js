import Ember from 'ember';

export default Ember.Object.extend({
  type: null,

  setup: function() {
    this.set('type', 'eval');
    this.set('name', 'eval');

    this.set('deoptimization', {
      description: 'Eval blocks are not optimized.'
    });
  }.on('init')
});
