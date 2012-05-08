/**
 * @name			jQuery mobtop plugin
 * @author		Tommy Marshall
 * @version		1.0
 * @url				http://viget.com/
 * @License		MIT License
 */

(function( $ ) {

	$.fn.mobtop = function( options ) {
		var settings = $.extend( {
			speed: 300,
			pager: true,
			onSnap: function() {}
		}, options);

		/* Allow for multiple slideshows on same page */
		return this.each(function() {

			var $slidesWrapper = $(this),
					$slidesPager = "",
					$slides = $slidesWrapper.find('.mobtop-slides'),
					slides = $slides.children('li').length,
					delta = 0,
					distance = 0,
					end = 0,
					keyed = false,
					leftOffset = 0,
					hscroll = false,
					offset = [],
					page = 1,
					position = 0,
					start = 0,
					started = false,
					view = {
						height: $(window).height(),
						width: $(window).width()
					},

					/* Check if touch device or desktop */
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

					/* Create pagination display */
					createPager = function(){
						var output = "";

						// Create pagination wrapper, create number of needed slides */
						$slidesWrapper.append('<ul class="mobtop-pager"><li class="current"></li></ul>');

						// We have one already (current), so slides-1
						for (var i = 0; i < slides-1; i++) {
							output += "<li></li>";
						}
						$slidesWrapper.find('.mobtop-pager').append(output);
						$slidesPager = $slidesWrapper.find('.mobtop-pager');
					},

					/* Setup slideshow image captions */
					assignCaptions = function(){
						$slides.find('li').each(function(index){

							// If there is a caption assigned to a child element
							if ( $(this).children().attr('data-caption') !== undefined) {
								$(this).append('<div class="overlay"><span class="caption">'+ $(this).children().attr('data-caption') +'</span></div>');
							}
						});
					},

					/* Toggle new page position */
					pager = function(){
						$slidesPager.children('li').removeClass('current');
						$slidesPager.children('li').eq(page-1).addClass('current');
					},

					/* Assign width and height */
					assignDimensions = function(){
						var maxHeight = 0;
						$slides.width(view.width * slides);
						$slides.children('li').width(view.width);

						// Source: http://css-tricks.com/snippets/jquery/equalize-heights-of-divs/
						$slides.children('li').each(function(){
							if ($(this).height() > maxHeight) {
								maxHeight = $(this).height();
							}
						});

						$slides.children('li').height(maxHeight);
					},

					/* Mark the offset positions for each slide */
					assignOffsets = function(){
						$slides.children('li').each(function(index){
							var off = $(this).offset();
							offset[index+1] = off.left;
						});
					},

					/* Advanced to new positon */
					advance = function() {
						position = -offset[page];

						// If pager is enabled, toggle new current page
						if (settings.pager) {
							pager();
						}

						snap(position);
					},

					/* Active sliding motion */
					slide = function() {

						// Make sure user scrolled horizontally before vertically
						// +5pixel gives a cushion to give the user leeway
						if (distance.x+5 > distance.y) {
							position = leftOffset - delta.x;
							$slides.css({
								left: position + "px"
							});
						}
					},

					/* Snap to position */
					snap = function(){

						// The upper and lower bound of what would constitute a horizontal scroll
						// You may want to modify this to your liking
						hscroll = distance.y < view.height/4 || distance.x+5 > distance.y || keyed;

						// If we horizontally swiped/scrolled, then animate to that position
						// Otherwise, don't animate to that positon
						if(hscroll) {
							$slides.animate({
								left: position + "px"
							}, settings.speed, settings.onSnap);
						} else {
							$slides.css({
								left: position + "px"
							});
						}

						// Restart
						started = keyed = false;
					},

					/* On mouse/touch ending */
					slideEnd = function() {

						// If the swipe/mouse click distances are greater than half the screen, then advance
						if (distance.x > view.width/2 && position < 0 && -position < offset[slides]){
							if (delta.x > 0) {
								advance(++page);
							} else {
								advance(--page);
							}
						} else {

							// Otherwise, snap to previous positon
							position = -offset[page];
							snap(page);
						}
					},

					/* On mouse/touch moving */
					slideMove = function(event) {
						if (started){
							end = getPos(event);

							// Calculates change in start and end/current position
							delta = {
								x: start.x - end.x,
								y: start.y - end.y
							};
							distance = {
								x: Math.abs(delta.x),
								y: Math.abs(delta.y)
							};

							// Begin sliding motion
							slide();

							// If we scrolled more than 15 pixels horizontailly, disable vertical scroll (mobile)
							if(distance.x > 15) {
								event.preventDefault();
							}
						}
					},

					/* On mouse/touch starting */
					slideStart = function(event) {

						// preventDefault clicks for Deskop
						if (!supports_touch){
							event.preventDefault();
						}

						// Get current offset
						leftOffset = parseFloat($slides.css("left"));
						start = getPos(event);
						started = true;
					},

					/* Get X and Y position */
					getPos = function(event){
						var posX,
								posY;
					
						// Assign positions based on mobile or desktop
						if (!supports_touch){
							posX= event.pageX;
							posY= event.pageY;
						} else {
							posX = event.targetTouches[0].clientX;
							posY = event.targetTouches[0].clientX;
						}
					
						return {x: posX, y: posY};
					};

			// Assign width and height of slides
			assignDimensions();

			// Assign offsets for each slide
			assignOffsets();

			// Assign slide captions
			assignCaptions();

			// If we want to display pagination
			if (settings.pager) {
				createPager();
			}

			// Listen for arrow keys
			$(window).bind('keydown', function(e){
				keyed = true;
				if (e.keyCode == 37) {
					advance(--page);
				} else if (e.keyCode == 39) {
					advance(++page);
				}
			});

			// Assign listeners to allow of screen/mouse interaction
			$(this)[0].addEventListener( events.begin, slideStart, false );
			$(this)[0].addEventListener( events.move, slideMove, false );
			$(this)[0].addEventListener( events.end, slideEnd, false );
		});
	};
})(jQuery);