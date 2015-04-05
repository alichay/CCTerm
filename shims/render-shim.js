var render = {};

//
//    Setup
//


render.setup = function(callback) {callback();}



//
//    Individual Cells
//

var lastfg = 'light white';
var lastbg = 'black';

render.characterBackground = function(x, y, color, ctx) {
	
	var computer = core.getActiveComputer();

	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		//var actualWidth = config.cellWidth * config.terminalScale;
		//var actualHeight = config.cellHeight * config.terminalScale;
		//var cellX = ((x - 1) * actualWidth + config.borderWidth);
		//var cellY = ((y - 1) * actualHeight + config.borderHeight);

		//ctx.beginPath();
		//ctx.rect(cellX, cellY, actualWidth, actualHeight);
		//ctx.fillStyle = globals.colors[color];
		//ctx.fill();
		lastbg = color;
		RenderTerm.setch(x,y+1," ", color, lastfg);
	}
}


render.characterText = function(x, y, text, color, ctx) {
	//if (typeof(ctx) == "undefined") {
	//	ctx = context;
	//}

	if (text == " ") {
		return;
	}

	var computer = core.getActiveComputer();
	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		/*
		var loc = characters.indexOf(text);
		if (loc != -1) {
			var imgW = font.width / 16;
			var imgH = font.height / 16 / 16;
			var startY = parseInt(color, 16) * (font.height / 16);

			var imgX = loc % CHARACTERS_PER_LINE;
			var imgY = (loc - imgX) / CHARACTERS_PER_LINE + LINE_Y_OFFSET;
			imgX *= imgW;
			imgY *= imgH;
			imgY += startY;

			var offset = imgW / 2 - globals.characterWidths[loc] / 2 - 1;
			if (text == "@" || text == "~") {
				offset -= 1;
			}

			var actualWidth = config.cellWidth * config.terminalScale;
			var actualHeight = config.cellHeight * config.terminalScale;
			var textX = (x - 1) * actualWidth + config.borderWidth + offset;
			var textY = (y - 1) * actualHeight + config.borderHeight + 1;

			var scaledImgWidth = imgW * config.terminalScale;
			var scaledImgHeight = imgH * config.terminalScale;

			ctx.drawImage(font, imgX, imgY, imgW, imgH, textX, textY,
				scaledImgWidth, scaledImgHeight);
		}
	   */
		lastfg = color;
		RenderTerm.setch(x,y+1,text, lastbg, color);

	}
}


render.character = function(x, y, text, foreground, background, ctx) {
	//if (typeof(ctx) == "undefined") {
	//	ctx = context;
	//}

	var computer = core.getActiveComputer();
	RenderTerm.setsize(computer.width, computer.height);

	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		if (typeof(background) != "undefined") {
			render.characterBackground(x, y, globals.colors[background], ctx);
		}

		if (typeof(foreground) != "undefined") {
			render.characterText(x, y, text, globals.colors[foreground], ctx);
		}
	}
}



//
//    Multiple Cells
//


render.border = function(color) {
	/*
	color = color || "0";

	context.fillStyle = globals.colors[color];

	context.beginPath();
	context.rect(0, 0, config.borderWidth, canvas.height);
	context.fill();

	context.beginPath();
	context.rect(canvas.width - config.borderWidth, 0, config.borderWidth, canvas.height);
	context.fill();

	context.beginPath();
	context.rect(0, 0, canvas.width, config.borderHeight);
	context.fill();

	context.beginPath();
	context.rect(0, canvas.height - config.borderHeight, canvas.width, config.borderHeight);
	context.fill();
   */
}


render.clearLine = function(y, foreground, background) {
	background = background || "0";
	foreground = foreground || "f";

	var computer = core.getActiveComputer();
	render.text(1, y, " ".repeat(computer.width), foreground, background);

	render.border();
}


render.clear = function(foreground, background) {
	background = background || "0";
	foreground = foreground || "f";

	var computer = core.getActiveComputer();
	for (var i = 1; i <= computer.height; i++) {
		render.clearLine(i, foreground, background);
	}

	render.border();
}


render.text = function(x, y, text, foreground, background, ctx) {
	var computer = core.getActiveComputer();
	for (var i = 0; i < text.length; i++) {
		render.character(x + i, y, text.charAt(i), foreground, background, ctx);
	}
}


render.centredText = function(y, text, foreground, background, ctx) {
	var computer = core.getActiveComputer();
	var x = Math.floor(computer.width / 2 - text.length / 2);
	render.text(x, y, text, foreground, background, ctx);
}



//
//    Cursor
//


render.cursorBlink = function() {
	var computer = core.getActiveComputer();

	if (computer.cursor.blink && core.cursorFlash) {
		//overlayContext.clearRect(0, 0, canvas.width, canvas.height);

		var x = computer.cursor.x;
		var y = computer.cursor.y+1;
		var color = computer.colors.foreground;

		RenderTerm.setch_nobuf(x, y, "_", lastbg, globals.colors[color]);
	} else {
		RenderTerm.redraw_from_buf(computer.cursor.x, computer.cursor.y+1);
		//overlayContext.clearRect(0, 0, canvas.width, canvas.height);
	}
}



//
//    Blue Screen of Death
//


render.bsod = function(title, lines) {

	var err = new Error();
	console.log("");
    var_dump(err.stack);

	/*
	render.clear("f", "4");

	var computer = core.getActiveComputer();
	computer.cursor.blink = false;
	render.cursorBlink();

	render.clearLine(5, "f", "f");
	render.centredText(5, title, "4", "f");

	for (var i in lines) {
		var line = lines[i];
		render.centredText(9 + parseInt(i), line, "f", "4");
	}

	render.centredText(10 + lines.length, "Press enter to reboot the computer...", "f", "4");
   */
}
