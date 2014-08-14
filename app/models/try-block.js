import Ember from 'ember';

export default Ember.Object.extend({
  type:         null,
  internalType: null,
  func:         null,

  deoptimization: {
    description: 'Try blocks is not currently optimizable. This code will always be deoptimized. <a href="http://git.io/aIpTPw">Possible fix</a>.'
  },

  setup: function() {
    this.set('type', 'try-block');
    this.set('internalType', 'TryStatement');
    var expression = this.block.body[0] ? this.block.body[0].expression : undefined;

    if (expression) {
      var funcName = expression.callee.name;
      this.set('func', funcName);
    }
  }.on('init')
});
