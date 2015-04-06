var blessed = require('blessed'), program=blessed.program();
var var_dump = require('./shims/var_dump.js');
var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
});

var box = blessed.box({
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  autoPadding:true,
  padding:{left:1,top:0,right:1,bottom:1},
  content: '',
  tags: true,
  style: {
    fg: '#ffffff',
    bg: '#333333'
  }
});


screen.append(box);

var menuBar = blessed.box({
	height: 1,
	top: 0,
	left: 0,
});
box.append(menuBar);



RenderTerm = blessed.box({
	top:2,
	left:0,
	content:'If you\'re using gnome-terminal, \nI reccomend the color profile "Linux Console"',
	style: {
		fg: 'white',
		bg: 'black'
	}
});
RenderTerm.setch = function(x, y, ch) {
	program.setx(x);
	program.sety(y);
	program.write(ch);
};
RenderTerm.fg = function(c){program.fg(c);};
RenderTerm.bg = function(c){program.bg(c);};
box.append(RenderTerm);

arr = ["black", 0, "red", 1, "green", 2, "brown", 3, "blue", 4, "purple", 5, "cyan", 6, "light gray", 7, "gray", 8, "pink", 9, "lime", "a", "yellow", "b", "light blue", "c", "magenta", "d", "orange", "e", "white", "f"];

// Focus our element.
box.focus();

// Render the screen.
screen.render();

// Quit on Escape, q, or Control-C.
screen.key(['C-c'], function(ch, key) {
  return process.exit(0);
});

eval(require('fs').readFileSync("./shims/colors.js", {encoding:'utf8'}));

function RenderTest() {
for(var i=0;i<arr.length;i+=2) {
	RenderTerm.fg(globals.colors[arr[i+1]]);
	RenderTerm.setch(1, 5+(i/2), arr[i]);
}
}
RenderTest();
screen.on('resize', RenderTest);
program.on('keypress', function(ch, key){
	var_dump({'ch':ch,'key':key});
});

