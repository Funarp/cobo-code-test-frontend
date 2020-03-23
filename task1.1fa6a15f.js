// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/maze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rander_cells = void 0;

var rander_cells = function rander_cells(x, y) {
  var points = cale(maze(x, y));
  var cells = document.createElement('div');
  cells.setAttribute('id', 'cells');

  for (var i = 0; i < points.length; i++) {
    var row = document.createElement('div');
    row.setAttribute('class', 'row');

    for (var j = 0; j < points[i].length; j++) {
      var cell = document.createElement('div');

      if (i == j && j == 0) {
        cell.setAttribute('class', "".concat(gen_class(points[i][j]), " rat"));
      } else {
        cell.setAttribute('class', "".concat(gen_class(points[i][j])));
      }

      row.appendChild(cell);
    }

    cells.appendChild(row);
  }

  return cells;
};

exports.rander_cells = rander_cells;

function maze(x, y) {
  var n = x * y - 1;

  if (n < 0) {
    alert("illegal maze dimensions");
    return;
  }

  var horiz = [];

  for (var j = 0; j < x + 1; j++) {
    horiz[j] = [];
  }

  var verti = [];

  for (var _j = 0; _j < x + 1; _j++) {
    verti[_j] = [];
  }

  var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
  var path = [here];
  var unvisited = [];

  for (var _j2 = 0; _j2 < x + 2; _j2++) {
    unvisited[_j2] = [];

    for (var k = 0; k < y + 1; k++) {
      unvisited[_j2].push(_j2 > 0 && _j2 < x + 1 && k > 0 && (_j2 != here[0] + 1 || k != here[1] + 1));
    }
  }

  while (0 < n) {
    var potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1], [here[0] - 1, here[1]], [here[0], here[1] - 1]];
    var neighbors = [];

    for (var _j3 = 0; _j3 < 4; _j3++) {
      if (unvisited[potential[_j3][0] + 1][potential[_j3][1] + 1]) neighbors.push(potential[_j3]);
    }

    if (neighbors.length) {
      n = n - 1;
      var next = neighbors[Math.floor(Math.random() * neighbors.length)];
      unvisited[next[0] + 1][next[1] + 1] = false;
      if (next[0] == here[0]) horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;else verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
      path.push(here = next);
    } else here = path.pop();
  }

  return {
    x: x,
    y: y,
    horiz: horiz,
    verti: verti
  };
}

function cale(maze) {
  var points = [];

  for (var i = 0; i < maze.x; i++) {
    var temp = [];

    for (var j = 0; j < maze.y; j++) {
      var data = {
        top: false,
        bottom: false,
        left: false,
        right: false
      };

      if (i == 0) {
        data.top = true;
      } else if (i == maze.x - 1) {
        data.bottom = true;
      }

      if (j == 0) {
        data.left = true;
      } else if (j == maze.y - 1) {
        data.right = true;
      }

      temp.push(data);
    }

    points.push(temp);
  }

  points[0][0].left = false;
  points[maze.x - 1][maze.y - 1].right = false;

  for (var _i = 0; _i < maze.x; _i++) {
    for (var _j4 = 0; _j4 < maze.y - 1; _j4++) {
      if (!maze.horiz[_i][_j4]) {
        points[_i][_j4].right = true;
        points[_i][_j4 + 1].left = true;
      }
    }
  }

  for (var _i2 = 0; _i2 < maze.y - 1; _i2++) {
    for (var _j5 = 0; _j5 < maze.x; _j5++) {
      if (!maze.verti[_i2][_j5]) {
        points[_i2][_j5].bottom = true;
        points[_i2 + 1][_j5].top = true;
      }
    }
  }

  return points;
}

function gen_class(point) {
  var temp = "";

  for (var key in point) {
    if (point[key]) {
      temp += "".concat(key, " ");
    }
  }

  temp += "cell";
  return temp;
}
},{}],"js/panel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maze_panel = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var maze_panel = function maze_panel() {
  var rows = document.getElementsByClassName('row');
  var value = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };
  var panel = [];

  var _iterator = _createForOfIteratorHelper(rows),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      var nodes = row.children;
      var eachRow = [];

      var _iterator2 = _createForOfIteratorHelper(nodes),
          _step2;

      try {
        var _loop = function _loop() {
          var node = _step2.value;
          var borders = node.classList.value.split(' ').filter(function (className) {
            return ['top', 'left', 'right', 'bottom'].indexOf(className) != -1;
          });
          var borderMap = {};
          borders.forEach(function (line) {
            return borderMap[line] = true;
          });
          eachRow.push(Object.assign({}, value, borderMap));
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      panel.push(eachRow);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  console.log(JSON.stringify(panel));
  return panel;
};

exports.maze_panel = maze_panel;
},{}],"js/task1.js":[function(require,module,exports) {
"use strict";

var _maze = require("./maze");

var _panel = require("./panel");

var app = (0, _maze.rander_cells)(20, 20);
document.body.appendChild(app);
var rows = document.getElementsByClassName('row');
var panel = (0, _panel.maze_panel)();
var current = {
  'x': 0,
  'y': 0
};

function move(dir) {
  var x = current.x;
  var y = current.y;

  if (x == y && y == 0 && dir == "left") {
    alert("Don't leave Earth!");
    return;
  }

  if (x == y && y == panel.length - 1 && dir == "right") {
    alert("Bingo!");
    return;
  }

  if (!panel[x][y][dir]) {
    rows[x].children[y].classList.remove('rat');

    switch (dir) {
      case "top":
        x--;
        break;

      case "bottom":
        x++;
        break;

      case "left":
        y--;
        break;

      case "right":
        y++;
        break;

      default:
        break;
    }

    rows[x].children[y].classList.add('rat');
    current.x = x;
    current.y = y;
    return;
  } else {
    return;
  }
}

document.onkeydown = function (e) {
  var checkIE = document.all ? true : false;
  var key;

  if (checkIE) {
    key = window.event.keyCode;
  } else {
    key = e.which;
  }

  switch (key) {
    case 38:
      move("top");
      break;

    case 40:
      move("bottom");
      break;

    case 37:
      move("left");
      break;

    case 39:
      move("right");
      break;

    default:
      break;
  }
};
},{"./maze":"js/maze.js","./panel":"js/panel.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42783" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/task1.js"], null)
//# sourceMappingURL=/task1.1fa6a15f.js.map