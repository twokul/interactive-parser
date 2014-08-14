import HiddenClass from '../models/hidden-class';
import TryBlock    from '../models/try-block';
import EvalBlock   from '../models/eval-block';

function findTryBlock(nodes) {
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].type === 'TryStatement') {
      return TryBlock.create(nodes[i]);
    }
  }
}

function findEvalBlock(nodes) {
  var expression;

  for (var i = 0, l = nodes.length; i < l; i++) {
    expression = nodes[i].expression;

    if (expression && expression.callee && expression.callee.name === 'eval') {
      return EvalBlock.create();
    }
  }
}

function getAssignments(node) {
  var result = [];
  for (var i = 0, l = node.body.length; i < l; i++) {
    if (node.body[i].expression) {
      var leftAssignment  = node.body[i].expression.left;
      var rightAssignment = node.body[i].expression.right;

      if (leftAssignment && leftAssignment.object.type === 'ThisExpression') {
        result.push(rightAssignment.name);
      }
    }
  }
  return result;
}

function findVariable(tree, name) {
  return tree.elements.filter(function(el) {
    return el.type === 'variable' && el.name === name;
  })[0];
}

function findFunction(tree, name) {
  return tree.elements.filter(function(el) {
    return el.type === 'function' && el.name === name;
  })[0];
}

function analyzeForHiddenClasses(program) {
  program.elements.forEach(function(el) {
    if (el.type === 'variable') {
      var func = findFunction(program, el.funcType);
      if (!func) {
        el.hiddenClass = HiddenClass.create();
      } else {
        el.hiddenClass = HiddenClass.create({
          properties: func.assignments
        });
      }
    }
  });
}

function analyzeForChangedHiddenClasses(program) {
  var variable;
  var properties = [];

  program.elements.forEach(function(el) {
    if (el.expression) {
      variable = findVariable(program, el.expression.name);
      variable.get('hiddenClass.properties').forEach(function(e) {
        properties.push(e);
      });
      properties.push(el.expression.property);
      variable.set('hiddenClass', HiddenClass.create({
        properties: properties
      }));
      el.deoptimization = {
        description: 'The shape (layout) of the object was changed. This will lead to the deoptimization of the generated VM code [Not optimized: Inlining bailed out].'
      };
    }
  });
}

export { findTryBlock, findEvalBlock, getAssignments, findVariable, findFunction, analyzeForHiddenClasses, analyzeForChangedHiddenClasses };
