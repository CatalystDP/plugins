define(function(require, exports, module) {
	var tool = require("../lib/md5");

	var option = TEQU.Plugin.option;
	var garams = TEQU.Plugin.garams;

	//浏览器检测结果
	var browser = tool.Browser;

	module.exports = {
		init: function() {
			createLoading();
			createDom();
		}
	}
	var checkKey = function() {
		return tool.md5(location.host + garams.uid).substr(8, 16) == garams.key ? true : false;
	}
	//解决IE跨域问题
	var IEXdomain = function(url, fn) {
		if (browser.type != "IE" || (browser.version > 10 && browser.type == "IE")) {
			$.ajax({
				url: window.encodeURI(url),
				type: "get",
				dataType: "json"
			}).done(function(data) {
				fn(data);
			}).fail(function(data) {});
		} else {
			var xdr = new XDomainRequest();
			xdr.onload = function(e) {
				var data = $.parseJSON(xdr.responseText);
				if (data == null || typeof(data) == 'undefined') {
					data = $.parseJSON(data.firstChild.textContent);
				}
				fn(data);
			};
			xdr.onerror = function(e) {
				//error
			}
			xdr.open("GET", window.encodeURI(url));
			xdr.send();
		}
	}
	var createLoading = function() {
		$("#tetequ").css(option);
		$("#tetequ").html("<div class='loading'></div>");
	}

	var createDom = function() {
		if (!checkKey()) {
			alert("您进行了跨域嵌入！");
			return;
		} else {
			var create = function(data) {
				$("#tetequ").html(createInput(data));
				$("#tetequ, #tetequ img").css(option);
			};
			var URL = "http://www.tetequ.com/embed/get_room_info?roomid=" + garams.uid;
			IEXdomain(URL, create);
		}
	}
	//控制输出几个输入框（是否有密码框存在）
	var createInput = function(data) {
		var temp1 = '<a href="#"><div class="tetequ_play"></div><img src="' + data.thumb + '"></a><div class="tetequ-mask"></div><div class="tetequ-back"><div class="tetequ-page"><div class="tetequ-input-control tetequ-text tetequ-nick"><input type="text"><label>请输入昵称</label></div><div class="tetequ-input-control tetequ-text tetequ-pwd"><input type="text"><label>请输入邀请码</label></div><div class="tetequ-input-control tetequ-btn"><input type="button" value="进入"></div></div></div>';
		var temp2 = '<a href="#"><div class="tetequ_play"></div><img src="' + data.thumb + '"></a><div class="tetequ-mask"></div><div class="tetequ-back"><div class="tetequ-page tetequ-page1"><div class="tetequ-input-control tetequ-text tetequ-nick"><input type="text"><label>请输入昵称</label></div><div class="tetequ-input-control tetequ-btn"><input type="button" value="进入"></div></div></div>';
		return data.password ? temp1 : temp2;
	}
});