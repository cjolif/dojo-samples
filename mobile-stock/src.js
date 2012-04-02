var details;

require([
	"dojox/mobile/parser",
	"dojox/mobile",
//	"dojox/mobile/compat",
	"dojox/mobile/FixedSplitter",
	"dojox/mobile/ScrollableView",
	"dojox/mobile/Pane",
	"dojox/mobile/Container",
	"dojox/mobile/SwapView",
	"dojox/mobile/PageIndicator"
], function(){
	details = function(event){
		console.log("details: "+event.target.id);
	};
});
