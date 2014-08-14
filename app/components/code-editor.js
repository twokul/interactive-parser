import Ember from 'ember';

var Component = Ember.Component;

export default Component.extend({
  codeMirror: null,

  initEditor: function() {
    var _this      = this;
    var document   = this.$('#editor')[0];
    var mode       = this.get('mode');
    var text       = this.getWithDefault('initialText', '// Hello. \r\n\r\n// This is an interactive parser.\r\n\r\n');
    var codeMirror = this.get('codeMirror');

    codeMirror = new CodeMirror(document, {
      mode:        mode,
      value:       text,
      lineNumbers: true
    });

    codeMirror.on('change', function(codeMirrorInstance) {
      _this.set('text', codeMirrorInstance.getValue());
    });
  }.on('didInsertElement'),
});
