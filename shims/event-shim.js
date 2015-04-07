

//
//  event.js
//  GravityScore and 1lann
//



var events = {
	"prevMouseState": {
		"x": -1,
		"y": -1,
		"button": -1,
	},

	"mouseDown": false,
	"pasting": false,
	"triggerKeyTimerID": null,
	"triggerKey": null,
};



//
//    Key Events
//


events.paste = function(computer) {
	events.pasting = true;

	var captureField = $("#mobile-input");
	captureField.val("");
	captureField.focus();

	setTimeout(function() {
		var pasted = captureField.val();
		captureField.val(">");

		for (var i = 0; i < pasted.length; i++) {
			var letter = pasted[i];
			var keyCode = parseInt(globals.charCodes[letter]);
			var code = globals.keyCodes[keyCode];

			if (typeof(code) != "undefined") {
				computer.eventStack.push(["key", code]);
			}

			if (typeof(letter) != "undefined") {
				computer.eventStack.push(["char", letter]);
			}
		}

		captureField.blur();

		if (pasted.length > 0) {
			computer.resume();
		}

		events.pasting = false;
	}, 20);
}


events.activateTrigger = function(computer, character) {
	var triggerDuration = 1000;
	var triggers = {
		"r": computer.reboot,
		"s": computer.shutdown,
		"t": computer.terminate,
	};

	for (var triggerKey in triggers) {
		if (character == triggerKey) {
			var func = triggers[triggerKey];

			events.triggerKey = character;
			events.triggerKeyTimerID = setTimeout(function() {
				func.call(computer);
				events.triggerKeyTimerID = null;
			}, triggerDuration);
		}
	}
}


events.pushKey = function(computer, character, code) {
	if (typeof(code) != "undefined") {
		computer.eventStack.push(["key", code]);
	} if (typeof(character) != "undefined") {
		computer.eventStack.push(["char", character]);
	}

	if (computer.eventStack.length > 0) {
		computer.resume();
	}
}

AddKeyListener(function(ch, key) {
	event = {
		ctrlKey : key.ctrl,
		keyCode : key.code
	}
	//if (sidebar.typeOfSelected() != "computer" || isTouchDevice()) {
	//	return;
	//}

	var computer = core.getActiveComputer();
	if (typeof(computer) == "undefined") {
		return;
	}

	if (computer.hasErrored && key.code == 13) {
		computer.reboot();
		return;
	}
	if(key.code == 8) {
		RenderTerm.redraw_from_buf(computer.cursor.x+1, computer.cursor.y+1);
		RenderTerm.redraw_from_buf(computer.cursor.x, computer.cursor.y+1);
	}


	var code = parseInt(globals.keyCodes[event.keyCode]);
	var character = ch;
	//if (event.shiftKey || CapsLock.isOn()) {
	//	character = globals.characters.shift[event.keyCode];
	//}

	var shouldActivateTrigger = event.ctrlKey && character && !events.triggerKeyTimerID;
	var shouldPaste =
		(event.ctrlKey || event.metaKey) &&
		character &&
		character.toLowerCase() == "v";

	if (shouldPaste) {
		events.paste(computer);
	} else if (shouldActivateTrigger) {
		events.activateTrigger(computer, character);
	} else if (!events.triggerKeyTimerID) {
		events.pushKey(computer, character, code);
	}

	var shouldCancelKey =
		event.keyCode == 8 ||
		event.keyCode == 86 ||
		event.keyCode == 9;
},function(ch, key) {
	var character = ch;

	if (events.triggerKeyTimerID && character == events.triggerKey) {
		clearTimeout(events.triggerKeyTimerID);
		events.triggerKeyTimerID = null;
	}
});

var window = {};


var _MDA=[];
var _MD = function(){for(var i=0;i<_MDA.length;i++){if(_MDA[i]){return true;}return false;}};
var sloppyGetHeldBtn = function(){for(var i=0;i<_MDA.length;i++){if(_MDA[i]){return i;}return -1;}};
program.on('mouse', function(data) {

	data.y -= 1; // -2 for header, +1 for CCization
	data.x += 1; // +1 for CCization

	if(data.action == 'mousedown') {

		window.onmousedown({
			x:data.x,
			y:data.y,
			button:data.button
		});
		_MDA[data.button]=true;
	} else if(data.action == 'mouseup') {
		_MDA[data.button]=false;
		window.onmouseup({
			x:data.x,
			y:data.y,
			button:data.button
		});
	} else if(data.action == 'mousemove') {
		if(_MD()) {
			var b = sloppyGetHeldBtn();
			if(b!==-1)
			window.onmousemove({
				x:data.x,
				y:data.y,
				button:b,
			});
		}
	} else if(data.action == 'wheeldown') {
		events.onmousewheel({
			x:data.x,
			y:data.y,
			'dir':1,
		});
	} else if(data.action == 'wheelup') {
		events.onmousewheel({
			x:data.x,
			y:data.y,
			'dir':-1,
		});
	}
});

//
//    Mouse Events
//


window.onmousedown = function(event) {
	//if (sidebar.typeOfSelected() != "computer") {
	//	return;
	//}

	events.mouseDown = true;

	var computer = core.getActiveComputer();

	if (typeof(computer) != "undefined") {
		var loc = computer.getLocation();
		var button = globals.buttons[event.button];
		var x=event.x, y=event.y;
		var size = computer.getActualSize();
		if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
			computer.eventStack.push(["mouse_click", button, x, y]);
			computer.resume();
		}
	}
}


window.onmouseup = function(event) {
	events.mouseDown = false;
}


window.onmousemove = function(event) {
	//if (sidebar.typeOfSelected() != "computer") {
	//	return;
	//}

	var computer = core.getActiveComputer();

	if (typeof(computer) != "undefined") {

		var x = event.x;
		var y = event.y;
		var button = globals.buttons[event.button];

		var withinBounds = (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height);
		var differentFromPrevious =
			events.prevMouseState.button != button ||
			events.prevMouseState.x != x ||
			events.prevMouseState.y != y;

		if (events.mouseDown && differentFromPrevious && withinBounds) {
			computer.eventStack.push(["mouse_drag", button, x, y]);
			computer.resume();

			events.prevMouseState.button = button;
			events.prevMouseState.x = x;
			events.prevMouseState.y = y;
		}
	}
}



//
//    Mobile Input
//


isTouchDevice = function() {
	return false;//!!('ontouchstart' in window);
}


events.onMobileInput = function() {};


events.onMobileSubmit = function(event) {}

//
//   Scrolling
//


var compoundScroll = 0;


events.onmousewheel = function(e) {
	var e = e;
	var delta = e.dir;

	if (!delta) {
		return true;
	}

	var computer = core.getActiveComputer();
	if (!computer) {
		return;
	}

	var x = e.x;
	var y = e.y;

	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		compoundScroll += delta;

		var amount = Math.abs(Math.round(compoundScroll / 100));
		if (amount != 0) {
			if (Math.ceil(compoundScroll / 100) < 0) {
				for (var i = 0; i <= amount; i++) {
					computer.eventStack.push(["mouse_scroll", 1, x, y]);
				}
			} else {
				for (var i = 0; i <= Math.round(compoundScroll / 100); i++) {
					computer.eventStack.push(["mouse_scroll", -1, x, y]);
				}
			}
		}

		compoundScroll = compoundScroll % 100;
		computer.resume();
	}
}


//if (window.addEventListener) {
//	window.addEventListener("mousewheel", events.onmousewheel, false);
//	window.addEventListener("DOMMouseScroll", events.onmousewheel, false);
//} else {
//	window.attachEvent("onmousewheel", events.onmousewheel);
//}
