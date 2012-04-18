## MobTop Slider

A simple user-triggered slider for desktop and mobile devices. 

### Instructions
**Load the Stylesheet**

    <link rel="stylesheet" type="text/css" href="mobislider.css">

**Where you want the slider to display**

    <section class="row mobtop">
    	<ul class="slides">
    		<li>
    			<div class="overlay">
    				<span class="caption">
    					Slide #1
    				</span>
    			</div>
    			<img src="http://placehold.it/320x200" alt="Home">
    		</li>
    		<li>
    			<div class="overlay">
    				<span class="caption">
    					Slide #2
    				</span>
    			</div>
    			<img src="http://placehold.it/320x200" alt="Home">
    		</li>
    		...
    	</ul>
    	<ul class="slides-pager">
    		<li class="current"></li>	
    		<li></li>
    		...
    	</ul>
    </section>

**In the footer**

    <script type="text/javascript">
    	// Load jQuery first...
    	$(document).ready(function(){
    		$(".mobtop").mobislider({
    			speed: 300, // speed slide snaps into place
    			onSnap: function(){} // on each slide change
    		});
    	});
    </script>
