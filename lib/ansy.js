define(function(require, exports, module) {
	var tool = require("./tool");
	var browser = tool.Browser();

	module.exports={
		init:function(){
			ipCheck();
		}
	}
	var ipCheck = function() {
		var _this = this;
		var URL = TEQU.path+"/embed/get_ip_info";
		var succeed = function(data) {
			TEQU.Plugin.city=data.city;
			upMsg(data);
		}
		tool.IEXdomain(URL, succeed);
	}
	var upMsg = function(data) {
		var URL = TEQU.path+"/embed/user_data?ip=" + data.ip + "&city=" + data.city + "&isp=" + data.isp + "&referrer=" + document.referrer + "&type=" + browser.type + "&version=" + browser.version + "&userAgent=" + navigator.userAgent + "&roomid=" + TEQU.Plugin.garams.uid;
		tool.IEXdomain(URL, function() {});
	}
})