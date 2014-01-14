define(function(){var e=function(e,t){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",e,t)};e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.prototype.init=function(e,t,n){this.enabled=!0,this.type=e,this.$element=$(t),this.options=this.getOptions(n);for(var r=this.options.trigger.split(" "),i=r.length;i--;){var o=r[i];if("click"==o)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=o){var a="hover"==o?"mouseenter":"focus",s="hover"==o?"mouseleave":"blur";this.$element.on(a+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(e){return e=$.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},e.prototype.getDelegateOptions=function(){var e={},t=this.getDefaults();return this._options&&$.each(this._options,function(n,r){t[n]!=r&&(e[n]=r)}),e},e.prototype.enter=function(e){var t=e instanceof this.constructor?e:$(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(t.timeout),t.hoverState="in",t.options.delay&&t.options.delay.show?(t.timeout=setTimeout(function(){"in"==t.hoverState&&t.show()},t.options.delay.show),void 0):t.show()},e.prototype.leave=function(e){var t=e instanceof this.constructor?e:$(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(t.timeout),t.hoverState="out",t.options.delay&&t.options.delay.hide?(t.timeout=setTimeout(function(){"out"==t.hoverState&&t.hide()},t.options.delay.hide),void 0):t.hide()},e.prototype.show=function(){var e=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(e),e.isDefaultPrevented())return;var t=this.tip();this.setContent(),this.options.animation&&t.addClass("fade");var n="function"==typeof this.options.placement?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,r=/\s?auto?\s?/i,i=r.test(n);i&&(n=n.replace(r,"")||"top"),t.detach().css({top:0,left:0,display:"block"}).addClass(n),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element);var o=this.getPosition(),a=t[0].offsetWidth,s=t[0].offsetHeight;if(i){var l=this.$element.parent(),u=n,c=document.documentElement.scrollTop||document.body.scrollTop,f="body"==this.options.container?window.innerWidth:l.outerWidth(),p="body"==this.options.container?window.innerHeight:l.outerHeight(),d="body"==this.options.container?0:l.offset().left;n="bottom"==n&&o.top+o.height+s-c>p?"top":"top"==n&&o.top-c-s<0?"bottom":"right"==n&&o.right+a>f?"left":"left"==n&&o.left-a<d?"right":n,t.removeClass(u).addClass(n)}var h=this.getCalculatedOffset(n,o,a,s);this.applyPlacement(h,n),this.$element.trigger("shown.bs."+this.type)}},e.prototype.applyPlacement=function(e,t){var n,r=this.tip(),i=r[0].offsetWidth,o=r[0].offsetHeight,a=parseInt(r.css("margin-top"),10),s=parseInt(r.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(s)&&(s=0),e.top=e.top+a,e.left=e.left+s,r.offset(e).addClass("in");var l=r[0].offsetWidth,u=r[0].offsetHeight;if("top"==t&&u!=o&&(n=!0,e.top=e.top+o-u),/bottom|top/.test(t)){var c=0;e.left<0&&(c=-2*e.left,e.left=0,r.offset(e),l=r[0].offsetWidth,u=r[0].offsetHeight),this.replaceArrow(c-i+l,l,"left")}else this.replaceArrow(u-o,u,"top");n&&r.offset(e)},e.prototype.replaceArrow=function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},e.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},e.prototype.hide=function(){function e(){"in"!=t.hoverState&&n.detach()}var t=this,n=this.tip(),r=$.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(n.removeClass("in"),$.support.transition&&this.$tip.hasClass("fade")?n.one($.support.transition.end,e).emulateTransitionEnd(150):e(),this.$element.trigger("hidden.bs."+this.type),this)},e.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||"string"!=typeof e.attr("data-original-title"))&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(){var e=this.$element[0];return $.extend({},"function"==typeof e.getBoundingClientRect?e.getBoundingClientRect():{width:e.offsetWidth,height:e.offsetHeight},this.$element.offset())},e.prototype.getCalculatedOffset=function(e,t,n,r){return"bottom"==e?{top:t.top+t.height,left:t.left+t.width/2-n/2}:"top"==e?{top:t.top-r,left:t.left+t.width/2-n/2}:"left"==e?{top:t.top+t.height/2-r/2,left:t.left-n}:{top:t.top+t.height/2-r/2,left:t.left+t.width}},e.prototype.getTitle=function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||("function"==typeof n.title?n.title.call(t[0]):n.title)},e.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(e){var t=e?$(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;t.tip().hasClass("in")?t.leave(t):t.enter(t)},e.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var t=$.fn.tooltip;$.fn.tooltip=function(t){return this.each(function(){var n=$(this),r=n.data("bs.tooltip"),i="object"==typeof t&&t;r||n.data("bs.tooltip",r=new e(this,i)),"string"==typeof t&&r[t]()})},$.fn.tooltip.Constructor=e,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=t,this}});