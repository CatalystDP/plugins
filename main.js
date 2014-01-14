define(function(require, exports, module) {
	require("./static/plugins.min.css");
	var $ = require("./lib/jquery.js");
	var plugin=require("./lib/plugins");
	plugin.init();
})