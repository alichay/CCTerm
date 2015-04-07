/*
<script src="scripts/lib/jquery.min.js"></script>
<script src="scripts/lib/bootstrap.min.js"></script>
<script src="scripts/lib/ace/src-min-noconflict/ace.js" charset="utf-8"></script>
<script src="scripts/lib/Blob.js"></script>
<script src="scripts/lib/FileSaver.js"></script>
<script src="scripts/lib/CapsLock.compressed.js"></script>

<script src="scripts/ui/sidebar.js"></script>
<script src="scripts/ui/ui.js"></script>

<script src="scripts/lib/purl.js"></script>
<script src="scripts/lib/lua5.1.5.min.js"></script>
<script src="scripts/lib/browserfs.js"></script>
<script src="scripts/lib/xdRequest.js"></script>

<script src="scripts/code.js"></script>
<script src="scripts/globals.js"></script>
<script src="scripts/core.js"></script>
<script src="scripts/computer.js"></script>
<script src="scripts/filesystem.js"></script>
<script src="scripts/render.js"></script>
<script src="scripts/event.js"></script>

<script src="scripts/apis/bit.js"></script>
<script src="scripts/apis/fs.js"></script>
<script src="scripts/apis/http.js"></script>
<script src="scripts/apis/os.js"></script>
<script src="scripts/apis/peripheral.js"></script>
<script src="scripts/apis/redstone.js"></script>
<script src="scripts/apis/term.js"></script>
*/

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
if(!String.prototype.contains){String.prototype.contains=String.prototype.includes;}
var fs = require("fs");

var var_dump = require("./shims/var_dump.js");

eval(fs.readFileSync("./ui.js", {encoding:'utf8'}));

//*/

eval(fs.readFileSync("./shims/ui-shim.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/lib/lua5.1.5.min.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/code.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/globals.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/colors.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/core.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/computer.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/filesystem-shim.js", {encoding:'utf8'}));
//eval(fs.readFileSync("./Mimic-master/scripts/render.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/render-shim.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/event-shim.js", {encoding:'utf8'}));
//eval(fs.readFileSync("./Mimic-master/scripts/event.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/bit.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/fs.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/http-api-shim.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/os.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/peripheral.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/redstone.js", {encoding:'utf8'}));

// Some parts of the term shim need to be applied before, and some after,
// so I just add it twice.  Sorry, guys.

eval(fs.readFileSync("./shims/term-api-shim.js", {encoding:'utf8'}));
eval(fs.readFileSync("./Mimic-master/scripts/apis/term.js", {encoding:'utf8'}));
eval(fs.readFileSync("./shims/term-api-shim.js", {encoding:'utf8'}));

ui.beforeLoad();
core.loadStartupScript = function(c) {c();}
core.oldAfterSetup = core.afterSetup;
core.afterSetup = function(){
	core.oldAfterSetup();
	if(core.getActiveComputer() == undefined) {
		//console.log("CREATING");
		//process.exit(0);
		core.createComputer(1, true);
	} else {
		console.log("CREATED");
		//process.exit(0);
	}

}
core.run();

// */
