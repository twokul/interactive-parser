import Ember from 'ember';

var Component = Ember.Component;
var computed  = Ember.computed;

export default Component.extend({
  items: computed('node', function() {
    var node   = this.get('node');
    var result = '';
    var items  = [];

    if (node) {
      var elements = node.get('elements');

      if (!elements.get('length')) { return items; }

      elements.forEach(function(e) {
        if (e.get('name') === 'assignment') { return; }

        result = e.get('type') + ':' + e.get('name');

        if (e.get('params.length')) {
          result += '(' + e.get('params').join(',') + ')';
        }

        if (e.get('type') === 'variable' && e.get('funcType')) {
          result += ' [HC] ' + e.get('hiddenClass.properties').join(',');
        }

        items.push(result);
      });
    }

    return items;
  })
});
