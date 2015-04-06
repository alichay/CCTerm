overlayContext = {
	clearRect:function(a,b,c,d){}
};
context = {
	clearRect:function(a,b,c,d){},
	putImageData:function(a,b,c){},
	getImageData:function(a,b,c,d,e,f,g){}
};
canvas = {
	width: 0,
	height: 0
};
if(typeof termAPI !== 'undefined')
termAPI.scroll = function(L) {
	var computer = core.getActiveComputer();
	var amount = C.luaL_checkint(L, 1);




	
	if (amount < 0) {
		for (var i = amount; i < 0; i++) {

			// TODO: Scrolling up
			
			//render.clearLine(-i, fg, bg);
		}
	} else {
		for (var i = 0; i < amount; i++) {
			//render.clearLine(computer.height - i, fg, bg);
			for(var y=2;y<RenderTerm.buff.length;y++) {
				RenderTerm.buff[y-1] = RenderTerm.buff[y];
			}
			RenderTerm.buff.shift();
			
			RenderTerm.buff.pop();
		}
	}
	RenderTerm.refresh_buff();
	RenderTerm.rerender();

	//render.border();

	//console.log(amount);
   
	return 0;
}
