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
})({"epB2":[function(require,module,exports) {
var simplyUrl = function simplyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('//', '').replace('www.', '').replace(/\/.*/, '');
};

var localStorageDate = window.localStorage.getItem('siteData');
var siteData;

var render = function render() {
  $lastChild = $('.siteList li.last');
  $('.siteList').find('li:not(.last)').remove();
  siteData.forEach(function (siteItem, index) {
    var $elements = $("\n  <li>\n  <div class=\"site\">\n          <div class=\"logo\">\n           ".concat(simplyUrl(siteItem.site)[0].toLocaleUpperCase(), "\n          </div>\n          <div class=\"link\">\n            ").concat(simplyUrl(siteItem.site), "\n          </div>\n          <div class=\"removeSite\">\n          <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-remove\"></use>\n          </svg>\n          </div>\n        </div>\n    </li>\n  "));
    $elements.insertBefore($lastChild);
    $elements.on('click', function () {
      window.open(siteItem.site);
    });
    $elements.on('click', '.removeSite', function (e) {
      siteData.splice(index, 1);
      window.localStorage.setItem('siteData', JSON.stringify(siteData));
      render();
      e.stopPropagation();
    });
  });
};

if (!localStorageDate) {
  var initData = [{
    site: '//www.daqianduan.com/nav/'
  }, {
    site: '//www.alloyteam.com/nav/'
  }];
  siteData = initData;
} else {
  siteData = JSON.parse(localStorageDate);
}

render();
$('.addIcon').on('click', function () {
  var url = window.prompt('请输入正确的网址');

  if (url.indexOf('http') !== 0) {
    url = '//' + url;
  }

  siteData.push({
    site: url
  });
  window.localStorage.setItem('siteData', JSON.stringify(siteData));
  render();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1dcb974f.js.map