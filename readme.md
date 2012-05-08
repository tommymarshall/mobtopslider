## MobTop Slider

A simple user-triggered slider for desktop and mobile devices. 

### Instructions
**Load the Stylesheet**

    <link rel="stylesheet" type="text/css" href="css/mobislider.css">

**Where you want the slider to display**
The below example is for mobile, since the images are just 320x200. If you were using this on a Desktop site, the images would probably be larger...

    <section class="mobtop">
    	<ul class="mobtop-slides">
            <li>
                <img src="img/320x200" data-caption="Home slide caption here" alt="Home">
            </li>
            <li>
                <img src="img/320x200" data-caption="Image slide caption #2" alt="Next slide...">
            </li>
    		...
    	</ul>
    </section>

**In the footer**

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/mobtop.jquery.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    		$(".mobtop").mobislider({
                speed: 300, // speed slide snaps into place
                pager: true, // displays pagination
    			onSnap: function(){} // on each slide change
    		});
    	});
    </script>
