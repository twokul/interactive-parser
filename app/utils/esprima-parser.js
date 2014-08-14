import { instantiate } from './factory';

function parse(text) {
  var esprimaNode;

  try {
    esprimaNode = esprima.parse(text);
  } catch(e) {
    return instantiate('Program', {
      body: [{
        type: 'error',
        name:        e.name,
        column:      e.column,
        lineNumber:  e.lineNumber,
        index:       e.index,
        description: e.description
      }]
    });
  }

  return instantiate(esprimaNode.type, esprimaNode);
}

export { parse };
