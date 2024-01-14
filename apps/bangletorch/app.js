function drawPattern() {
  g.clear();
  g.floodFill(0,0,'#ffffff');
}

// Clear the screen once, at startup
// draw immediately at first

//set lcd brightness to max
Bangle.setLCDBrightness(1);
//disable screen timeout
Bangle.setLCDTimeout(0);
Bangle.setLCDPower(1);

drawPattern();

//BTN1 exits
setWatch(function() {
  Bangle.showClock();
}, BTN, {edge:"rising", debounce:50, repeat:true});

