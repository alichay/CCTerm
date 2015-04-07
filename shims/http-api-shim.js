
//
//  http.js
//  GravityScore and 1lann
//

var http = require('http');


var httpAPI = {};

function fixURL(u) {
u = u.replace("http://", "").replace("https://", "")
split = u.split("/");
return {host:split.shift(), path:split.join("/")}
}

httpAPI.request = function(L) {
	var computer = core.getActiveComputer();
	var url = C.luaL_checkstring(L, 1);

	var postData;

	var shouldUsePost = false;
	if (C.lua_type(L, 2) != -1 && C.lua_type(L, 2) != C.LUA_TNIL) {
		postData = C.luaL_checkstring(L, 2);
		shouldUsePost = true;
	}

	onHttpCompletion = function(response) {
		if (response.status == "200") {
			computer.eventStack.push(["http_bios_wrapper_success", url, response.html]);
			computer.resume();
		} else {
			//console.log("HTTP Failure: ",response)
			computer.eventStack.push(["http_failure", url]);
			computer.resume();
		}
	}

	if (shouldUsePost) {
		fixd = fixURL(url);
		var post_options = {
			host: fixd.host,
			port: '80',
			path: fixd.path,
			method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': postData.length
			}
		};
		var post_req = http.request(post_options, function(res){
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				onHttpCompletion({status:res.statusCode, html:chunk})
			});		
		});
	 } else {
		http.get(url, function(res){
			res.setEncoding('utf8');
			var data = "";
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function(){
				onHttpCompletion({status:res.statusCode, html:data})
			});		
		});

	}

	return 0;
}
