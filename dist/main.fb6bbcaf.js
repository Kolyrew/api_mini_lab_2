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
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRepeatPassword = exports.validatePassword = exports.validateName = exports.validateEmail = exports.submitSignUpForm = exports.submitSignInForm = exports.setFormValue = exports.getValidationStatus = exports.btnBlock = void 0;
var formValues = {};
var formValidation = {};
var validatePassword = exports.validatePassword = function validatePassword(e) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return e.match(regex);
};
var validateName = exports.validateName = function validateName(e) {
  return String(e).length > 0;
};
var validateRepeatPassword = exports.validateRepeatPassword = function validateRepeatPassword(e) {
  return e === formValues.password;
};
var validateEmail = exports.validateEmail = function validateEmail(email) {
  var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email).toLowerCase().match(regExp);
};
var getValidationStatus = exports.getValidationStatus = function getValidationStatus() {
  return Object.values(formValidation).every(function (validationStatus) {
    return !!validationStatus;
  });
};
var btnBlock = exports.btnBlock = function btnBlock(btn, form_id) {
  var inputs = document.querySelectorAll("#".concat(form_id, " input"));
  if (Array.from(inputs).every(function (input) {
    return input.value.trim() !== "";
  }) && getValidationStatus()) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};
var setFormValue = exports.setFormValue = function setFormValue(valueKey, target, validator) {
  formValues[valueKey] = target.value;
  if (validator !== undefined) {
    var isValid = validator(target.value);
    if (!isValid) {
      target.classList.add('invalid');
    } else {
      target.classList.remove('invalid');
      target.classList.add('valid');
    }
    formValidation[valueKey] = isValid;
  }
};
var submitSignUpForm = exports.submitSignUpForm = function submitSignUpForm() {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
};
var submitSignInForm = exports.submitSignInForm = function submitSignInForm() {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
};
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");
//Почему-то происходят баги в Sign In, но сам код правильный.

console.log("Document");
console.log(document);
var first_name_id = 'first_name';
var last_name_id = 'last_name';
var password_id = 'password';
var sign_in_password_id = 'sign_in_password';
var sign_in_repeat_password_id = 'sign_in_password_repeat';
var repeat_password_id = 'password-repeat';
var email_id = 'email';
var sign_in_email_id = 'sign_in_email';
var sign_in_link_id = 'sign_in_link';
var sign_up_form_id = 'sign_up_form';
var sign_up_btn_id = 'sign_up_btn';
var sign_in_form_id = 'sign_in_form';
var first_name = document.getElementById(first_name_id);
var last_name = document.getElementById(last_name_id);
var email = document.getElementById(email_id);
var password = document.getElementById(password_id);
var repeat_password = document.getElementById(repeat_password_id);
var sign_in_password = document.getElementById('sign_in_password');
var sign_in_email = document.getElementById('sign_in_email');
var sign_in_repeat_password = document.getElementById('sign_in_password_repeat');
var sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.disabled = true;
sign_in_btn.disabled = true;
var form_id = sign_up_form_id;
first_name.oninput = function (e) {
  (0, _utils.setFormValue)(first_name_id, e.target, _utils.validateName);
  (0, _utils.btnBlock)(sign_up_btn, form_id);
};
last_name.oninput = function (e) {
  (0, _utils.setFormValue)(last_name_id, e.target, _utils.validateName);
  (0, _utils.btnBlock)(sign_up_btn, form_id);
};
email.oninput = function (e) {
  (0, _utils.setFormValue)(email_id, e.target, _utils.validateEmail);
  (0, _utils.btnBlock)(sign_up_btn, form_id);
};
password.oninput = function (e) {
  (0, _utils.setFormValue)(password_id, e.target, _utils.validatePassword);
  (0, _utils.btnBlock)(sign_up_btn, form_id);
};
repeat_password.oninput = function (e) {
  (0, _utils.setFormValue)(repeat_password_id, e.target, _utils.validateRepeatPassword);
  (0, _utils.btnBlock)(sign_up_btn, form_id);
};
sign_in_password.oninput = function (e) {
  (0, _utils.setFormValue)(sign_in_password_id, e.target, _utils.validatePassword);
  (0, _utils.btnBlock)(sign_in_btn, form_id);
};
sign_in_email.oninput = function (e) {
  (0, _utils.setFormValue)(sign_in_email_id, e.target, _utils.validateEmail);
  (0, _utils.btnBlock)(sign_in_btn, form_id);
};
sign_in_repeat_password.oninput = function (e) {
  (0, _utils.setFormValue)(sign_in_repeat_password_id, e.target, _utils.validateRepeatPassword);
  (0, _utils.btnBlock)(sign_in_btn, form_id);
};
var switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = function (e) {
  document.getElementById(sign_up_form_id).style.display = "none";
  form_id = sign_in_form_id;
  document.getElementById(sign_in_form_id).style.display = "";
};
sign_up_btn.onclick = function (e) {
  e.preventDefault();
  (0, _utils.submitSignUpForm)();
};
sign_in_btn.onclick = function (e) {
  e.preventDefault();
  (0, _utils.submitSignInForm)();
};
},{"./utils.js":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54286" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map