
var menuBarX = 0;

var activeMenu=null;


module.exports = function(blessed,box,screen, menuBar){return function(title, buttons) {
	var fileButton = blessed.button({
		width: title.length+2,
		left:menuBarX,
		top:0,
		content: " "+title+" ",
		bg: 'white',
		fg: 'black',
	});
	menuBarX += title.length+3;
	fileButton.enableMouse();

	var fileMenu,fileMenuIsOpen=false;

	var FileMenuClick = function() {
		if(fileMenuIsOpen) {
			CloseFileMenu();
		} else {
			OpenFileMenu();
		}
	};

	var OpenFileMenu = function() {	

		if(activeMenu!==null) activeMenu();

		var parent = fileButton;

		fileMenu = blessed.box({
			top: 1,
			left:parent.left,
			width: 10,
			height: buttons.length+2,
			style: {
			bg: 'red',
			},
			border: {type: 'line'},
		});

		for(var i=0;i<buttons.length;i++) {
			var btn = blessed.button({
				width: 8,
				height:1,
				left:0,
				top:i,
				content:buttons[i][0],
				style: {
					hover: {
						bg: 'blue'
					}
				}
			});
			btn.on('click', (function(b,i){return function(){
				b[i][1]();
				CloseFileMenu();
			};})(buttons,i));
			fileMenu.append(btn);
		}
		fileMenu.enableMouse();
		screen.prepend(fileMenu);
		fileMenu.setFront();
		screen.render();
		fileMenuIsOpen=true;
		activeMenu = CloseFileMenu;
	};
	var CloseFileMenu = function() {
		fileMenu.detach();
		screen.render();
		fileMenuIsOpen=false;
		activeMenu=null;
	};

	fileButton.on('click', FileMenuClick);
	menuBar.append(fileButton);
};
};
