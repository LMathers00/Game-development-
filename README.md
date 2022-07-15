# Game-development-
Brick-Breaker?? style game 
<!-- Psuedo code -->

<!-- essentials -->
Solid colour background

A menu with a 'play button' and a 'how to play button'
'play button' should launch us into the game 
'how to play' should contain brief description of how the game works and any other essential information 
These should all be acessible using keyboard only 

For the 'game' we require
A multitude of 'bricks' that disappear when hit (maybe with sound effect??)
moving ball which stays at a constant speed and bounces accordingly 
a paddle which the ball bounces off of which is user controlled using arrow keys or wasd

Need a way to detect collison and javascript does that by detecting when co ordinates in the canvas are equal and at which point we reverse the velocity of one of the ball's components. E.G hits a side so i reverse the x velocity so the ball travels in the other direction

a few different level designs 
if all levels are complete it should display a 'You win' screen with a button back to the main menu - maybe include the confetti cannon etc

A number of lives 
When lives run out it should display a 'You lose' screen and should also contain a button back to the main menu 

<!-- Bounce physics  -->
Angle of incidence = angle of reflection 
not just as simple as a 90 degree bounce 


After some time i was able to incorporate button functionality for non-keyboard devices 
image.png
The overall game works despite a few minor visual bugs