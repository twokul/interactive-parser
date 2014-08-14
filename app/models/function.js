import Ember    from 'ember';
import { analyzeBody, getAssignments, findTryBlock, findEvalBlock } from '../utils/traverse';

var emberA = Ember.A;

export default Ember.Object.extend({
  type:           null,
  name:           null,
  params:         null,
  assignments:    null,
  elements:       null,
  deoptimization: null,

  setup: function() {
    this.set('type', 'function');
    this.set('internalType', 'FunctionDeclaration');

    this.set('params', emberA(this.get('params'))
                       .map(function(param) { return param.name; }));
    this.set('name', this.id.name);
    this.set('assignments', getAssignments(this.body));

    var tryBlock     = findTryBlock(this.body.body);
    var evalBlock    = findEvalBlock(this.body.body);
    var more600Lines = analyzeBody(this.body);

    if (more600Lines) {
      this.set('deoptimization', {
        description: 'This function is more than 600 lines and won\'t be inlined.'
      });
      return;
    }

    if (tryBlock) {
      this.set('deoptimization', tryBlock.deoptimization);
    }

    if (evalBlock) {
      this.set('deoptimization', evalBlock.deoptimization);
    }
  }.on('init')
});
