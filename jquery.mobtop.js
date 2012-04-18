(function( $ ) {

  $.fn.mobtop = function( options ) {
    var settings = $.extend( {
			speed: 300,
			onSnap: function() {}
    }, options);

    return this.each(function() {
			var $slidesWrapper = $(this),
					$slidesPager = $slidesWrapper.find('.slides-pager'),
					$slides = $slidesWrapper.find('.slides'),
					slides = $slides.children('li').length,
					delta = 0,
					distance = 0,
					end = 0,
					leftOffset = 0,
					offset = [],
					page = 1,
					position = 0,
					start = 0,
					started = false,
					view = {
						height: $(window).height(),
						width: $(window).width()
					},
					supports_touch = 'ontouchend' in document,
					desktop_events = {
						begin: 'mousedown',
						end: 'mouseup',
						move: 'mousemove'
					},
					mobile_events = {
						begin : 'touchstart',
						end : 'touchend',
						move : 'touchmove'
					},
					events = supports_touch ? mobile_events : desktop_events,
					pager = function(){
						$slidesPager.children('li').removeClass('current');
						$slidesPager.children('li').eq(page-1).addClass('current');
					},
					widths = function(){
						$slides.width(view.width * slides);
						$slides.children('li').width(view.width);
					},
					offsets = function(){
						$slides.children('li').each(function(index){
							var off = $(this).offset();
							offset[index+1] = off.left;
						});
					},
					advance = function() {
						position = -offset[page];
						pager(page);
						snap(position);
					},
					slide = function() {
						if (distance.x+5 > distance.y) {
							position = leftOffset - delta.x;
					
							$slides.css({
								left: position + "px"
							});
						}
					},
					snap = function(){
						var vscroll = distance.y < view.height/4 || distance.x+5 > distance.y;
						if(vscroll) {
							$slides.animate({
								left: position + "px"
							}, settings.speed, settings.onSnap);
						} else {
							$slides.css({
								left: position + "px"
							});
						}
					},
					touchEnd = function() {
						if (distance.x > view.width/2 && position < 0 && -position < offset[slides]){
							if (delta.x > 0) {
								advance(++page);
							} else {
								advance(--page);
							}
						} else {
							position = -offset[page];
							snap(page);
						}
						started = false;
					},
					touchMove = function(event) {
						if (started){
							end = getPos(event);
							delta = {
								x: start.x - end.x,
								y: start.y - end.y
							};
							distance = {
								x: Math.abs(delta.x),
								y: Math.abs(delta.y)
							};

							// Start slide motion
							slide();

							// User has started to slide, prevent vertical scrolling
							if(distance.x > 15) {
								event.preventDefault();
							}
						}
					},
					touchStart = function(event) {
						if (!supports_touch){
							event.preventDefault();
						}
						leftOffset = parseFloat($slides.css("left"));
						start = getPos(event);
						started = true;
					},
					getPos = function(event){
						var posX,
								posY;
					
						if (!supports_touch){
							posX= event.pageX;
							posY= event.pageY;
						} else {
							posX = event.targetTouches[0].clientX;
							posY = event.targetTouches[0].clientX;
						}
					
						return {x: posX, y: posY};
					};

			// Set widths of slides
			widths();

			// Set offsets
			offsets();

			$(this)[0].addEventListener( events.begin, touchStart, false );
			$(this)[0].addEventListener( events.move, touchMove, false );
			$(this)[0].addEventListener( events.end, touchEnd, false );
    });
	};
})( jQuery );