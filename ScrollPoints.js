(function($){

	var ScrollPoints = {

		options : {
			action		: "add",
			direction	: "both"
		},

		running			: false,
		checkList		: [],
		lastPos			: 0,

		scrollListener : function()
		{
			var currPos		= $(window).scrollTop();
			var delta		= currPos - this.lastPos;

			for (var i = 0; i < this.checkList.length; i++){
				var item	= this.checkList[i];
				var top		= item.$el.offset().top + item.position;
				var found	= false;

				// Check scrolling down
				if (delta > 0 && (item.direction == "down" || item.direction == "both")){
					// If the position is in between the run it bru
					if (this.lastPos <= top && currPos >= top){
						found = true;
						if (item.callback) item.callback();
					}
				}

				// Check scrolling up
				if (delta < 0 && (item.direction == "up" || item.direction == "both") && !found){
					// If the position is in between the run it bru
					if (this.lastPos >= top && currPos <= top){
						found = true;
						if (item.callback) item.callback();
					}
				}
			}

			this.lastPos	= currPos;
		}
	};

	var listenerRef = $.proxy(ScrollPoints.scrollListener, ScrollPoints);



	$.fn.scrollPoint = function(customOptions, callback)
	{
		// Apply all the default options
		customOptions	= $.extend({}, ScrollPoints.options, (customOptions || {}));
		var $this		= $(this);

		// Add an item
		if (customOptions.action == "add" && customOptions.position){
			customOptions.$el		= $this;
			customOptions.callback	= callback;
			ScrollPoints.checkList.push(customOptions);
			if (!ScrollPoints.running) {
				log("Starting up the field generator");
				ScrollPoints.running	= true;
				ScrollPoints.lastPos	= $(window).scrollTop();
				$(window).bind("scroll", listenerRef);
			}
		}
		else if (customOptions.action == "remove"){
			for (var i = 0; i < ScrollPoints.checkList.length; i++){
				var item = ScrollPoints.checkList[i];
				if ($this.is(item.$el)){
					ScrollPoints.checkList.splice(i, 1);
					log("Found item to remove");
					break;
				}
			}
			if (ScrollPoints.checkList.length == 0){
				$(window).unbind("scroll", listenerRef);
				log("Closing down the field generator, there is nothing to check");
			}
		}

		return this;
	};

	function log(msg)
	{
		try{
			console.log(msg)
		}catch (e) {}
	}

}(jQuery));