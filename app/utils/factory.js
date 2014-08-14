import Identifier from '../models/identifier';
import Function   from '../models/function';
import Variable   from '../models/variable';
import NodeError  from '../models/node-error';
import Program    from '../models/program';
import Ember      from 'ember';
import TryBlock   from '../models/try-block';
import EvalBlock  from '../models/eval-block';

import { analyzeForHiddenClasses, analyzeForChangedHiddenClasses } from './traverse';

var emberA = Ember.A;

var map = {
  'Program': function(type, esprimaNode) {
    var body = esprimaNode.body;

    var elements = emberA(body).map(function(element) {
      return instantiate(element.type, element);
    });

    var program = Program.create({
      type:     type,
      elements: elements
    });

    analyzeForHiddenClasses(program);
    analyzeForChangedHiddenClasses(program);

    return program;
  },
  'FunctionDeclaration': function(type, esprimaNode) {
    return Function.create(esprimaNode);
  },
  'VariableDeclaration': function(type, esprimaNode) {
    var init = esprimaNode.declarations[0].init;

    var funcType = init && init.callee ? init.callee.name : null;

    return Variable.create({
      type: type,
      funcType: funcType,
      name: esprimaNode.declarations[0].id.name
    });
  },
  'AssignmentExpression': function() {
    return {};
  },
  'ExpressionStatement': function(type, esprimaNode) {
    var expression = esprimaNode.expression;
    var callee     = expression.callee;
    var initObject = {};

    if (callee && callee.name === 'eval') {
      return EvalBlock.create();
    }

    if (expression && expression.left && expression.right) {
      initObject = {
        expression: {
          name: expression.left.object.name,
          property: expression.left.property.name,
        },
        type:  esprimaNode.expression.type,
        name:  esprimaNode.expression.name || expression.left.property.name,
        value: expression.right.value || null
      };
    } else {
      initObject = {
        type: esprimaNode.expression.type,
        name: esprimaNode.expression.name
      };
    }

    return Identifier.create(initObject);
  },
  'EmptyStatement': function() {
    return {};
  },
  'TryStatement': function(type, esprimaNode) {
    return TryBlock.create(esprimaNode);
  },
  'error': function(type, error) {
    return NodeError.create(error);
  }
};

function instantiate(type) {
  return map[type].apply(this, arguments);
}

export { instantiate };
