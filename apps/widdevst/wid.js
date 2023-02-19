(() => {
  WIDGETS.stat = {area: "tr", width: 21, draw: function() {
    var x = this.x;
    var y = this.y;
    g.reset();
    g.clearRect(x, y, x + 20, y + 23);
    g.drawRect(x + 1, y + 1, x + 19, y + 22);
    g.setFont('6x8', 1);
    if (NRF.getSecurityStatus().connected) g.drawString('B', x + 4, y + 3);
    if (Bangle.isCompassOn()) g.drawString('C', x + 12, y + 3);
    if (Bangle.isGPSOn()) g.drawString('G', x + 4, y + 13);
    if (Bangle.isHRMOn()) g.drawString('H', x + 12, y + 13);
    var t = require('Storage').getStats();
    var u = t.fileBytes / t.totalBytes;
    g.setColor(col(u)); g.drawRect(x + 1, y + 22, x + 1 + u * 18, y + 23);
    t = process.memory(false);
    u = t.usage / t.total;
    g.setColor(col(u)); g.drawRect(x, y + 22 - u * 21, x + 1, y + 22);
  }};

  function col(p) {
    return p < 0.5 ? '#0f0' : (p < 0.8 ? '#f80' : '#f00');
  }

  var draw = WIDGETS.stat.draw.bind(WIDGETS.stat);
  var iid = setInterval(draw, 2000);

  Bangle.on('lcdPower', (on) => {
    if (on) {
      draw();
      if (!iid) iid = setInterval(draw, 2000);
    } else if (iid) iid = clearInterval(iid);
  });
})();
