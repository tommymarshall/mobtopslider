## MobTop Slider

A simple user-triggered slider for desktop and mobile devices. 

### Instructions
**Load the Stylesheet**

    <link rel="stylesheet" type="text/css" href="mobislider.css">

**Where you want the slider to display**

    <section class="row mobtop">
    	<ul class="mobtop-slides">
            <li>
                <img src="http://placehold.it/320x200" data-caption="Home slide caption here" alt="Home">
            </li>
            <li>
                <img src="http://placehold.it/320x200" data-caption="Image slide caption #2" alt="Next slide...">
            </li>
    		...
    	</ul>
    </section>

**In the footer**

    <script type="text/javascript">
    	// Load jQuery first...
    	$(document).ready(function(){
    		$(".mobtop").mobislider({
                speed: 300, // speed slide snaps into place
                pager: true, // displays pagination
    			onSnap: function(){} // on each slide change
    		});
    	});
    </script>
