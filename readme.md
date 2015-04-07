#CCTerm

A fully featured emulator for the [Minecraft](http://minecraft.net) mod [ComputerCraft](http://computercraft.info) that runs in the comfort of your terminal!

CCTerm makes use of
* [Mimic](https://github.com/1lann/Mimic) - ComputerCraft ported into JavaScript
* [Emscripten](https://github.com/kripken/emscripten) - allowing a direct port of Lua 5.1 into JavaScript
* [asm.js](http://asmjs.org/) - the engine behind Emscripten
* [lua5.1.js](https://github.com/logiceditor-com/lua5.1.js/) - a library built by Emscripten
* The default rom files that come with ComputerCraft

##Key Rebindings

Control -> Control+Space

##Install

1. Install NodeJS for your platform.

  Ubuntu: sudo apt-get install nodejs
  Arch: sudo pacman -S nodejs
  Mac: (NOT TESTED) Install NodeJS from here: https://nodejs.org/

2. Unzip this repository to a folder.

3. Profit..?

##Running

In a terminal, navigate to the folder you extracted CCTerm to, and run "nodejs ccterm.js"

###Credits

* Made by [Zangent](https://github.com/zacpier) (Twitter: [@Zangent](https://twitter.com/zangent))
* Mimic by [GravityScore](https://github.com/GravityScore) and [1lann](https://github.com/1lann)
* ComputerCraft by dan200 (Twitter: [@DanTwoHundred](https://twitter.com/dan200))
* lua5.1.js by [Alexander Gladysh](https://github.com/agladysh)

###License

CCTerm is licensed under The GNU Public License Version 3 (GPL-3)

Link: [The GNU Public License Version 3 (GPL-3)](https://www.gnu.org/copyleft/gpl.html)

CCTerm by Zangent - Copyright (c) 2015

Summary of the license: [The GNU Public License Version 3 (GPL-3) Summary](https://tldrlegal.com/license/gnu-general-public-license-v3-%28gpl-3%29)

Note this license does not apply for material used in CCTerm that I do not own.

###Mimic License

Mimic is licensed under The Q Public License Version (QPL-1.0)

Link: [The Q Public License Version (QPL-1.0)](http://opensource.org/licenses/QPL-1.0)

Mimic by GravityScore and 1lann - Copyright (c) 2014

Summary of the license:

You may modify this software and redistrubute it under the conditions:
* You must retain the copyright and license in any redistrubutions and modifications of this software.
* You may not charge for anything other than the data transfer costs of this software when redistrubuting.

Note this license does not apply for material used in Mimic that we do not own.


###lua5.1.js License

lua5.1.js is licensed under the terms of the MIT license, reproduced below.
This means that lua5.1.js is free software and can be used for both academic
and commercial purposes at absolutely no cost.

Link: [lua5.1.js](https://github.com/logiceditor-com/lua5.1.js/)

```
lua5.1.js: Copyright (c) 2013, LogicEditor <info@logiceditor.com>
           Copyright (c) 2013, lua5.1.js authors (see AUTHORS)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

###Emscripten License

Emscripten is licensed under the MIT license, shown above.

Link: [Emscripten](https://github.com/kripken/emscripten)

###Purl License

Purl is licensed under the MIT license, shown above.

Link: [Purl](https://github.com/allmarkedup/purl)
