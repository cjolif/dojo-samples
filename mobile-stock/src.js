require([
	"dojo/dom",
	"dojo/_base/array",
	"dojo/ready",
	"dijit/registry",
	"dojox/mobile/ListItem",
	"dojox/mobile/parser",
	"dojox/mobile",
// include it only if you intend this to be runnable on IE & FF as well
//	"dojox/mobile/compat",
	"dojox/mobile/FixedSplitter",
	"dojox/mobile/ScrollableView",
	"dojox/mobile/Pane",
	"dojox/mobile/Container",
	"dojox/mobile/SwapView",
	"dojox/mobile/PageIndicator",
	"dojox/charting/widget/Chart",
	"dojox/charting/axis2d/Default",
	"dojox/charting/plot2d/Lines",
	"dojox/charting/plot2d/Grid"
], function(dom, arr, ready, registry, ListItem){
	function details(event){
		// get the clicked id
		var id = (event.target.id && event.target.id.length > 0)?event.target.id:event.target.parentNode.id;
		select(id);
	}
	function select(id){
		// get the details (news, figures & chart) for that given id
		// xhr.get(...) to get back data from the server, here we are faking it
		var data = {
			news: [
				{
					url: "http://whateverurlwherethereisinfoonthisnews.com",
					title: "first title",
					subtitle: "subtitle"
				},
				{
					url: "http://whateverurlwherethereisinfoonthisnews.com",
					title: "second title",
					subtitle: "subtitle"
				}
			],
			day: {
				open: 10.1,	cap: 15343412, max: 10.5, min: 9.9,
				max52: 93, min52: 3.5, vol: 3242,
				meanvol: 3403, per: 5, rdt: 3
			},
			history: [ 5, 6, 7, 8, 10, 13, 18, 24, 32, 37, 45, 51 ]
		};
		var news = registry.byId("news");
		// remove anything from previous selected stock
		arr.forEach(news.getChildren(), function(child){
			news.removeChild(child);
		});
		// go over the news for my stock and add them
		arr.forEach(data.news, function(item){
			var li = new ListItem({
				href: item.url,
				hrefTarget: "_blank",
				arrowClass: "mblDomButtonBlueCircleArrow"
			});
			li.labelNode.innerHTML = item.title+"<div class='subtitle'>"+item.subtitle+"</div>";
			news.addChild(li);
		});
		// go over the daily data and update them
		for(var key in data.day){
			dom.byId(key).innerHTML = data.day[key];
		}
		// go over the historical data and update the chart
		registry.byId("chart").chart.getSeries("data").update(data.history);
	}
	ready(function(){
		// fill the main view with live data
		// here we are just pretenting we get if from server
		var live = [
			{
				id: "stock1",
				title: "Stock 1",
				price: 10.1,
				change: 10.5
			},
			{
				id: "stock2",
				title: "Stock 2",
				price: 15.8,
				change: -0.3
			},
			{
				id: "stock3",
				title: "Stock 3",
				price: 56,
				change: 13.4
			},
			{
				id: "stock4",
				title: "Stock 4",
				price: 8.5,
				change: -1.3
			},
			{
				id: "stock5",
				title: "Stock 5",
				price: 10.9,
				change: 0.5
			},
			{
				id: "stock6",
				title: "Stock 6",
				price: 35,
				change: -5.3
			},
			{
				id: "stock7",
				title: "Stock 7",
				price: 3.5,
				change: -4.4
			},
			{
				id: "stock8",
				title: "Stock 8",
				price: 5.8,
				change: -0.9
			}
		];
		var stocks = registry.byId("stocks");
		arr.forEach(live, function(item, i){
			var li = new ListItem({
				onClick: details,
				moveTo: "#",
				selected: i == 0,
				id: item.id
			});
			var pos = item.change > 0;
			li.labelNode.innerHTML =
				"<div class='c1'>"+item.title+"</div>"+
				"<div class='c2'>"+item.price+"</div>"+
				"<div class='c3 "+(pos?"c3a":"c3b")+"'>"+(pos?"+":"")+item.change+"%</div>";
			stocks.addChild(li);
		});
		// at init time first stock is always selected
		select("stock1");
	});
});
