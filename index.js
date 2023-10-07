/* jshint node: true */
'use strict';
var RTLRewrite = require('./broccoli-rtl-filter');
var BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-rtlcss',
	isDevelopingAddon: function () {
    return true;
	},
	included: function (app) {
    this.options = app.options[this.name] || {};

    if (!('enabled' in this.options)) {
      this.options.enabled = true;
    }
  },
	postprocessTree: function (type, inputNodes) {
		var options = this.options || {};

		if (type === 'css' && options.enabled) {
			var rtlNodes = new RTLRewrite(inputNodes);
			var merged = new BroccoliMergeTrees([inputNodes, rtlNodes], { overwrite: true });
			return merged;
    } else {
      return inputNodes;
    }
  }
};
