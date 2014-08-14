var map = {
  'VariableDeclaration': 'variable',
  'FunctionDeclaration': 'function',
  'error':               'error'
};

function lookup(key) {
  return map[key] || 'node';
}

export { lookup };
