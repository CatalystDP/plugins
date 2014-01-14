define(function(require, exports, module) {
	var tool = require("./tool");
	var ansy = require("./ansy");
	require("./tooltip");

	
	var option = TEQU.Plugin.option;
	var garams = TEQU.Plugin.garams;

	var swfVersionStr = "11.1.0";
	var params = {
		menu: "false",
		scale: "noScale",
		allowFullscreen: "true",
		allowScriptAccess: "always",
		bgcolor: "#000000",
		salign: "tl",
		quality: "high",
		allowFullScreenInteractive: "true"
	};
	var attributes = {
		id: "main",
		style: 'min-height: 600px; min-width: 1100px;'
	};
	module.exports = {
		init: function() {
			createLoading();
			createDom();
			ansy.init();
			eventInit();
		}
	}
	var eventInit = function() {
		$('#tetequ').on("click", "a", function() {
			$(".tetequ-mask,.tetequ-back").show();
			return false;
		}).on("click", ".tetequ-input-control label", function() {
			$(this).hide().prev().focus();
		}).on("focusout", ".tetequ-input-control input", function() {
			if (!$(this).val()) {
				$(this).next().show();
			}
		}).on("focusin", ".tetequ-input-control input", function() {
			if (!$(this).val()) {
				$(this).next().hide();
			}
		}).on('click', '.tetequ-btn', function(event) {
			ckeckIn($(this));
		});
	}
	var checkKey = function() {
		return tool.md5(location.host + garams.uid).substr(8, 16) == garams.key ? true : false;
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
			var URL = TEQU.path+"/embed/get_room_info?roomid=" + garams.uid;
			tool.IEXdomain(URL, create);
		}
	}
	//控制输出几个输入框（是否有密码框存在）
	var createInput = function(data) {
		var temp1 = '<a href="#"><div class="tetequ_play"></div><img src="' + data.thumb + '"></a><div class="tetequ-mask"></div><div class="tetequ-back"><div class="tetequ-page"><div class="tetequ-input-control tetequ-text tetequ-nick"><input type="text"><label>请输入昵称</label></div><div class="tetequ-input-control tetequ-text tetequ-pwd"><input type="text"><label>请输入邀请码</label></div><div class="tetequ-input-control tetequ-btn"><input type="button" value="进入"></div></div></div>';
		var temp2 = '<a href="#"><div class="tetequ_play"></div><img src="' + data.thumb + '"></a><div class="tetequ-mask"></div><div class="tetequ-back"><div class="tetequ-page tetequ-page1"><div class="tetequ-input-control tetequ-text tetequ-nick"><input type="text"><label>请输入昵称</label></div><div class="tetequ-input-control tetequ-btn"><input type="button" value="进入"></div></div></div>';
		return data.password ? temp1 : temp2;
	}

	//创建FLASH
	var createSWF = function(data) {
		$('body').empty().html("<div id='website'></div>").css({
			"height": "100%"
		});
		tool.swfobject.embedSWF(data.main_framework, "website", "100%", "100%",
			swfVersionStr, TEQU.path+"/statics/flash/expressInstall.swf",
			data.flashvars, params, attributes);
		var swfObj;
		window.onbeforeunload = function() {
			swfObj = tool.swfobject.getObjectById("main");
			return "你确定要离开吗？";
		}
		window.onunload = function() {
			if (typeof swfObj.closeConn == 'function') {
				swfObj.closeConn();
			}
		}
	}
	var ckeckIn = function(obj) {
		var URL = TEQU.path+"/embed/get_live_param?roomid=" + garams.uid;
		var nick = obj.parent().find('.tetequ-nick input').val() ? obj.parent().find('.tetequ-nick input').val() : (TEQU.Plugin.city + "网友" + Math.floor(Math.random() * 10000));
		if ($(".tetequ-page1").length) {
			URL += "&nickname=" + nick;
		} else {
			URL += "&nickname=" + nick + "&password=" + obj.parent().find('.tetequ-pwd input').val();
		}
		var check = function(data) {
			if (data.full) {
				$(".tetequ-nick").tooltip({
					"title": "该房间人数已满，请稍后进入",
					"placement": "top",
					"trigger": ""
				}).tooltip("show");
				return false;
			}
			if (data.password) {
				$(".tetequ-pwd").tooltip({
					"title": "您输入的密码错误",
					"placement": "top",
					"trigger": ""
				}).tooltip("show");
			} else {
				createSWF(data);
			}
		}
		tool.IEXdomain(URL, check);
	}
});