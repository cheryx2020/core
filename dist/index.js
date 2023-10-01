function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var link$1 = {exports: {}};

var _interop_require_default$4 = {};

Object.defineProperty(_interop_require_default$4, "__esModule", {
    value: true
});
_interop_require_default$4.default = _interopRequireDefault;
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var _object_without_properties_loose = {};

Object.defineProperty(_object_without_properties_loose, "__esModule", {
    value: true
});
_object_without_properties_loose.default = _objectWithoutPropertiesLoose;
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

var react = {exports: {}};

var react_production_min = {};

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production_min;

function requireReact_production_min () {
	if (hasRequiredReact_production_min) return react_production_min;
	hasRequiredReact_production_min = 1;
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return "function"===typeof a?a:null}
	var B={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B;}E.prototype.isReactComponent={};
	E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B;}var H=G.prototype=new F;
	H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f;}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return {$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
	function N(a,b){return {$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return "object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0;}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
	a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c);}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
	function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b;},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b;});-1===a._status&&(a._status=0,a._result=b);}if(1===a._status)return a._result.default;throw a._result;}
	var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};react_production_min.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments);},e);},count:function(a){var b=0;S(a,function(){b++;});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};react_production_min.Component=E;react_production_min.Fragment=p;
	react_production_min.Profiler=r;react_production_min.PureComponent=G;react_production_min.StrictMode=q;react_production_min.Suspense=w;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
	react_production_min.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
	for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g;}return {$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};react_production_min.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};react_production_min.createElement=M;react_production_min.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};
	react_production_min.forwardRef=function(a){return {$$typeof:v,render:a}};react_production_min.isValidElement=O;react_production_min.lazy=function(a){return {$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};react_production_min.memo=function(a,b){return {$$typeof:x,type:a,compare:void 0===b?null:b}};react_production_min.startTransition=function(a){var b=V.transition;V.transition={};try{a();}finally{V.transition=b;}};react_production_min.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
	react_production_min.useCallback=function(a,b){return U.current.useCallback(a,b)};react_production_min.useContext=function(a){return U.current.useContext(a)};react_production_min.useDebugValue=function(){};react_production_min.useDeferredValue=function(a){return U.current.useDeferredValue(a)};react_production_min.useEffect=function(a,b){return U.current.useEffect(a,b)};react_production_min.useId=function(){return U.current.useId()};react_production_min.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
	react_production_min.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};react_production_min.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return U.current.useMemo(a,b)};react_production_min.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};react_production_min.useRef=function(a){return U.current.useRef(a)};react_production_min.useState=function(a){return U.current.useState(a)};react_production_min.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
	react_production_min.useTransition=function(){return U.current.useTransition()};react_production_min.version="18.2.0";
	return react_production_min;
}

var react_development = {exports: {}};

/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
react_development.exports;

var hasRequiredReact_development;

function requireReact_development () {
	if (hasRequiredReact_development) return react_development.exports;
	hasRequiredReact_development = 1;
	(function (module, exports) {

		if (process.env.NODE_ENV !== "production") {
		  (function() {

		/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
		if (
		  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
		  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
		    'function'
		) {
		  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
		}
		          var ReactVersion = '18.2.0';

		// ATTENTION
		// When adding new symbols to this file,
		// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
		// The Symbol used to tag the ReactElement-like types.
		var REACT_ELEMENT_TYPE = Symbol.for('react.element');
		var REACT_PORTAL_TYPE = Symbol.for('react.portal');
		var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
		var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
		var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
		var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
		var REACT_CONTEXT_TYPE = Symbol.for('react.context');
		var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
		var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
		var REACT_MEMO_TYPE = Symbol.for('react.memo');
		var REACT_LAZY_TYPE = Symbol.for('react.lazy');
		var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }

		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }

		  return null;
		}

		/**
		 * Keeps track of the current dispatcher.
		 */
		var ReactCurrentDispatcher = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		/**
		 * Keeps track of the current batch's configuration such as how long an update
		 * should suspend for if it needs to.
		 */
		var ReactCurrentBatchConfig = {
		  transition: null
		};

		var ReactCurrentActQueue = {
		  current: null,
		  // Used to reproduce behavior of `batchedUpdates` in legacy mode.
		  isBatchingLegacy: false,
		  didScheduleLegacyUpdate: false
		};

		/**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 */
		var ReactCurrentOwner = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
		  {
		    currentExtraStackFrame = stack;
		  }
		}

		{
		  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
		    {
		      currentExtraStackFrame = stack;
		    }
		  }; // Stack implementation injected by the current renderer.


		  ReactDebugCurrentFrame.getCurrentStack = null;

		  ReactDebugCurrentFrame.getStackAddendum = function () {
		    var stack = ''; // Add an extra top frame while an element is being validated

		    if (currentExtraStackFrame) {
		      stack += currentExtraStackFrame;
		    } // Delegate to the injected renderer-specific implementation


		    var impl = ReactDebugCurrentFrame.getCurrentStack;

		    if (impl) {
		      stack += impl() || '';
		    }

		    return stack;
		  };
		}

		// -----------------------------------------------------------------------------

		var enableScopeAPI = false; // Experimental Create Event Handle API.
		var enableCacheElement = false;
		var enableTransitionTracing = false; // No known bugs, but needs performance testing

		var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
		// stuff. Intended to enable React core members to more easily debug scheduling
		// issues in DEV builds.

		var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

		var ReactSharedInternals = {
		  ReactCurrentDispatcher: ReactCurrentDispatcher,
		  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
		  ReactCurrentOwner: ReactCurrentOwner
		};

		{
		  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
		  ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
		}

		// by calls to these methods by a Babel plugin.
		//
		// In PROD (or in packages without access to React internals),
		// they are left as they are instead.

		function warn(format) {
		  {
		    {
		      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        args[_key - 1] = arguments[_key];
		      }

		      printWarning('warn', format, args);
		    }
		  }
		}
		function error(format) {
		  {
		    {
		      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		        args[_key2 - 1] = arguments[_key2];
		      }

		      printWarning('error', format, args);
		    }
		  }
		}

		function printWarning(level, format, args) {
		  // When changing this logic, you might want to also
		  // update consoleWithStackDev.www.js as well.
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();

		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    } // eslint-disable-next-line react-internal/safe-string-coercion


		    var argsWithFormat = args.map(function (item) {
		      return String(item);
		    }); // Careful: RN currently depends on this prefix

		    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
		    // breaks IE9: https://github.com/facebook/react/issues/13610
		    // eslint-disable-next-line react-internal/no-production-logging

		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}

		var didWarnStateUpdateForUnmountedComponent = {};

		function warnNoop(publicInstance, callerName) {
		  {
		    var _constructor = publicInstance.constructor;
		    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
		    var warningKey = componentName + "." + callerName;

		    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
		      return;
		    }

		    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

		    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
		  }
		}
		/**
		 * This is the abstract API for an update queue.
		 */


		var ReactNoopUpdateQueue = {
		  /**
		   * Checks whether or not this composite component is mounted.
		   * @param {ReactClass} publicInstance The instance we want to test.
		   * @return {boolean} True if mounted, false otherwise.
		   * @protected
		   * @final
		   */
		  isMounted: function (publicInstance) {
		    return false;
		  },

		  /**
		   * Forces an update. This should only be invoked when it is known with
		   * certainty that we are **not** in a DOM transaction.
		   *
		   * You may want to call this when you know that some deeper aspect of the
		   * component's state has changed but `setState` was not called.
		   *
		   * This will not invoke `shouldComponentUpdate`, but it will invoke
		   * `componentWillUpdate` and `componentDidUpdate`.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueForceUpdate: function (publicInstance, callback, callerName) {
		    warnNoop(publicInstance, 'forceUpdate');
		  },

		  /**
		   * Replaces all of the state. Always use this or `setState` to mutate state.
		   * You should treat `this.state` as immutable.
		   *
		   * There is no guarantee that `this.state` will be immediately updated, so
		   * accessing `this.state` after calling this method may return the old value.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} completeState Next state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
		    warnNoop(publicInstance, 'replaceState');
		  },

		  /**
		   * Sets a subset of the state. This only exists because _pendingState is
		   * internal. This provides a merging strategy that is not available to deep
		   * properties which is confusing. TODO: Expose pendingState or don't use it
		   * during the merge.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} partialState Next partial state to be merged with state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} Name of the calling function in the public API.
		   * @internal
		   */
		  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
		    warnNoop(publicInstance, 'setState');
		  }
		};

		var assign = Object.assign;

		var emptyObject = {};

		{
		  Object.freeze(emptyObject);
		}
		/**
		 * Base class helpers for the updating state of a component.
		 */


		function Component(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
		  // renderer.

		  this.updater = updater || ReactNoopUpdateQueue;
		}

		Component.prototype.isReactComponent = {};
		/**
		 * Sets a subset of the state. Always use this to mutate
		 * state. You should treat `this.state` as immutable.
		 *
		 * There is no guarantee that `this.state` will be immediately updated, so
		 * accessing `this.state` after calling this method may return the old value.
		 *
		 * There is no guarantee that calls to `setState` will run synchronously,
		 * as they may eventually be batched together.  You can provide an optional
		 * callback that will be executed when the call to setState is actually
		 * completed.
		 *
		 * When a function is provided to setState, it will be called at some point in
		 * the future (not synchronously). It will be called with the up to date
		 * component arguments (state, props, context). These values can be different
		 * from this.* because your function may be called after receiveProps but before
		 * shouldComponentUpdate, and this new state, props, and context will not yet be
		 * assigned to this.
		 *
		 * @param {object|function} partialState Next partial state or function to
		 *        produce next partial state to be merged with current state.
		 * @param {?function} callback Called after state is updated.
		 * @final
		 * @protected
		 */

		Component.prototype.setState = function (partialState, callback) {
		  if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState != null) {
		    throw new Error('setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.');
		  }

		  this.updater.enqueueSetState(this, partialState, callback, 'setState');
		};
		/**
		 * Forces an update. This should only be invoked when it is known with
		 * certainty that we are **not** in a DOM transaction.
		 *
		 * You may want to call this when you know that some deeper aspect of the
		 * component's state has changed but `setState` was not called.
		 *
		 * This will not invoke `shouldComponentUpdate`, but it will invoke
		 * `componentWillUpdate` and `componentDidUpdate`.
		 *
		 * @param {?function} callback Called after update is complete.
		 * @final
		 * @protected
		 */


		Component.prototype.forceUpdate = function (callback) {
		  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
		};
		/**
		 * Deprecated APIs. These APIs used to exist on classic React classes but since
		 * we would like to deprecate them, we're not going to move them over to this
		 * modern base class. Instead, we define a getter that warns if it's accessed.
		 */


		{
		  var deprecatedAPIs = {
		    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
		    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
		  };

		  var defineDeprecationWarning = function (methodName, info) {
		    Object.defineProperty(Component.prototype, methodName, {
		      get: function () {
		        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

		        return undefined;
		      }
		    });
		  };

		  for (var fnName in deprecatedAPIs) {
		    if (deprecatedAPIs.hasOwnProperty(fnName)) {
		      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		    }
		  }
		}

		function ComponentDummy() {}

		ComponentDummy.prototype = Component.prototype;
		/**
		 * Convenience component with default shallow equality check for sCU.
		 */

		function PureComponent(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject;
		  this.updater = updater || ReactNoopUpdateQueue;
		}

		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

		assign(pureComponentPrototype, Component.prototype);
		pureComponentPrototype.isPureReactComponent = true;

		// an immutable object with a single mutable value
		function createRef() {
		  var refObject = {
		    current: null
		  };

		  {
		    Object.seal(refObject);
		  }

		  return refObject;
		}

		var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

		function isArray(a) {
		  return isArrayImpl(a);
		}

		/*
		 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
		 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
		 *
		 * The functions in this module will throw an easier-to-understand,
		 * easier-to-debug exception with a clear errors message message explaining the
		 * problem. (Instead of a confusing exception thrown inside the implementation
		 * of the `value` object).
		 */
		// $FlowFixMe only called in DEV, so void return is not possible.
		function typeName(value) {
		  {
		    // toStringTag is needed for namespaced types like Temporal.Instant
		    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
		    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
		    return type;
		  }
		} // $FlowFixMe only called in DEV, so void return is not possible.


		function willCoercionThrow(value) {
		  {
		    try {
		      testStringCoercion(value);
		      return false;
		    } catch (e) {
		      return true;
		    }
		  }
		}

		function testStringCoercion(value) {
		  // If you ended up here by following an exception call stack, here's what's
		  // happened: you supplied an object or symbol value to React (as a prop, key,
		  // DOM attribute, CSS property, string ref, etc.) and when React tried to
		  // coerce it to a string using `'' + value`, an exception was thrown.
		  //
		  // The most common types that will cause this exception are `Symbol` instances
		  // and Temporal objects like `Temporal.Instant`. But any object that has a
		  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
		  // exception. (Library authors do this to prevent users from using built-in
		  // numeric operators like `+` or comparison operators like `>=` because custom
		  // methods are needed to perform accurate arithmetic or comparison.)
		  //
		  // To fix the problem, coerce this object or symbol value to a string before
		  // passing it to React. The most reliable way is usually `String(value)`.
		  //
		  // To find which value is throwing, check the browser or debugger console.
		  // Before this exception was thrown, there should be `console.error` output
		  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
		  // problem and how that type was used: key, atrribute, input value prop, etc.
		  // In most cases, this console output also shows the component and its
		  // ancestor components where the exception happened.
		  //
		  // eslint-disable-next-line react-internal/safe-string-coercion
		  return '' + value;
		}
		function checkKeyStringCoercion(value) {
		  {
		    if (willCoercionThrow(value)) {
		      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

		      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
		    }
		  }
		}

		function getWrappedName(outerType, innerType, wrapperName) {
		  var displayName = outerType.displayName;

		  if (displayName) {
		    return displayName;
		  }

		  var functionName = innerType.displayName || innerType.name || '';
		  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
		} // Keep in sync with react-reconciler/getComponentNameFromFiber


		function getContextName(type) {
		  return type.displayName || 'Context';
		} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


		function getComponentNameFromType(type) {
		  if (type == null) {
		    // Host root, text node or just invalid type.
		    return null;
		  }

		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }

		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }

		  if (typeof type === 'string') {
		    return type;
		  }

		  switch (type) {
		    case REACT_FRAGMENT_TYPE:
		      return 'Fragment';

		    case REACT_PORTAL_TYPE:
		      return 'Portal';

		    case REACT_PROFILER_TYPE:
		      return 'Profiler';

		    case REACT_STRICT_MODE_TYPE:
		      return 'StrictMode';

		    case REACT_SUSPENSE_TYPE:
		      return 'Suspense';

		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';

		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';

		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';

		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');

		      case REACT_MEMO_TYPE:
		        var outerName = type.displayName || null;

		        if (outerName !== null) {
		          return outerName;
		        }

		        return getComponentNameFromType(type.type) || 'Memo';

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            return getComponentNameFromType(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }

		      // eslint-disable-next-line no-fallthrough
		    }
		  }

		  return null;
		}

		var hasOwnProperty = Object.prototype.hasOwnProperty;

		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

		{
		  didWarnAboutStringRefs = {};
		}

		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.ref !== undefined;
		}

		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.key !== undefined;
		}

		function defineKeyPropWarningGetter(props, displayName) {
		  var warnAboutAccessingKey = function () {
		    {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;

		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingKey.isReactWarning = true;
		  Object.defineProperty(props, 'key', {
		    get: warnAboutAccessingKey,
		    configurable: true
		  });
		}

		function defineRefPropWarningGetter(props, displayName) {
		  var warnAboutAccessingRef = function () {
		    {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;

		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingRef.isReactWarning = true;
		  Object.defineProperty(props, 'ref', {
		    get: warnAboutAccessingRef,
		    configurable: true
		  });
		}

		function warnIfStringRefCannotBeAutoConverted(config) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
		      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}
		/**
		 * Factory method to create a new React element. This no longer adheres to
		 * the class pattern, so do not use new to call it. Also, instanceof check
		 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		 * if something is a React Element.
		 *
		 * @param {*} type
		 * @param {*} props
		 * @param {*} key
		 * @param {string|object} ref
		 * @param {*} owner
		 * @param {*} self A *temporary* helper to detect places where `this` is
		 * different from the `owner` when React.createElement is called, so that we
		 * can warn. We want to get rid of owner and replace string `ref`s with arrow
		 * functions, and as long as `this` and owner are the same, there will be no
		 * change in behavior.
		 * @param {*} source An annotation object (added by a transpiler or otherwise)
		 * indicating filename, line number, and/or other information.
		 * @internal
		 */


		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    // This tag allows us to uniquely identify this as a React Element
		    $$typeof: REACT_ELEMENT_TYPE,
		    // Built-in properties that belong on the element
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    // Record the component responsible for creating this element.
		    _owner: owner
		  };

		  {
		    // The validation flag is currently mutative. We put it on
		    // an external backing store so that we can freeze the whole object.
		    // This can be replaced with a WeakMap once they are implemented in
		    // commonly used development environments.
		    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
		    // the validation flag non-enumerable (where possible, which should
		    // include every environment we run tests in), so the test framework
		    // ignores it.

		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    }); // self and source are DEV only properties.

		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    }); // Two elements created in two different places should be considered
		    // equal for testing purposes and therefore we hide it from enumeration.

		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });

		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }

		  return element;
		};
		/**
		 * Create and return a new ReactElement of the given type.
		 * See https://reactjs.org/docs/react-api.html#createelement
		 */

		function createElement(type, config, children) {
		  var propName; // Reserved names are extracted

		  var props = {};
		  var key = null;
		  var ref = null;
		  var self = null;
		  var source = null;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      ref = config.ref;

		      {
		        warnIfStringRefCannotBeAutoConverted(config);
		      }
		    }

		    if (hasValidKey(config)) {
		      {
		        checkKeyStringCoercion(config.key);
		      }

		      key = '' + config.key;
		    }

		    self = config.__self === undefined ? null : config.__self;
		    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    {
		      if (Object.freeze) {
		        Object.freeze(childArray);
		      }
		    }

		    props.children = childArray;
		  } // Resolve default props


		  if (type && type.defaultProps) {
		    var defaultProps = type.defaultProps;

		    for (propName in defaultProps) {
		      if (props[propName] === undefined) {
		        props[propName] = defaultProps[propName];
		      }
		    }
		  }

		  {
		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }

		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }
		  }

		  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
		  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
		  return newElement;
		}
		/**
		 * Clone and return a new ReactElement using element as the starting point.
		 * See https://reactjs.org/docs/react-api.html#cloneelement
		 */

		function cloneElement(element, config, children) {
		  if (element === null || element === undefined) {
		    throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
		  }

		  var propName; // Original props are copied

		  var props = assign({}, element.props); // Reserved names are extracted

		  var key = element.key;
		  var ref = element.ref; // Self is preserved since the owner is preserved.

		  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
		  // transpiler, and the original source is probably a better indicator of the
		  // true owner.

		  var source = element._source; // Owner will be preserved, unless ref is overridden

		  var owner = element._owner;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      // Silently steal the ref from the parent.
		      ref = config.ref;
		      owner = ReactCurrentOwner.current;
		    }

		    if (hasValidKey(config)) {
		      {
		        checkKeyStringCoercion(config.key);
		      }

		      key = '' + config.key;
		    } // Remaining properties override existing props


		    var defaultProps;

		    if (element.type && element.type.defaultProps) {
		      defaultProps = element.type.defaultProps;
		    }

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        if (config[propName] === undefined && defaultProps !== undefined) {
		          // Resolve default props
		          props[propName] = defaultProps[propName];
		        } else {
		          props[propName] = config[propName];
		        }
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    props.children = childArray;
		  }

		  return ReactElement(element.type, key, ref, self, source, owner, props);
		}
		/**
		 * Verifies the object is a ReactElement.
		 * See https://reactjs.org/docs/react-api.html#isvalidelement
		 * @param {?object} object
		 * @return {boolean} True if `object` is a ReactElement.
		 * @final
		 */

		function isValidElement(object) {
		  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}

		var SEPARATOR = '.';
		var SUBSEPARATOR = ':';
		/**
		 * Escape and wrap key so it is safe to use as a reactid
		 *
		 * @param {string} key to be escaped.
		 * @return {string} the escaped key.
		 */

		function escape(key) {
		  var escapeRegex = /[=:]/g;
		  var escaperLookup = {
		    '=': '=0',
		    ':': '=2'
		  };
		  var escapedString = key.replace(escapeRegex, function (match) {
		    return escaperLookup[match];
		  });
		  return '$' + escapedString;
		}
		/**
		 * TODO: Test that a single child and an array with one item have the same key
		 * pattern.
		 */


		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;

		function escapeUserProvidedKey(text) {
		  return text.replace(userProvidedKeyEscapeRegex, '$&/');
		}
		/**
		 * Generate a key string that identifies a element within a set.
		 *
		 * @param {*} element A element that could contain a manual key.
		 * @param {number} index Index that is used if a manual key is not provided.
		 * @return {string}
		 */


		function getElementKey(element, index) {
		  // Do some typechecking here since we call this blindly. We want to ensure
		  // that we don't block potential future ES APIs.
		  if (typeof element === 'object' && element !== null && element.key != null) {
		    // Explicit key
		    {
		      checkKeyStringCoercion(element.key);
		    }

		    return escape('' + element.key);
		  } // Implicit key determined by the index in the set


		  return index.toString(36);
		}

		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		  var type = typeof children;

		  if (type === 'undefined' || type === 'boolean') {
		    // All of the above are perceived as null.
		    children = null;
		  }

		  var invokeCallback = false;

		  if (children === null) {
		    invokeCallback = true;
		  } else {
		    switch (type) {
		      case 'string':
		      case 'number':
		        invokeCallback = true;
		        break;

		      case 'object':
		        switch (children.$$typeof) {
		          case REACT_ELEMENT_TYPE:
		          case REACT_PORTAL_TYPE:
		            invokeCallback = true;
		        }

		    }
		  }

		  if (invokeCallback) {
		    var _child = children;
		    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
		    // so that it's consistent if the number of children grows:

		    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

		    if (isArray(mappedChild)) {
		      var escapedChildKey = '';

		      if (childKey != null) {
		        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
		      }

		      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
		        return c;
		      });
		    } else if (mappedChild != null) {
		      if (isValidElement(mappedChild)) {
		        {
		          // The `if` statement here prevents auto-disabling of the safe
		          // coercion ESLint rule, so we must manually disable it below.
		          // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
		          if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
		            checkKeyStringCoercion(mappedChild.key);
		          }
		        }

		        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
		        // traverseAllChildren used to do for objects as children
		        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
		        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
		        // eslint-disable-next-line react-internal/safe-string-coercion
		        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
		      }

		      array.push(mappedChild);
		    }

		    return 1;
		  }

		  var child;
		  var nextName;
		  var subtreeCount = 0; // Count of children found in the current subtree.

		  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

		  if (isArray(children)) {
		    for (var i = 0; i < children.length; i++) {
		      child = children[i];
		      nextName = nextNamePrefix + getElementKey(child, i);
		      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		    }
		  } else {
		    var iteratorFn = getIteratorFn(children);

		    if (typeof iteratorFn === 'function') {
		      var iterableChildren = children;

		      {
		        // Warn about using Maps as children
		        if (iteratorFn === iterableChildren.entries) {
		          if (!didWarnAboutMaps) {
		            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
		          }

		          didWarnAboutMaps = true;
		        }
		      }

		      var iterator = iteratorFn.call(iterableChildren);
		      var step;
		      var ii = 0;

		      while (!(step = iterator.next()).done) {
		        child = step.value;
		        nextName = nextNamePrefix + getElementKey(child, ii++);
		        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		      }
		    } else if (type === 'object') {
		      // eslint-disable-next-line react-internal/safe-string-coercion
		      var childrenString = String(children);
		      throw new Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
		    }
		  }

		  return subtreeCount;
		}

		/**
		 * Maps children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
		 *
		 * The provided mapFunction(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} func The map function.
		 * @param {*} context Context for mapFunction.
		 * @return {object} Object containing the ordered map of results.
		 */
		function mapChildren(children, func, context) {
		  if (children == null) {
		    return children;
		  }

		  var result = [];
		  var count = 0;
		  mapIntoArray(children, result, '', '', function (child) {
		    return func.call(context, child, count++);
		  });
		  return result;
		}
		/**
		 * Count the number of children that are typically specified as
		 * `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrencount
		 *
		 * @param {?*} children Children tree container.
		 * @return {number} The number of children.
		 */


		function countChildren(children) {
		  var n = 0;
		  mapChildren(children, function () {
		    n++; // Don't return anything
		  });
		  return n;
		}

		/**
		 * Iterates through children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		 *
		 * The provided forEachFunc(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} forEachFunc
		 * @param {*} forEachContext Context for forEachContext.
		 */
		function forEachChildren(children, forEachFunc, forEachContext) {
		  mapChildren(children, function () {
		    forEachFunc.apply(this, arguments); // Don't return anything.
		  }, forEachContext);
		}
		/**
		 * Flatten a children object (typically specified as `props.children`) and
		 * return an array with appropriately re-keyed children.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		 */


		function toArray(children) {
		  return mapChildren(children, function (child) {
		    return child;
		  }) || [];
		}
		/**
		 * Returns the first child in a collection of children and verifies that there
		 * is only one child in the collection.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
		 *
		 * The current implementation of this function assumes that a single child gets
		 * passed without a wrapper, but the purpose of this helper function is to
		 * abstract away the particular structure of children.
		 *
		 * @param {?object} children Child collection structure.
		 * @return {ReactElement} The first and only `ReactElement` contained in the
		 * structure.
		 */


		function onlyChild(children) {
		  if (!isValidElement(children)) {
		    throw new Error('React.Children.only expected to receive a single React element child.');
		  }

		  return children;
		}

		function createContext(defaultValue) {
		  // TODO: Second argument used to be an optional `calculateChangedBits`
		  // function. Warn to reserve for future use?
		  var context = {
		    $$typeof: REACT_CONTEXT_TYPE,
		    // As a workaround to support multiple concurrent renderers, we categorize
		    // some renderers as primary and others as secondary. We only expect
		    // there to be two concurrent renderers at most: React Native (primary) and
		    // Fabric (secondary); React DOM (primary) and React ART (secondary).
		    // Secondary renderers store their context values on separate fields.
		    _currentValue: defaultValue,
		    _currentValue2: defaultValue,
		    // Used to track how many concurrent renderers this context currently
		    // supports within in a single renderer. Such as parallel server rendering.
		    _threadCount: 0,
		    // These are circular
		    Provider: null,
		    Consumer: null,
		    // Add these to use same hidden class in VM as ServerContext
		    _defaultValue: null,
		    _globalName: null
		  };
		  context.Provider = {
		    $$typeof: REACT_PROVIDER_TYPE,
		    _context: context
		  };
		  var hasWarnedAboutUsingNestedContextConsumers = false;
		  var hasWarnedAboutUsingConsumerProvider = false;
		  var hasWarnedAboutDisplayNameOnConsumer = false;

		  {
		    // A separate object, but proxies back to the original context object for
		    // backwards compatibility. It has a different $$typeof, so we can properly
		    // warn for the incorrect usage of Context as a Consumer.
		    var Consumer = {
		      $$typeof: REACT_CONTEXT_TYPE,
		      _context: context
		    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

		    Object.defineProperties(Consumer, {
		      Provider: {
		        get: function () {
		          if (!hasWarnedAboutUsingConsumerProvider) {
		            hasWarnedAboutUsingConsumerProvider = true;

		            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
		          }

		          return context.Provider;
		        },
		        set: function (_Provider) {
		          context.Provider = _Provider;
		        }
		      },
		      _currentValue: {
		        get: function () {
		          return context._currentValue;
		        },
		        set: function (_currentValue) {
		          context._currentValue = _currentValue;
		        }
		      },
		      _currentValue2: {
		        get: function () {
		          return context._currentValue2;
		        },
		        set: function (_currentValue2) {
		          context._currentValue2 = _currentValue2;
		        }
		      },
		      _threadCount: {
		        get: function () {
		          return context._threadCount;
		        },
		        set: function (_threadCount) {
		          context._threadCount = _threadCount;
		        }
		      },
		      Consumer: {
		        get: function () {
		          if (!hasWarnedAboutUsingNestedContextConsumers) {
		            hasWarnedAboutUsingNestedContextConsumers = true;

		            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
		          }

		          return context.Consumer;
		        }
		      },
		      displayName: {
		        get: function () {
		          return context.displayName;
		        },
		        set: function (displayName) {
		          if (!hasWarnedAboutDisplayNameOnConsumer) {
		            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

		            hasWarnedAboutDisplayNameOnConsumer = true;
		          }
		        }
		      }
		    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

		    context.Consumer = Consumer;
		  }

		  {
		    context._currentRenderer = null;
		    context._currentRenderer2 = null;
		  }

		  return context;
		}

		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;

		function lazyInitializer(payload) {
		  if (payload._status === Uninitialized) {
		    var ctor = payload._result;
		    var thenable = ctor(); // Transition to the next state.
		    // This might throw either because it's missing or throws. If so, we treat it
		    // as still uninitialized and try again next time. Which is the same as what
		    // happens if the ctor or any wrappers processing the ctor throws. This might
		    // end up fixing it if the resolution was a concurrency bug.

		    thenable.then(function (moduleObject) {
		      if (payload._status === Pending || payload._status === Uninitialized) {
		        // Transition to the next state.
		        var resolved = payload;
		        resolved._status = Resolved;
		        resolved._result = moduleObject;
		      }
		    }, function (error) {
		      if (payload._status === Pending || payload._status === Uninitialized) {
		        // Transition to the next state.
		        var rejected = payload;
		        rejected._status = Rejected;
		        rejected._result = error;
		      }
		    });

		    if (payload._status === Uninitialized) {
		      // In case, we're still uninitialized, then we're waiting for the thenable
		      // to resolve. Set it as pending in the meantime.
		      var pending = payload;
		      pending._status = Pending;
		      pending._result = thenable;
		    }
		  }

		  if (payload._status === Resolved) {
		    var moduleObject = payload._result;

		    {
		      if (moduleObject === undefined) {
		        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
		        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))\n\n" + 'Did you accidentally put curly braces around the import?', moduleObject);
		      }
		    }

		    {
		      if (!('default' in moduleObject)) {
		        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
		        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
		      }
		    }

		    return moduleObject.default;
		  } else {
		    throw payload._result;
		  }
		}

		function lazy(ctor) {
		  var payload = {
		    // We use these fields to store the result.
		    _status: Uninitialized,
		    _result: ctor
		  };
		  var lazyType = {
		    $$typeof: REACT_LAZY_TYPE,
		    _payload: payload,
		    _init: lazyInitializer
		  };

		  {
		    // In production, this would just set it on the object.
		    var defaultProps;
		    var propTypes; // $FlowFixMe

		    Object.defineProperties(lazyType, {
		      defaultProps: {
		        configurable: true,
		        get: function () {
		          return defaultProps;
		        },
		        set: function (newDefaultProps) {
		          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          defaultProps = newDefaultProps; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'defaultProps', {
		            enumerable: true
		          });
		        }
		      },
		      propTypes: {
		        configurable: true,
		        get: function () {
		          return propTypes;
		        },
		        set: function (newPropTypes) {
		          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          propTypes = newPropTypes; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'propTypes', {
		            enumerable: true
		          });
		        }
		      }
		    });
		  }

		  return lazyType;
		}

		function forwardRef(render) {
		  {
		    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
		      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
		    } else if (typeof render !== 'function') {
		      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
		    } else {
		      if (render.length !== 0 && render.length !== 2) {
		        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
		      }
		    }

		    if (render != null) {
		      if (render.defaultProps != null || render.propTypes != null) {
		        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
		      }
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_FORWARD_REF_TYPE,
		    render: render
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name; // The inner component shouldn't inherit this display name in most cases,
		        // because the component may be used elsewhere.
		        // But it's nice for anonymous functions to inherit the name,
		        // so that our component-stack generation logic will display their frames.
		        // An anonymous function generally suggests a pattern like:
		        //   React.forwardRef((props, ref) => {...});
		        // This kind of inner function is not used elsewhere so the side effect is okay.

		        if (!render.name && !render.displayName) {
		          render.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		var REACT_MODULE_REFERENCE;

		{
		  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
		}

		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


		  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
		    return true;
		  }

		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
		    // types supported by any Flight configuration anywhere since
		    // we don't know which Flight build this will end up being used
		    // with.
		    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
		      return true;
		    }
		  }

		  return false;
		}

		function memo(type, compare) {
		  {
		    if (!isValidElementType(type)) {
		      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_MEMO_TYPE,
		    type: type,
		    compare: compare === undefined ? null : compare
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name; // The inner component shouldn't inherit this display name in most cases,
		        // because the component may be used elsewhere.
		        // But it's nice for anonymous functions to inherit the name,
		        // so that our component-stack generation logic will display their frames.
		        // An anonymous function generally suggests a pattern like:
		        //   React.memo((props) => {...});
		        // This kind of inner function is not used elsewhere so the side effect is okay.

		        if (!type.name && !type.displayName) {
		          type.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		function resolveDispatcher() {
		  var dispatcher = ReactCurrentDispatcher.current;

		  {
		    if (dispatcher === null) {
		      error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
		    }
		  } // Will result in a null access error if accessed outside render phase. We
		  // intentionally don't throw our own error because this is in a hot path.
		  // Also helps ensure this is inlined.


		  return dispatcher;
		}
		function useContext(Context) {
		  var dispatcher = resolveDispatcher();

		  {
		    // TODO: add a more generic warning for invalid values.
		    if (Context._context !== undefined) {
		      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
		      // and nobody should be using this in existing code.

		      if (realContext.Consumer === Context) {
		        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
		      } else if (realContext.Provider === Context) {
		        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
		      }
		    }
		  }

		  return dispatcher.useContext(Context);
		}
		function useState(initialState) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useRef(initialValue);
		}
		function useEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useEffect(create, deps);
		}
		function useInsertionEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useInsertionEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useCallback(callback, deps);
		}
		function useMemo(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
		  {
		    var dispatcher = resolveDispatcher();
		    return dispatcher.useDebugValue(value, formatterFn);
		  }
		}
		function useTransition() {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useTransition();
		}
		function useDeferredValue(value) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useDeferredValue(value);
		}
		function useId() {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useId();
		}
		function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		}

		// Helpers to patch console.logs to avoid logging during side-effect free
		// replaying on render function. This currently only patches the object
		// lazily which won't cover if the log function was extracted eagerly.
		// We could also eagerly patch the method.
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;

		function disabledLog() {}

		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;

		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        log: assign({}, props, {
		          value: prevLog
		        }),
		        info: assign({}, props, {
		          value: prevInfo
		        }),
		        warn: assign({}, props, {
		          value: prevWarn
		        }),
		        error: assign({}, props, {
		          value: prevError
		        }),
		        group: assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}

		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      // Extract the VM specific prefix used by each line.
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    } // We use the prefix to ensure our stacks line up with native stack frames.


		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;

		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}

		function describeNativeComponentFrame(fn, construct) {
		  // If something asked for a stack inside a fake render, it should get ignored.
		  if ( !fn || reentry) {
		    return '';
		  }

		  {
		    var frame = componentFrameCache.get(fn);

		    if (frame !== undefined) {
		      return frame;
		    }
		  }

		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;

		  {
		    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
		    // for warnings.

		    ReactCurrentDispatcher$1.current = null;
		    disableLogs();
		  }

		  try {
		    // This should throw.
		    if (construct) {
		      // Something should be setting the props in the constructor.
		      var Fake = function () {
		        throw Error();
		      }; // $FlowFixMe


		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          // We use a throwing setter instead of frozen or non-writable props
		          // because that won't throw in a non-strict mode function.
		          throw Error();
		        }
		      });

		      if (typeof Reflect === 'object' && Reflect.construct) {
		        // We construct a different control for this case to include any extra
		        // frames added by the construct call.
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }

		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }

		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }

		      fn();
		    }
		  } catch (sample) {
		    // This is inlined manually because closure doesn't do it for us.
		    if (sample && control && typeof sample.stack === 'string') {
		      // This extracts the first frame from the sample that isn't also in the control.
		      // Skipping one frame that we assume is the frame that calls the two.
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;

		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        // We expect at least one stack frame to be shared.
		        // Typically this will be the root most one. However, stack frames may be
		        // cut off due to maximum stack limits. In this case, one maybe cut off
		        // earlier than the other. We assume that the sample is longer or the same
		        // and there for cut off earlier. So we should find the root most frame in
		        // the sample somewhere in the control.
		        c--;
		      }

		      for (; s >= 1 && c >= 0; s--, c--) {
		        // Next we find the first one that isn't the same which should be the
		        // frame that called our sample function and the control.
		        if (sampleLines[s] !== controlLines[c]) {
		          // In V8, the first line is describing the message but other VMs don't.
		          // If we're about to return the first line, and the control is also on the same
		          // line, that's a pretty good indicator that our sample threw at same line as
		          // the control. I.e. before we entered the sample frame. So we ignore this result.
		          // This can happen if you passed a class to function component, or non-function.
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--; // We may still have similar intermediate frames from the construct call.
		              // The next one that isn't the same should be our match though.

		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
		                // but we have a user-provided "displayName"
		                // splice it in to make the stack more readable.


		                if (fn.displayName && _frame.includes('<anonymous>')) {
		                  _frame = _frame.replace('<anonymous>', fn.displayName);
		                }

		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                } // Return the line we found.


		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }

		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;

		    {
		      ReactCurrentDispatcher$1.current = previousDispatcher;
		      reenableLogs();
		    }

		    Error.prepareStackTrace = previousPrepareStackTrace;
		  } // Fallback to just using the name if we couldn't make it throw.


		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }

		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}

		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}

		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

		  if (type == null) {
		    return '';
		  }

		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }

		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }

		  switch (type) {
		    case REACT_SUSPENSE_TYPE:
		      return describeBuiltInComponentFrame('Suspense');

		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);

		      case REACT_MEMO_TYPE:
		        // Memo may contain any component type so we recursively resolve it.
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            // Lazy may contain any component type so we recursively resolve it.
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }

		  return '';
		}

		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}

		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    // $FlowFixMe This is okay but Flow doesn't know it.
		    var has = Function.call.bind(hasOwnProperty);

		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.

		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            // eslint-disable-next-line react-internal/prod-error-codes
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }

		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }

		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);

		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

		          setCurrentlyValidatingElement(null);
		        }

		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);

		          error('Failed %s type: %s', location, error$1.message);

		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}

		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      setExtraStackFrame(stack);
		    } else {
		      setExtraStackFrame(null);
		    }
		  }
		}

		var propTypesMisspellWarningShown;

		{
		  propTypesMisspellWarningShown = false;
		}

		function getDeclarationErrorAddendum() {
		  if (ReactCurrentOwner.current) {
		    var name = getComponentNameFromType(ReactCurrentOwner.current.type);

		    if (name) {
		      return '\n\nCheck the render method of `' + name + '`.';
		    }
		  }

		  return '';
		}

		function getSourceInfoErrorAddendum(source) {
		  if (source !== undefined) {
		    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		    var lineNumber = source.lineNumber;
		    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		  }

		  return '';
		}

		function getSourceInfoErrorAddendumForProps(elementProps) {
		  if (elementProps !== null && elementProps !== undefined) {
		    return getSourceInfoErrorAddendum(elementProps.__source);
		  }

		  return '';
		}
		/**
		 * Warn if there's no key explicitly set on dynamic arrays of children or
		 * object keys are not valid. This allows us to keep track of children between
		 * updates.
		 */


		var ownerHasKeyUseWarning = {};

		function getCurrentComponentErrorInfo(parentType) {
		  var info = getDeclarationErrorAddendum();

		  if (!info) {
		    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

		    if (parentName) {
		      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		    }
		  }

		  return info;
		}
		/**
		 * Warn if the element doesn't have an explicit key assigned to it.
		 * This element is in an array. The array could grow and shrink or be
		 * reordered. All children that haven't already been validated are required to
		 * have a "key" property assigned to it. Error statuses are cached so a warning
		 * will only be shown once.
		 *
		 * @internal
		 * @param {ReactElement} element Element that requires a key.
		 * @param {*} parentType element's parent's type.
		 */


		function validateExplicitKey(element, parentType) {
		  if (!element._store || element._store.validated || element.key != null) {
		    return;
		  }

		  element._store.validated = true;
		  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

		  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		    return;
		  }

		  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
		  // property, it may be the creator of the child that's responsible for
		  // assigning it a key.

		  var childOwner = '';

		  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
		    // Give the component that originally created this child.
		    childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
		  }

		  {
		    setCurrentlyValidatingElement$1(element);

		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

		    setCurrentlyValidatingElement$1(null);
		  }
		}
		/**
		 * Ensure that every element either is passed in a static location, in an
		 * array with an explicit keys property defined, or in an object literal
		 * with valid key property.
		 *
		 * @internal
		 * @param {ReactNode} node Statically passed child of any type.
		 * @param {*} parentType node's parent's type.
		 */


		function validateChildKeys(node, parentType) {
		  if (typeof node !== 'object') {
		    return;
		  }

		  if (isArray(node)) {
		    for (var i = 0; i < node.length; i++) {
		      var child = node[i];

		      if (isValidElement(child)) {
		        validateExplicitKey(child, parentType);
		      }
		    }
		  } else if (isValidElement(node)) {
		    // This element was passed in a valid location.
		    if (node._store) {
		      node._store.validated = true;
		    }
		  } else if (node) {
		    var iteratorFn = getIteratorFn(node);

		    if (typeof iteratorFn === 'function') {
		      // Entry iterators used to provide implicit keys,
		      // but now we print a separate warning for them later.
		      if (iteratorFn !== node.entries) {
		        var iterator = iteratorFn.call(node);
		        var step;

		        while (!(step = iterator.next()).done) {
		          if (isValidElement(step.value)) {
		            validateExplicitKey(step.value, parentType);
		          }
		        }
		      }
		    }
		  }
		}
		/**
		 * Given an element, validate that its props follow the propTypes definition,
		 * provided by the type.
		 *
		 * @param {ReactElement} element
		 */


		function validatePropTypes(element) {
		  {
		    var type = element.type;

		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }

		    var propTypes;

		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
		    // Inner props are checked in the reconciler.
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }

		    if (propTypes) {
		      // Intentionally inside to avoid triggering lazy initializers:
		      var name = getComponentNameFromType(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

		      var _name = getComponentNameFromType(type);

		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }

		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		/**
		 * Given a fragment, validate that it can only be provided with fragment props
		 * @param {ReactElement} fragment
		 */


		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);

		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];

		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);

		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }

		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);

		      error('Invalid attribute `ref` supplied to `React.Fragment`.');

		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}
		function createElementWithValidation(type, props, children) {
		  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
		  // succeed and there will likely be errors in render.

		  if (!validType) {
		    var info = '';

		    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		    }

		    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

		    if (sourceInfo) {
		      info += sourceInfo;
		    } else {
		      info += getDeclarationErrorAddendum();
		    }

		    var typeString;

		    if (type === null) {
		      typeString = 'null';
		    } else if (isArray(type)) {
		      typeString = 'array';
		    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		      typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
		      info = ' Did you accidentally export a JSX literal instead of a component?';
		    } else {
		      typeString = typeof type;
		    }

		    {
		      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }
		  }

		  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
		  // TODO: Drop this when these are no longer allowed as the type argument.

		  if (element == null) {
		    return element;
		  } // Skip key warning if the type isn't valid since our key validation logic
		  // doesn't expect a non-string/function type and can throw confusing errors.
		  // We don't want exception behavior to differ between dev and prod.
		  // (Rendering will throw with a helpful message and as soon as the type is
		  // fixed, the key warnings will appear.)


		  if (validType) {
		    for (var i = 2; i < arguments.length; i++) {
		      validateChildKeys(arguments[i], type);
		    }
		  }

		  if (type === REACT_FRAGMENT_TYPE) {
		    validateFragmentProps(element);
		  } else {
		    validatePropTypes(element);
		  }

		  return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
		  var validatedFactory = createElementWithValidation.bind(null, type);
		  validatedFactory.type = type;

		  {
		    if (!didWarnAboutDeprecatedCreateFactory) {
		      didWarnAboutDeprecatedCreateFactory = true;

		      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
		    } // Legacy hook: remove it


		    Object.defineProperty(validatedFactory, 'type', {
		      enumerable: false,
		      get: function () {
		        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

		        Object.defineProperty(this, 'type', {
		          value: type
		        });
		        return type;
		      }
		    });
		  }

		  return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
		  var newElement = cloneElement.apply(this, arguments);

		  for (var i = 2; i < arguments.length; i++) {
		    validateChildKeys(arguments[i], newElement.type);
		  }

		  validatePropTypes(newElement);
		  return newElement;
		}

		function startTransition(scope, options) {
		  var prevTransition = ReactCurrentBatchConfig.transition;
		  ReactCurrentBatchConfig.transition = {};
		  var currentTransition = ReactCurrentBatchConfig.transition;

		  {
		    ReactCurrentBatchConfig.transition._updatedFibers = new Set();
		  }

		  try {
		    scope();
		  } finally {
		    ReactCurrentBatchConfig.transition = prevTransition;

		    {
		      if (prevTransition === null && currentTransition._updatedFibers) {
		        var updatedFibersCount = currentTransition._updatedFibers.size;

		        if (updatedFibersCount > 10) {
		          warn('Detected a large number of updates inside startTransition. ' + 'If this is due to a subscription please re-write it to use React provided hooks. ' + 'Otherwise concurrent mode guarantees are off the table.');
		        }

		        currentTransition._updatedFibers.clear();
		      }
		    }
		  }
		}

		var didWarnAboutMessageChannel = false;
		var enqueueTaskImpl = null;
		function enqueueTask(task) {
		  if (enqueueTaskImpl === null) {
		    try {
		      // read require off the module object to get around the bundlers.
		      // we don't want them to detect a require and bundle a Node polyfill.
		      var requireString = ('require' + Math.random()).slice(0, 7);
		      var nodeRequire = module && module[requireString]; // assuming we're in node, let's try to get node's
		      // version of setImmediate, bypassing fake timers if any.

		      enqueueTaskImpl = nodeRequire.call(module, 'timers').setImmediate;
		    } catch (_err) {
		      // we're in a browser
		      // we can't use regular timers because they may still be faked
		      // so we try MessageChannel+postMessage instead
		      enqueueTaskImpl = function (callback) {
		        {
		          if (didWarnAboutMessageChannel === false) {
		            didWarnAboutMessageChannel = true;

		            if (typeof MessageChannel === 'undefined') {
		              error('This browser does not have a MessageChannel implementation, ' + 'so enqueuing tasks via await act(async () => ...) will fail. ' + 'Please file an issue at https://github.com/facebook/react/issues ' + 'if you encounter this warning.');
		            }
		          }
		        }

		        var channel = new MessageChannel();
		        channel.port1.onmessage = callback;
		        channel.port2.postMessage(undefined);
		      };
		    }
		  }

		  return enqueueTaskImpl(task);
		}

		var actScopeDepth = 0;
		var didWarnNoAwaitAct = false;
		function act(callback) {
		  {
		    // `act` calls can be nested, so we track the depth. This represents the
		    // number of `act` scopes on the stack.
		    var prevActScopeDepth = actScopeDepth;
		    actScopeDepth++;

		    if (ReactCurrentActQueue.current === null) {
		      // This is the outermost `act` scope. Initialize the queue. The reconciler
		      // will detect the queue and use it instead of Scheduler.
		      ReactCurrentActQueue.current = [];
		    }

		    var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
		    var result;

		    try {
		      // Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
		      // set to `true` while the given callback is executed, not for updates
		      // triggered during an async event, because this is how the legacy
		      // implementation of `act` behaved.
		      ReactCurrentActQueue.isBatchingLegacy = true;
		      result = callback(); // Replicate behavior of original `act` implementation in legacy mode,
		      // which flushed updates immediately after the scope function exits, even
		      // if it's an async function.

		      if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
		        var queue = ReactCurrentActQueue.current;

		        if (queue !== null) {
		          ReactCurrentActQueue.didScheduleLegacyUpdate = false;
		          flushActQueue(queue);
		        }
		      }
		    } catch (error) {
		      popActScope(prevActScopeDepth);
		      throw error;
		    } finally {
		      ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
		    }

		    if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
		      var thenableResult = result; // The callback is an async function (i.e. returned a promise). Wait
		      // for it to resolve before exiting the current scope.

		      var wasAwaited = false;
		      var thenable = {
		        then: function (resolve, reject) {
		          wasAwaited = true;
		          thenableResult.then(function (returnValue) {
		            popActScope(prevActScopeDepth);

		            if (actScopeDepth === 0) {
		              // We've exited the outermost act scope. Recursively flush the
		              // queue until there's no remaining work.
		              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
		            } else {
		              resolve(returnValue);
		            }
		          }, function (error) {
		            // The callback threw an error.
		            popActScope(prevActScopeDepth);
		            reject(error);
		          });
		        }
		      };

		      {
		        if (!didWarnNoAwaitAct && typeof Promise !== 'undefined') {
		          // eslint-disable-next-line no-undef
		          Promise.resolve().then(function () {}).then(function () {
		            if (!wasAwaited) {
		              didWarnNoAwaitAct = true;

		              error('You called act(async () => ...) without await. ' + 'This could lead to unexpected testing behaviour, ' + 'interleaving multiple act calls and mixing their ' + 'scopes. ' + 'You should - await act(async () => ...);');
		            }
		          });
		        }
		      }

		      return thenable;
		    } else {
		      var returnValue = result; // The callback is not an async function. Exit the current scope
		      // immediately, without awaiting.

		      popActScope(prevActScopeDepth);

		      if (actScopeDepth === 0) {
		        // Exiting the outermost act scope. Flush the queue.
		        var _queue = ReactCurrentActQueue.current;

		        if (_queue !== null) {
		          flushActQueue(_queue);
		          ReactCurrentActQueue.current = null;
		        } // Return a thenable. If the user awaits it, we'll flush again in
		        // case additional work was scheduled by a microtask.


		        var _thenable = {
		          then: function (resolve, reject) {
		            // Confirm we haven't re-entered another `act` scope, in case
		            // the user does something weird like await the thenable
		            // multiple times.
		            if (ReactCurrentActQueue.current === null) {
		              // Recursively flush the queue until there's no remaining work.
		              ReactCurrentActQueue.current = [];
		              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
		            } else {
		              resolve(returnValue);
		            }
		          }
		        };
		        return _thenable;
		      } else {
		        // Since we're inside a nested `act` scope, the returned thenable
		        // immediately resolves. The outer scope will flush the queue.
		        var _thenable2 = {
		          then: function (resolve, reject) {
		            resolve(returnValue);
		          }
		        };
		        return _thenable2;
		      }
		    }
		  }
		}

		function popActScope(prevActScopeDepth) {
		  {
		    if (prevActScopeDepth !== actScopeDepth - 1) {
		      error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
		    }

		    actScopeDepth = prevActScopeDepth;
		  }
		}

		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
		  {
		    var queue = ReactCurrentActQueue.current;

		    if (queue !== null) {
		      try {
		        flushActQueue(queue);
		        enqueueTask(function () {
		          if (queue.length === 0) {
		            // No additional work was scheduled. Finish.
		            ReactCurrentActQueue.current = null;
		            resolve(returnValue);
		          } else {
		            // Keep flushing work until there's none left.
		            recursivelyFlushAsyncActWork(returnValue, resolve, reject);
		          }
		        });
		      } catch (error) {
		        reject(error);
		      }
		    } else {
		      resolve(returnValue);
		    }
		  }
		}

		var isFlushing = false;

		function flushActQueue(queue) {
		  {
		    if (!isFlushing) {
		      // Prevent re-entrance.
		      isFlushing = true;
		      var i = 0;

		      try {
		        for (; i < queue.length; i++) {
		          var callback = queue[i];

		          do {
		            callback = callback(true);
		          } while (callback !== null);
		        }

		        queue.length = 0;
		      } catch (error) {
		        // If something throws, leave the remaining callbacks on the queue.
		        queue = queue.slice(i + 1);
		        throw error;
		      } finally {
		        isFlushing = false;
		      }
		    }
		  }
		}

		var createElement$1 =  createElementWithValidation ;
		var cloneElement$1 =  cloneElementWithValidation ;
		var createFactory =  createFactoryWithValidation ;
		var Children = {
		  map: mapChildren,
		  forEach: forEachChildren,
		  count: countChildren,
		  toArray: toArray,
		  only: onlyChild
		};

		exports.Children = Children;
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.startTransition = startTransition;
		exports.unstable_act = act;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useDeferredValue = useDeferredValue;
		exports.useEffect = useEffect;
		exports.useId = useId;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useInsertionEffect = useInsertionEffect;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.useSyncExternalStore = useSyncExternalStore;
		exports.useTransition = useTransition;
		exports.version = ReactVersion;
		          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
		if (
		  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
		  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
		    'function'
		) {
		  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
		}
		        
		  })();
		} 
	} (react_development, react_development.exports));
	return react_development.exports;
}

if (process.env.NODE_ENV === 'production') {
  react.exports = requireReact_production_min();
} else {
  react.exports = requireReact_development();
}

var reactExports = react.exports;

var router = {};

var _async_to_generator$2 = {};

Object.defineProperty(_async_to_generator$2, "__esModule", {
    value: true
});
_async_to_generator$2.default = _asyncToGenerator;
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

var _extends$5 = {};

Object.defineProperty(_extends$5, "__esModule", {
    value: true
});
_extends$5.default = _extends$4;
function _extends$4() {
    return extends_.apply(this, arguments);
}
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}

var _interop_require_wildcard$2 = {};

Object.defineProperty(_interop_require_wildcard$2, "__esModule", {
    value: true
});
_interop_require_wildcard$2.default = _interopRequireWildcard;
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _getRequireWildcardCache(nodeInterop1) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop1);
}

var normalizeTrailingSlash = {exports: {}};

var removeTrailingSlash$1 = {};

Object.defineProperty(removeTrailingSlash$1, "__esModule", {
    value: true
});
removeTrailingSlash$1.removeTrailingSlash = removeTrailingSlash;
function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
}

var parsePath$1 = {};

Object.defineProperty(parsePath$1, "__esModule", {
    value: true
});
parsePath$1.parsePath = parsePath;
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
}

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalizePathTrailingSlash = void 0;
	var _removeTrailingSlash = removeTrailingSlash$1;
	var _parsePath = parsePath$1;
	const normalizePathTrailingSlash = (path)=>{
	    if (!path.startsWith('/') || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
	        return path;
	    }
	    const { pathname , query , hash  } = (_parsePath).parsePath(path);
	    if (process.env.__NEXT_TRAILING_SLASH) {
	        if (/\.[^/]+\/?$/.test(pathname)) {
	            return `${(_removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
	        } else if (pathname.endsWith('/')) {
	            return `${pathname}${query}${hash}`;
	        } else {
	            return `${pathname}/${query}${hash}`;
	        }
	    }
	    return `${(_removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
	};
	exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (normalizeTrailingSlash, normalizeTrailingSlash.exports));

var normalizeTrailingSlashExports = normalizeTrailingSlash.exports;

var routeLoader = {exports: {}};

var getAssetPathFromRoute$1 = {};

Object.defineProperty(getAssetPathFromRoute$1, "__esModule", {
    value: true
});
getAssetPathFromRoute$1.default = getAssetPathFromRoute;
function getAssetPathFromRoute(route, ext = '') {
    const path = route === '/' ? '/index' : /^\/index(\/|$)/.test(route) ? `/index${route}` : `${route}`;
    return path + ext;
}

var trustedTypes = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.__unsafeCreateTrustedScriptURL = __unsafeCreateTrustedScriptURL;
	/**
	 * Stores the Trusted Types Policy. Starts as undefined and can be set to null
	 * if Trusted Types is not supported in the browser.
	 */ let policy;
	/**
	 * Getter for the Trusted Types Policy. If it is undefined, it is instantiated
	 * here or set to null if Trusted Types is not supported in the browser.
	 */ function getPolicy() {
	    if (typeof policy === 'undefined' && typeof window !== 'undefined') {
	        var ref;
	        policy = ((ref = window.trustedTypes) == null ? void 0 : ref.createPolicy('nextjs', {
	            createHTML: (input)=>input,
	            createScript: (input)=>input,
	            createScriptURL: (input)=>input
	        })) || null;
	    }
	    return policy;
	}
	function __unsafeCreateTrustedScriptURL(url) {
	    var ref;
	    return ((ref = getPolicy()) == null ? void 0 : ref.createScriptURL(url)) || url;
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (trustedTypes, trustedTypes.exports));

var trustedTypesExports = trustedTypes.exports;

var requestIdleCallback = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
	const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
	    let start = Date.now();
	    return setTimeout(function() {
	        cb({
	            didTimeout: false,
	            timeRemaining: function() {
	                return Math.max(0, 50 - (Date.now() - start));
	            }
	        });
	    }, 1);
	};
	exports.requestIdleCallback = requestIdleCallback;
	const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
	    return clearTimeout(id);
	};
	exports.cancelIdleCallback = cancelIdleCallback;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (requestIdleCallback, requestIdleCallback.exports));

var requestIdleCallbackExports = requestIdleCallback.exports;

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.markAssetError = markAssetError;
	exports.isAssetError = isAssetError;
	exports.getClientBuildManifest = getClientBuildManifest;
	exports.createRouteLoader = createRouteLoader;
	var _interop_require_default = _interop_require_default$4.default;
	var _getAssetPathFromRoute = _interop_require_default(getAssetPathFromRoute$1);
	var _trustedTypes = trustedTypesExports;
	var _requestIdleCallback = requestIdleCallbackExports;
	// 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
	// considers as "Good" time-to-interactive. We must assume something went
	// wrong beyond this point, and then fall-back to a full page transition to
	// show the user something of value.
	const MS_MAX_IDLE_DELAY = 3800;
	function withFuture(key, map, generator) {
	    let entry = map.get(key);
	    if (entry) {
	        if ('future' in entry) {
	            return entry.future;
	        }
	        return Promise.resolve(entry);
	    }
	    let resolver;
	    const prom = new Promise((resolve)=>{
	        resolver = resolve;
	    });
	    map.set(key, entry = {
	        resolve: resolver,
	        future: prom
	    });
	    return generator ? generator()// eslint-disable-next-line no-sequences
	    .then((value)=>(resolver(value), value)).catch((err)=>{
	        map.delete(key);
	        throw err;
	    }) : prom;
	}
	function hasPrefetch(link) {
	    try {
	        link = document.createElement('link');
	        return(// detect IE11 since it supports prefetch but isn't detected
	        // with relList.support
	        (!!window.MSInputMethodContext && !!document.documentMode) || link.relList.supports('prefetch'));
	    } catch (e) {
	        return false;
	    }
	}
	const canPrefetch = hasPrefetch();
	function prefetchViaDom(href, as, link) {
	    return new Promise((res, rej)=>{
	        const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
	        if (document.querySelector(selector)) {
	            return res();
	        }
	        link = document.createElement('link');
	        // The order of property assignment here is intentional:
	        if (as) link.as = as;
	        link.rel = `prefetch`;
	        link.crossOrigin = process.env.__NEXT_CROSS_ORIGIN;
	        link.onload = res;
	        link.onerror = rej;
	        // `href` should always be last:
	        link.href = href;
	        document.head.appendChild(link);
	    });
	}
	const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR');
	function markAssetError(err) {
	    return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
	}
	function isAssetError(err) {
	    return err && ASSET_LOAD_ERROR in err;
	}
	function appendScript(src, script) {
	    return new Promise((resolve, reject)=>{
	        script = document.createElement('script');
	        // The order of property assignment here is intentional.
	        // 1. Setup success/failure hooks in case the browser synchronously
	        //    executes when `src` is set.
	        script.onload = resolve;
	        script.onerror = ()=>reject(markAssetError(new Error(`Failed to load script: ${src}`)));
	        // 2. Configure the cross-origin attribute before setting `src` in case the
	        //    browser begins to fetch.
	        script.crossOrigin = process.env.__NEXT_CROSS_ORIGIN;
	        // 3. Finally, set the source and inject into the DOM in case the child
	        //    must be appended for fetching to start.
	        script.src = src;
	        document.body.appendChild(script);
	    });
	}
	// We wait for pages to be built in dev before we start the route transition
	// timeout to prevent an un-necessary hard navigation in development.
	let devBuildPromise;
	// Resolve a promise that times out after given amount of milliseconds.
	function resolvePromiseWithTimeout(p, ms, err) {
	    return new Promise((resolve, reject)=>{
	        let cancelled = false;
	        p.then((r)=>{
	            // Resolved, cancel the timeout
	            cancelled = true;
	            resolve(r);
	        }).catch(reject);
	        // We wrap these checks separately for better dead-code elimination in
	        // production bundles.
	        if (process.env.NODE_ENV === 'development') {
	            (devBuildPromise || Promise.resolve()).then(()=>{
	                (_requestIdleCallback).requestIdleCallback(()=>setTimeout(()=>{
	                        if (!cancelled) {
	                            reject(err);
	                        }
	                    }, ms));
	            });
	        }
	        if (process.env.NODE_ENV !== 'development') {
	            (_requestIdleCallback).requestIdleCallback(()=>setTimeout(()=>{
	                    if (!cancelled) {
	                        reject(err);
	                    }
	                }, ms));
	        }
	    });
	}
	function getClientBuildManifest() {
	    if (self.__BUILD_MANIFEST) {
	        return Promise.resolve(self.__BUILD_MANIFEST);
	    }
	    const onBuildManifest = new Promise((resolve)=>{
	        // Mandatory because this is not concurrent safe:
	        const cb = self.__BUILD_MANIFEST_CB;
	        self.__BUILD_MANIFEST_CB = ()=>{
	            resolve(self.__BUILD_MANIFEST);
	            cb && cb();
	        };
	    });
	    return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
	}
	function getFilesForRoute(assetPrefix, route) {
	    if (process.env.NODE_ENV === 'development') {
	        const scriptUrl = assetPrefix + '/_next/static/chunks/pages' + encodeURI((_getAssetPathFromRoute).default(route, '.js'));
	        return Promise.resolve({
	            scripts: [
	                (_trustedTypes).__unsafeCreateTrustedScriptURL(scriptUrl)
	            ],
	            // Styles are handled by `style-loader` in development:
	            css: []
	        });
	    }
	    return getClientBuildManifest().then((manifest)=>{
	        if (!(route in manifest)) {
	            throw markAssetError(new Error(`Failed to lookup route: ${route}`));
	        }
	        const allFiles = manifest[route].map((entry)=>assetPrefix + '/_next/' + encodeURI(entry));
	        return {
	            scripts: allFiles.filter((v)=>v.endsWith('.js')).map((v)=>(_trustedTypes).__unsafeCreateTrustedScriptURL(v)),
	            css: allFiles.filter((v)=>v.endsWith('.css'))
	        };
	    });
	}
	function createRouteLoader(assetPrefix) {
	    const entrypoints = new Map();
	    const loadedScripts = new Map();
	    const styleSheets = new Map();
	    const routes = new Map();
	    function maybeExecuteScript(src) {
	        // With HMR we might need to "reload" scripts when they are
	        // disposed and readded. Executing scripts twice has no functional
	        // differences
	        if (process.env.NODE_ENV !== 'development') {
	            let prom = loadedScripts.get(src.toString());
	            if (prom) {
	                return prom;
	            }
	            // Skip executing script if it's already in the DOM:
	            if (document.querySelector(`script[src^="${src}"]`)) {
	                return Promise.resolve();
	            }
	            loadedScripts.set(src.toString(), prom = appendScript(src));
	            return prom;
	        } else {
	            return appendScript(src);
	        }
	    }
	    function fetchStyleSheet(href) {
	        let prom = styleSheets.get(href);
	        if (prom) {
	            return prom;
	        }
	        styleSheets.set(href, prom = fetch(href).then((res)=>{
	            if (!res.ok) {
	                throw new Error(`Failed to load stylesheet: ${href}`);
	            }
	            return res.text().then((text)=>({
	                    href: href,
	                    content: text
	                }));
	        }).catch((err)=>{
	            throw markAssetError(err);
	        }));
	        return prom;
	    }
	    return {
	        whenEntrypoint (route) {
	            return withFuture(route, entrypoints);
	        },
	        onEntrypoint (route, execute) {
	            (execute ? Promise.resolve().then(()=>execute()).then((exports)=>({
	                    component: exports && exports.default || exports,
	                    exports: exports
	                }), (err)=>({
	                    error: err
	                })) : Promise.resolve(undefined)).then((input)=>{
	                const old = entrypoints.get(route);
	                if (old && 'resolve' in old) {
	                    if (input) {
	                        entrypoints.set(route, input);
	                        old.resolve(input);
	                    }
	                } else {
	                    if (input) {
	                        entrypoints.set(route, input);
	                    } else {
	                        entrypoints.delete(route);
	                    }
	                    // when this entrypoint has been resolved before
	                    // the route is outdated and we want to invalidate
	                    // this cache entry
	                    routes.delete(route);
	                }
	            });
	        },
	        loadRoute (route, prefetch) {
	            return withFuture(route, routes, ()=>{
	                let devBuildPromiseResolve;
	                if (process.env.NODE_ENV === 'development') {
	                    devBuildPromise = new Promise((resolve)=>{
	                        devBuildPromiseResolve = resolve;
	                    });
	                }
	                return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({ scripts , css  })=>{
	                    return Promise.all([
	                        entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)),
	                        Promise.all(css.map(fetchStyleSheet)), 
	                    ]);
	                }).then((res)=>{
	                    return this.whenEntrypoint(route).then((entrypoint)=>({
	                            entrypoint,
	                            styles: res[1]
	                        }));
	                }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({ entrypoint , styles  })=>{
	                    const res = Object.assign({
	                        styles: styles
	                    }, entrypoint);
	                    return 'error' in entrypoint ? entrypoint : res;
	                }).catch((err)=>{
	                    if (prefetch) {
	                        // we don't want to cache errors during prefetch
	                        throw err;
	                    }
	                    return {
	                        error: err
	                    };
	                }).finally(()=>{
	                    return devBuildPromiseResolve == null ? void 0 : devBuildPromiseResolve();
	                });
	            });
	        },
	        prefetch (route) {
	            // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
	            // License: Apache 2.0
	            let cn;
	            if (cn = navigator.connection) {
	                // Don't prefetch if using 2G or if Save-Data is enabled.
	                if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
	            }
	            return getFilesForRoute(assetPrefix, route).then((output)=>Promise.all(canPrefetch ? output.scripts.map((script)=>prefetchViaDom(script.toString(), 'script')) : [])).then(()=>{
	                (_requestIdleCallback).requestIdleCallback(()=>this.loadRoute(route, true).catch(()=>{}));
	            }).catch(// swallow prefetch errors
	            ()=>{});
	        }
	    };
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (routeLoader, routeLoader.exports));

var routeLoaderExports = routeLoader.exports;

var script = {exports: {}};

var headManagerContext = {};

Object.defineProperty(headManagerContext, "__esModule", {
    value: true
});
headManagerContext.HeadManagerContext = void 0;
var _interop_require_default$3 = _interop_require_default$4.default;
var _react$2 = _interop_require_default$3(reactExports);
const HeadManagerContext = _react$2.default.createContext({});
headManagerContext.HeadManagerContext = HeadManagerContext;
if (process.env.NODE_ENV !== 'production') {
    HeadManagerContext.displayName = 'HeadManagerContext';
}

var headManager = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = initHeadManager;
	exports.isEqualNode = isEqualNode;
	exports.DOMAttributeNames = void 0;
	function initHeadManager() {
	    return {
	        mountedInstances: new Set(),
	        updateHead: (head)=>{
	            const tags = {};
	            head.forEach((h)=>{
	                if (// If the font tag is loaded only on client navigation
	                // it won't be inlined. In this case revert to the original behavior
	                h.type === 'link' && h.props['data-optimized-fonts']) {
	                    if (document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
	                        return;
	                    } else {
	                        h.props.href = h.props['data-href'];
	                        h.props['data-href'] = undefined;
	                    }
	                }
	                const components = tags[h.type] || [];
	                components.push(h);
	                tags[h.type] = components;
	            });
	            const titleComponent = tags.title ? tags.title[0] : null;
	            let title = '';
	            if (titleComponent) {
	                const { children  } = titleComponent.props;
	                title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
	            }
	            if (title !== document.title) document.title = title;
	            [
	                'meta',
	                'base',
	                'link',
	                'style',
	                'script'
	            ].forEach((type)=>{
	                updateElements(type, tags[type] || []);
	            });
	        }
	    };
	}
	const DOMAttributeNames = {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv',
	    noModule: 'noModule'
	};
	exports.DOMAttributeNames = DOMAttributeNames;
	function reactElementToDOM({ type , props  }) {
	    const el = document.createElement(type);
	    for(const p in props){
	        if (!props.hasOwnProperty(p)) continue;
	        if (p === 'children' || p === 'dangerouslySetInnerHTML') continue;
	        // we don't render undefined props to the DOM
	        if (props[p] === undefined) continue;
	        const attr = DOMAttributeNames[p] || p.toLowerCase();
	        if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
	            el[attr] = !!props[p];
	        } else {
	            el.setAttribute(attr, props[p]);
	        }
	    }
	    const { children , dangerouslySetInnerHTML  } = props;
	    if (dangerouslySetInnerHTML) {
	        el.innerHTML = dangerouslySetInnerHTML.__html || '';
	    } else if (children) {
	        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
	    }
	    return el;
	}
	function isEqualNode(oldTag, newTag) {
	    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
	        const nonce = newTag.getAttribute('nonce');
	        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
	        // be stripped if there is no content security policy response header that includes a nonce.
	        if (nonce && !oldTag.getAttribute('nonce')) {
	            const cloneTag = newTag.cloneNode(true);
	            cloneTag.setAttribute('nonce', '');
	            cloneTag.nonce = nonce;
	            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
	        }
	    }
	    return oldTag.isEqualNode(newTag);
	}
	function updateElements(type, components) {
	    const headEl = document.getElementsByTagName('head')[0];
	    const headCountEl = headEl.querySelector('meta[name=next-head-count]');
	    if (process.env.NODE_ENV !== 'production') {
	        if (!headCountEl) {
	            console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
	            return;
	        }
	    }
	    const headCount = Number(headCountEl.content);
	    const oldTags = [];
	    for(let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null){
	        var ref;
	        if ((j == null ? void 0 : (ref = j.tagName) == null ? void 0 : ref.toLowerCase()) === type) {
	            oldTags.push(j);
	        }
	    }
	    const newTags = components.map(reactElementToDOM).filter((newTag)=>{
	        for(let k = 0, len = oldTags.length; k < len; k++){
	            const oldTag = oldTags[k];
	            if (isEqualNode(oldTag, newTag)) {
	                oldTags.splice(k, 1);
	                return false;
	            }
	        }
	        return true;
	    });
	    oldTags.forEach((t)=>{
	        var ref;
	        return (ref = t.parentNode) == null ? void 0 : ref.removeChild(t);
	    });
	    newTags.forEach((t)=>headEl.insertBefore(t, headCountEl));
	    headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (headManager, headManager.exports));

var headManagerExports = headManager.exports;

(function (module, exports) {
	"client";
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.handleClientScriptLoad = handleClientScriptLoad;
	exports.initScriptLoader = initScriptLoader;
	exports.default = void 0;
	var _extends = _extends$5.default;
	var _interop_require_wildcard = _interop_require_wildcard$2.default;
	var _object_without_properties_loose$1 = _object_without_properties_loose.default;
	var _react = _interop_require_wildcard(reactExports);
	var _headManagerContext = headManagerContext;
	var _headManager = headManagerExports;
	var _requestIdleCallback = requestIdleCallbackExports;
	const ScriptCache = new Map();
	const LoadCache = new Set();
	const ignoreProps = [
	    'onLoad',
	    'onReady',
	    'dangerouslySetInnerHTML',
	    'children',
	    'onError',
	    'strategy', 
	];
	const loadScript = (props)=>{
	    const { src , id , onLoad =()=>{} , onReady =null , dangerouslySetInnerHTML , children ='' , strategy ='afterInteractive' , onError ,  } = props;
	    const cacheKey = id || src;
	    // Script has already loaded
	    if (cacheKey && LoadCache.has(cacheKey)) {
	        return;
	    }
	    // Contents of this script are already loading/loaded
	    if (ScriptCache.has(src)) {
	        LoadCache.add(cacheKey);
	        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
	        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
	        ScriptCache.get(src).then(onLoad, onError);
	        return;
	    }
	    /** Execute after the script first loaded */ const afterLoad = ()=>{
	        // Run onReady for the first time after load event
	        if (onReady) {
	            onReady();
	        }
	        // add cacheKey to LoadCache when load successfully
	        LoadCache.add(cacheKey);
	    };
	    const el = document.createElement('script');
	    const loadPromise = new Promise((resolve, reject)=>{
	        el.addEventListener('load', function(e) {
	            resolve();
	            if (onLoad) {
	                onLoad.call(this, e);
	            }
	            afterLoad();
	        });
	        el.addEventListener('error', function(e) {
	            reject(e);
	        });
	    }).catch(function(e) {
	        if (onError) {
	            onError(e);
	        }
	    });
	    if (dangerouslySetInnerHTML) {
	        el.innerHTML = dangerouslySetInnerHTML.__html || '';
	        afterLoad();
	    } else if (children) {
	        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
	        afterLoad();
	    } else if (src) {
	        el.src = src;
	        // do not add cacheKey into LoadCache for remote script here
	        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
	        ScriptCache.set(src, loadPromise);
	    }
	    for (const [k, value] of Object.entries(props)){
	        if (value === undefined || ignoreProps.includes(k)) {
	            continue;
	        }
	        const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
	        el.setAttribute(attr, value);
	    }
	    if (strategy === 'worker') {
	        el.setAttribute('type', 'text/partytown');
	    }
	    el.setAttribute('data-nscript', strategy);
	    document.body.appendChild(el);
	};
	function handleClientScriptLoad(props) {
	    const { strategy ='afterInteractive'  } = props;
	    if (strategy === 'lazyOnload') {
	        window.addEventListener('load', ()=>{
	            (_requestIdleCallback).requestIdleCallback(()=>loadScript(props));
	        });
	    } else {
	        loadScript(props);
	    }
	}
	function loadLazyScript(props) {
	    if (document.readyState === 'complete') {
	        (_requestIdleCallback).requestIdleCallback(()=>loadScript(props));
	    } else {
	        window.addEventListener('load', ()=>{
	            (_requestIdleCallback).requestIdleCallback(()=>loadScript(props));
	        });
	    }
	}
	function addBeforeInteractiveToCache() {
	    const scripts = [
	        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
	        ...document.querySelectorAll('[data-nscript="beforePageRender"]'), 
	    ];
	    scripts.forEach((script)=>{
	        const cacheKey = script.id || script.getAttribute('src');
	        LoadCache.add(cacheKey);
	    });
	}
	function initScriptLoader(scriptLoaderItems) {
	    scriptLoaderItems.forEach(handleClientScriptLoad);
	    addBeforeInteractiveToCache();
	}
	function Script(props) {
	    const { id , src ='' , onLoad =()=>{} , onReady =null , strategy ='afterInteractive' , onError  } = props, restProps = _object_without_properties_loose$1(props, [
	        "id",
	        "src",
	        "onLoad",
	        "onReady",
	        "strategy",
	        "onError"
	    ]);
	    // Context is available only during SSR
	    const { updateScripts , scripts , getIsSsr  } = (_react).useContext(_headManagerContext.HeadManagerContext);
	    /**
	   * - First mount:
	   *   1. The useEffect for onReady executes
	   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
	   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
	   *   3. The useEffect for loadScript executes
	   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
	   *      Once the script is loaded, the onLoad and onReady will be called by then
	   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
	   *   5. The useEffect for onReady executes again
	   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
	   *   7. The useEffect for loadScript executes again
	   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
	   *
	   * - Second mount:
	   *   1. The useEffect for onReady executes
	   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
	   *      onReady is called, set hasOnReadyEffectCalled.current to true
	   *   3. The useEffect for loadScript executes
	   *   4. The script is already loaded, loadScript bails out
	   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
	   *   5. The useEffect for onReady executes again
	   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
	   *   7. The useEffect for loadScript executes again
	   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
	   */ const hasOnReadyEffectCalled = (_react).useRef(false);
	    (_react).useEffect(()=>{
	        const cacheKey = id || src;
	        if (!hasOnReadyEffectCalled.current) {
	            // Run onReady if script has loaded before but component is re-mounted
	            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
	                onReady();
	            }
	            hasOnReadyEffectCalled.current = true;
	        }
	    }, [
	        onReady,
	        id,
	        src
	    ]);
	    const hasLoadScriptEffectCalled = (_react).useRef(false);
	    (_react).useEffect(()=>{
	        if (!hasLoadScriptEffectCalled.current) {
	            if (strategy === 'afterInteractive') {
	                loadScript(props);
	            } else if (strategy === 'lazyOnload') {
	                loadLazyScript(props);
	            }
	            hasLoadScriptEffectCalled.current = true;
	        }
	    }, [
	        props,
	        strategy
	    ]);
	    if (strategy === 'beforeInteractive' || strategy === 'worker') {
	        if (updateScripts) {
	            scripts[strategy] = (scripts[strategy] || []).concat([
	                _extends({
	                    id,
	                    src,
	                    onLoad,
	                    onReady,
	                    onError
	                }, restProps), 
	            ]);
	            updateScripts(scripts);
	        } else if (getIsSsr && getIsSsr()) {
	            // Script has already loaded during SSR
	            LoadCache.add(id || src);
	        } else if (getIsSsr && !getIsSsr()) {
	            loadScript(props);
	        }
	    }
	    return null;
	}
	Object.defineProperty(Script, '__nextScript', {
	    value: true
	});
	var _default = Script;
	exports.default = _default;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (script, script.exports));

var scriptExports = script.exports;

var isError$1 = {};

var isPlainObject$1 = {};

Object.defineProperty(isPlainObject$1, "__esModule", {
    value: true
});
isPlainObject$1.getObjectClassLabel = getObjectClassLabel;
isPlainObject$1.isPlainObject = isPlainObject;
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    /**
   * this used to be previously:
   *
   * `return prototype === null || prototype === Object.prototype`
   *
   * but Edge Runtime expose Object from vm, being that kind of type-checking wrongly fail.
   *
   * It was changed to the current implementation since it's resilient to serialization.
   */ return prototype === null || prototype.hasOwnProperty('isPrototypeOf');
}

Object.defineProperty(isError$1, "__esModule", {
    value: true
});
isError$1.default = isError;
isError$1.getProperError = getProperError;
var _isPlainObject = isPlainObject$1;
function isError(err) {
    return typeof err === "object" && err !== null && "name" in err && "message" in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if (process.env.NODE_ENV === "development") {
        // provide better error for case where `throw undefined`
        // is called in development
        if (typeof err === "undefined") {
            return new Error("An undefined error was thrown, " + "see here for more info: https://nextjs.org/docs/messages/threw-undefined");
        }
        if (err === null) {
            return new Error("A null error was thrown, " + "see here for more info: https://nextjs.org/docs/messages/threw-undefined");
        }
    }
    return new Error((_isPlainObject).isPlainObject(err) ? JSON.stringify(err) : err + "");
}

var denormalizePagePath$1 = {};

var utils$1 = {};

var sortedRoutes = {};

Object.defineProperty(sortedRoutes, "__esModule", {
    value: true
});
sortedRoutes.getSortedRoutes = getSortedRoutes;
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split('/').filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = '/') {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`);
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw new Error(`Catch-all must be the last part of the URL.`);
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith('...')) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
                throw new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`);
            }
            if (segmentName.startsWith('.')) {
                throw new Error(`Segment names may not start with erroneous periods ('${segmentName}').`);
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`);
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`);
                    }
                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
                        throw new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`);
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`);
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = '[[...]]';
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`);
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = '[...]';
                }
            } else {
                if (isOptional) {
                    throw new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`);
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = '[]';
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
}

var isDynamic = {};

Object.defineProperty(isDynamic, "__esModule", {
    value: true
});
isDynamic.isDynamicRoute = isDynamicRoute;
// Identify /[param]/ in route string
const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
function isDynamicRoute(route) {
    return TEST_ROUTE.test(route);
}

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "getSortedRoutes", {
	    enumerable: true,
	    get: function() {
	        return _sortedRoutes.getSortedRoutes;
	    }
	});
	Object.defineProperty(exports, "isDynamicRoute", {
	    enumerable: true,
	    get: function() {
	        return _isDynamic.isDynamicRoute;
	    }
	});
	var _sortedRoutes = sortedRoutes;
	var _isDynamic = isDynamic;

	
} (utils$1));

var normalizePathSep$1 = {};

Object.defineProperty(normalizePathSep$1, "__esModule", {
    value: true
});
normalizePathSep$1.normalizePathSep = normalizePathSep;
function normalizePathSep(path) {
    return path.replace(/\\/g, '/');
}

Object.defineProperty(denormalizePagePath$1, "__esModule", {
    value: true
});
denormalizePagePath$1.denormalizePagePath = denormalizePagePath;
var _utils$3 = utils$1;
var _normalizePathSep = normalizePathSep$1;
function denormalizePagePath(page) {
    let _page = (_normalizePathSep).normalizePathSep(page);
    return _page.startsWith('/index/') && !(_utils$3).isDynamicRoute(_page) ? _page.slice(6) : _page !== '/index' ? _page : '/';
}

var normalizeLocalePath$2 = {};

Object.defineProperty(normalizeLocalePath$2, "__esModule", {
    value: true
});
normalizeLocalePath$2.normalizeLocalePath = normalizeLocalePath$1;
function normalizeLocalePath$1(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split('/');
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join('/') || '/';
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
}

var mitt$1 = {};

Object.defineProperty(mitt$1, "__esModule", {
    value: true
});
mitt$1.default = mitt;
function mitt() {
    const all = Object.create(null);
    return {
        on (type, handler) {
            (all[type] || (all[type] = [])).push(handler);
        },
        off (type, handler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        emit (type, ...evts) {
            (all[type] || []).slice().map((handler)=>{
                handler(...evts);
            });
        }
    };
}

var utils = {};

Object.defineProperty(utils, "__esModule", {
    value: true
});
utils.execOnce = execOnce;
utils.getLocationOrigin = getLocationOrigin;
utils.getURL = getURL;
utils.getDisplayName = getDisplayName;
utils.isResSent = isResSent;
utils.normalizeRepeatedSlashes = normalizeRepeatedSlashes;
utils.loadGetInitialProps = loadGetInitialProps;
utils.ST = utils.SP = utils.warnOnce = utils.isAbsoluteUrl = void 0;
var _async_to_generator$1 = _async_to_generator$2.default;
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
utils.isAbsoluteUrl = isAbsoluteUrl;
function getLocationOrigin() {
    const { protocol , hostname , port  } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href  } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery// first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
function loadGetInitialProps(App, ctx) {
    return _loadGetInitialProps.apply(this, arguments);
}
function _loadGetInitialProps() {
    _loadGetInitialProps = _async_to_generator$1(function*(App, ctx) {
        if (process.env.NODE_ENV !== 'production') {
            var ref;
            if ((ref = App.prototype) == null ? void 0 : ref.getInitialProps) {
                const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
                throw new Error(message);
            }
        }
        // when called from _app `ctx` is nested in `ctx`
        const res = ctx.res || ctx.ctx && ctx.ctx.res;
        if (!App.getInitialProps) {
            if (ctx.ctx && ctx.Component) {
                // @ts-ignore pageProps default
                return {
                    pageProps: yield loadGetInitialProps(ctx.Component, ctx.ctx)
                };
            }
            return {};
        }
        const props = yield App.getInitialProps(ctx);
        if (res && isResSent(res)) {
            return props;
        }
        if (!props) {
            const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
            throw new Error(message);
        }
        if (process.env.NODE_ENV !== 'production') {
            if (Object.keys(props).length === 0 && !ctx.ctx) {
                console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
            }
        }
        return props;
    });
    return _loadGetInitialProps.apply(this, arguments);
}
let warnOnce = (_)=>{};
if (process.env.NODE_ENV !== 'production') {
    const warnings = new Set();
    utils.warnOnce = warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
}
const SP = typeof performance !== 'undefined';
utils.SP = SP;
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
utils.ST = ST;
class DecodeError extends Error {
}
utils.DecodeError = DecodeError;
class NormalizeError extends Error {
}
utils.NormalizeError = NormalizeError;
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find module for page: ${page}`;
    }
}
utils.PageNotFoundError = PageNotFoundError;
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
utils.MissingStaticPage = MissingStaticPage;
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
utils.MiddlewareNotFoundError = MiddlewareNotFoundError;
utils.warnOnce = warnOnce;

var parseRelativeUrl$1 = {};

var querystring$1 = {};

Object.defineProperty(querystring$1, "__esModule", {
    value: true
});
querystring$1.searchParamsToUrlQuery = searchParamsToUrlQuery;
querystring$1.urlQueryToSearchParams = urlQueryToSearchParams;
querystring$1.assign = assign;
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key)=>{
        if (typeof query[key] === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(query[key])) {
            query[key].push(value);
        } else {
            query[key] = [
                query[key],
                value
            ];
        }
    });
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach(([key, value])=>{
        if (Array.isArray(value)) {
            value.forEach((item)=>result.append(key, stringifyUrlQueryParam(item)));
        } else {
            result.set(key, stringifyUrlQueryParam(value));
        }
    });
    return result;
}
function assign(target, ...searchParamsList) {
    searchParamsList.forEach((searchParams)=>{
        Array.from(searchParams.keys()).forEach((key)=>target.delete(key));
        searchParams.forEach((value, key)=>target.append(key, value));
    });
    return target;
}

Object.defineProperty(parseRelativeUrl$1, "__esModule", {
    value: true
});
parseRelativeUrl$1.parseRelativeUrl = parseRelativeUrl;
var _utils$2 = utils;
var _querystring$2 = querystring$1;
function parseRelativeUrl(url, base) {
    const globalBase = new URL(typeof window === 'undefined' ? 'http://n' : (_utils$2).getLocationOrigin());
    const resolvedBase = base ? new URL(base, globalBase) : url.startsWith('.') ? new URL(typeof window === 'undefined' ? 'http://n' : window.location.href) : globalBase;
    const { pathname , searchParams , search , hash , href , origin  } = new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
        throw new Error(`invariant: invalid relative URL, router received ${url}`);
    }
    return {
        pathname,
        query: (_querystring$2).searchParamsToUrlQuery(searchParams),
        search,
        hash,
        href: href.slice(globalBase.origin.length)
    };
}

var resolveRewrites$1 = {};

var pathMatch = {};

var pathToRegexp$1 = {};

Object.defineProperty(pathToRegexp$1, "__esModule", { value: true });
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
pathToRegexp$1.parse = parse;
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
pathToRegexp$1.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
pathToRegexp$1.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
pathToRegexp$1.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
pathToRegexp$1.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
pathToRegexp$1.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
pathToRegexp$1.pathToRegexp = pathToRegexp;

Object.defineProperty(pathMatch, "__esModule", {
    value: true
});
pathMatch.getPathMatch = getPathMatch;
var _extends$3 = _extends$5.default;
var _pathToRegexp$1 = pathToRegexp$1;
function getPathMatch(path, options) {
    const keys = [];
    const regexp = (_pathToRegexp$1).pathToRegexp(path, keys, {
        delimiter: '/',
        sensitive: false,
        strict: options == null ? void 0 : options.strict
    });
    const matcher = (_pathToRegexp$1).regexpToFunction((options == null ? void 0 : options.regexModifier) ? new RegExp(options.regexModifier(regexp.source), regexp.flags) : regexp, keys);
    /**
   * A matcher function that will check if a given pathname matches the path
   * given in the builder function. When the path does not match it will return
   * `false` but if it does it will return an object with the matched params
   * merged with the params provided in the second argument.
   */ return (pathname, params)=>{
        const res = pathname == null ? false : matcher(pathname);
        if (!res) {
            return false;
        }
        /**
     * If unnamed params are not allowed they must be removed from
     * the matched parameters. path-to-regexp uses "string" for named and
     * "number" for unnamed parameters.
     */ if (options == null ? void 0 : options.removeUnnamedParams) {
            for (const key of keys){
                if (typeof key.name === 'number') {
                    delete res.params[key.name];
                }
            }
        }
        return _extends$3({}, params, res.params);
    };
}

var prepareDestination$1 = {};

var escapeRegexp = {};

Object.defineProperty(escapeRegexp, "__esModule", {
    value: true
});
escapeRegexp.escapeStringRegexp = escapeStringRegexp;
// regexp is based on https://github.com/sindresorhus/escape-string-regexp
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, '\\$&');
    }
    return str;
}

var parseUrl$1 = {};

Object.defineProperty(parseUrl$1, "__esModule", {
    value: true
});
parseUrl$1.parseUrl = parseUrl;
var _querystring$1 = querystring$1;
var _parseRelativeUrl$2 = parseRelativeUrl$1;
function parseUrl(url) {
    if (url.startsWith('/')) {
        return (_parseRelativeUrl$2).parseRelativeUrl(url);
    }
    const parsedURL = new URL(url);
    return {
        hash: parsedURL.hash,
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        pathname: parsedURL.pathname,
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        query: (_querystring$1).searchParamsToUrlQuery(parsedURL.searchParams),
        search: parsedURL.search
    };
}

Object.defineProperty(prepareDestination$1, "__esModule", {
    value: true
});
prepareDestination$1.matchHas = matchHas;
prepareDestination$1.compileNonPath = compileNonPath;
prepareDestination$1.prepareDestination = prepareDestination;
var _extends$2 = _extends$5.default;
var _pathToRegexp = pathToRegexp$1;
var _escapeRegexp$1 = escapeRegexp;
var _parseUrl = parseUrl$1;
/**
 * Ensure only a-zA-Z are used for param names for proper interpolating
 * with path-to-regexp
 */ function getSafeParamName(paramName) {
    let newParamName = '';
    for(let i = 0; i < paramName.length; i++){
        const charCode = paramName.charCodeAt(i);
        if (charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 // a-z
        ) {
            newParamName += paramName[i];
        }
    }
    return newParamName;
}
function escapeSegment(str, segmentName) {
    return str.replace(new RegExp(`:${(_escapeRegexp$1).escapeStringRegexp(segmentName)}`, 'g'), `__ESC_COLON_${segmentName}`);
}
function unescapeSegments(str) {
    return str.replace(/__ESC_COLON_/gi, ':');
}
function matchHas(req, query, has = [], missing = []) {
    const params = {};
    const hasMatch = (hasItem)=>{
        let value;
        let key = hasItem.key;
        switch(hasItem.type){
            case 'header':
                {
                    key = key.toLowerCase();
                    value = req.headers[key];
                    break;
                }
            case 'cookie':
                {
                    value = req.cookies[hasItem.key];
                    break;
                }
            case 'query':
                {
                    value = query[key];
                    break;
                }
            case 'host':
                {
                    const { host  } = (req == null ? void 0 : req.headers) || {};
                    // remove port from host if present
                    const hostname = host == null ? void 0 : host.split(':')[0].toLowerCase();
                    value = hostname;
                    break;
                }
        }
        if (!hasItem.value && value) {
            params[getSafeParamName(key)] = value;
            return true;
        } else if (value) {
            const matcher = new RegExp(`^${hasItem.value}$`);
            const matches = Array.isArray(value) ? value.slice(-1)[0].match(matcher) : value.match(matcher);
            if (matches) {
                if (Array.isArray(matches)) {
                    if (matches.groups) {
                        Object.keys(matches.groups).forEach((groupKey)=>{
                            params[groupKey] = matches.groups[groupKey];
                        });
                    } else if (hasItem.type === 'host' && matches[0]) {
                        params.host = matches[0];
                    }
                }
                return true;
            }
        }
        return false;
    };
    const allMatch = has.every((item)=>hasMatch(item)) && !missing.some((item)=>hasMatch(item));
    if (allMatch) {
        return params;
    }
    return false;
}
function compileNonPath(value, params) {
    if (!value.includes(':')) {
        return value;
    }
    for (const key of Object.keys(params)){
        if (value.includes(`:${key}`)) {
            value = value.replace(new RegExp(`:${key}\\*`, 'g'), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, 'g'), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, 'g'), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, 'g'), `--ESCAPED_PARAM_COLON${key}`);
        }
    }
    value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1').replace(/--ESCAPED_PARAM_PLUS/g, '+').replace(/--ESCAPED_PARAM_COLON/g, ':').replace(/--ESCAPED_PARAM_QUESTION/g, '?').replace(/--ESCAPED_PARAM_ASTERISKS/g, '*');
    // the value needs to start with a forward-slash to be compiled
    // correctly
    return (_pathToRegexp).compile(`/${value}`, {
        validate: false
    })(params).slice(1);
}
function prepareDestination(args) {
    const query = Object.assign({}, args.query);
    delete query.__nextLocale;
    delete query.__nextDefaultLocale;
    delete query.__nextDataReq;
    let escapedDestination = args.destination;
    for (const param of Object.keys(_extends$2({}, args.params, query))){
        escapedDestination = escapeSegment(escapedDestination, param);
    }
    const parsedDestination = (_parseUrl).parseUrl(escapedDestination);
    const destQuery = parsedDestination.query;
    const destPath = unescapeSegments(`${parsedDestination.pathname}${parsedDestination.hash || ''}`);
    const destHostname = unescapeSegments(parsedDestination.hostname || '');
    const destPathParamKeys = [];
    const destHostnameParamKeys = [];
    (_pathToRegexp).pathToRegexp(destPath, destPathParamKeys);
    (_pathToRegexp).pathToRegexp(destHostname, destHostnameParamKeys);
    const destParams = [];
    destPathParamKeys.forEach((key)=>destParams.push(key.name));
    destHostnameParamKeys.forEach((key)=>destParams.push(key.name));
    const destPathCompiler = (_pathToRegexp).compile(destPath, // we don't validate while compiling the destination since we should
    // have already validated before we got to this point and validating
    // breaks compiling destinations with named pattern params from the source
    // e.g. /something:hello(.*) -> /another/:hello is broken with validation
    // since compile validation is meant for reversing and not for inserting
    // params from a separate path-regex into another
    {
        validate: false
    });
    const destHostnameCompiler = (_pathToRegexp).compile(destHostname, {
        validate: false
    });
    // update any params in query values
    for (const [key1, strOrArray] of Object.entries(destQuery)){
        // the value needs to start with a forward-slash to be compiled
        // correctly
        if (Array.isArray(strOrArray)) {
            destQuery[key1] = strOrArray.map((value)=>compileNonPath(unescapeSegments(value), args.params));
        } else {
            destQuery[key1] = compileNonPath(unescapeSegments(strOrArray), args.params);
        }
    }
    // add path params to query if it's not a redirect and not
    // already defined in destination query or path
    let paramKeys = Object.keys(args.params).filter((name)=>name !== 'nextInternalLocale');
    if (args.appendParamsToQuery && !paramKeys.some((key)=>destParams.includes(key))) {
        for (const key of paramKeys){
            if (!(key in destQuery)) {
                destQuery[key] = args.params[key];
            }
        }
    }
    let newUrl;
    try {
        newUrl = destPathCompiler(args.params);
        const [pathname, hash] = newUrl.split('#');
        parsedDestination.hostname = destHostnameCompiler(args.params);
        parsedDestination.pathname = pathname;
        parsedDestination.hash = `${hash ? '#' : ''}${hash || ''}`;
        delete parsedDestination.search;
    } catch (err) {
        if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
            throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`);
        }
        throw err;
    }
    // Query merge order lowest priority to highest
    // 1. initial URL query values
    // 2. path segment values
    // 3. destination specified query values
    parsedDestination.query = _extends$2({}, query, parsedDestination.query);
    return {
        newUrl,
        destQuery,
        parsedDestination
    };
}

var removeBasePath = {exports: {}};

var hasBasePath = {exports: {}};

var pathHasPrefix$1 = {};

Object.defineProperty(pathHasPrefix$1, "__esModule", {
    value: true
});
pathHasPrefix$1.pathHasPrefix = pathHasPrefix;
var _parsePath$3 = parsePath$1;
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname  } = (_parsePath$3).parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
}

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hasBasePath = hasBasePath;
	var _pathHasPrefix = pathHasPrefix$1;
	const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
	function hasBasePath(path) {
	    return (_pathHasPrefix).pathHasPrefix(path, basePath);
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (hasBasePath, hasBasePath.exports));

var hasBasePathExports = hasBasePath.exports;

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.removeBasePath = removeBasePath;
	var _hasBasePath = hasBasePathExports;
	const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
	function removeBasePath(path) {
	    if (process.env.__NEXT_MANUAL_CLIENT_BASE_PATH) {
	        if (!(_hasBasePath).hasBasePath(path)) {
	            return path;
	        }
	    }
	    path = path.slice(basePath.length);
	    if (!path.startsWith('/')) path = `/${path}`;
	    return path;
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (removeBasePath, removeBasePath.exports));

var removeBasePathExports = removeBasePath.exports;

Object.defineProperty(resolveRewrites$1, "__esModule", {
    value: true
});
resolveRewrites$1.default = resolveRewrites;
var _pathMatch = pathMatch;
var _prepareDestination = prepareDestination$1;
var _removeTrailingSlash$3 = removeTrailingSlash$1;
var _normalizeLocalePath$2 = normalizeLocalePath$2;
var _removeBasePath$1 = removeBasePathExports;
var _parseRelativeUrl$1 = parseRelativeUrl$1;
function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
    let matchedPage = false;
    let externalDest = false;
    let parsedAs = (_parseRelativeUrl$1).parseRelativeUrl(asPath);
    let fsPathname = (_removeTrailingSlash$3).removeTrailingSlash((_normalizeLocalePath$2).normalizeLocalePath((_removeBasePath$1).removeBasePath(parsedAs.pathname), locales).pathname);
    let resolvedHref;
    const handleRewrite = (rewrite)=>{
        const matcher = (_pathMatch).getPathMatch(rewrite.source + (process.env.__NEXT_TRAILING_SLASH ? '(/)?' : ''), {
            removeUnnamedParams: true,
            strict: true
        });
        let params = matcher(parsedAs.pathname);
        if ((rewrite.has || rewrite.missing) && params) {
            const hasParams = (_prepareDestination).matchHas({
                headers: {
                    host: document.location.hostname
                },
                cookies: document.cookie.split('; ').reduce((acc, item)=>{
                    const [key, ...value] = item.split('=');
                    acc[key] = value.join('=');
                    return acc;
                }, {})
            }, parsedAs.query, rewrite.has, rewrite.missing);
            if (hasParams) {
                Object.assign(params, hasParams);
            } else {
                params = false;
            }
        }
        if (params) {
            if (!rewrite.destination) {
                // this is a proxied rewrite which isn't handled on the client
                externalDest = true;
                return true;
            }
            const destRes = (_prepareDestination).prepareDestination({
                appendParamsToQuery: true,
                destination: rewrite.destination,
                params: params,
                query: query
            });
            parsedAs = destRes.parsedDestination;
            asPath = destRes.newUrl;
            Object.assign(query, destRes.parsedDestination.query);
            fsPathname = (_removeTrailingSlash$3).removeTrailingSlash((_normalizeLocalePath$2).normalizeLocalePath((_removeBasePath$1).removeBasePath(asPath), locales).pathname);
            if (pages.includes(fsPathname)) {
                // check if we now match a page as this means we are done
                // resolving the rewrites
                matchedPage = true;
                resolvedHref = fsPathname;
                return true;
            }
            // check if we match a dynamic-route, if so we break the rewrites chain
            resolvedHref = resolveHref(fsPathname);
            if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
                matchedPage = true;
                return true;
            }
        }
    };
    let finished = false;
    for(let i = 0; i < rewrites.beforeFiles.length; i++){
        // we don't end after match in beforeFiles to allow
        // continuing through all beforeFiles rewrites
        handleRewrite(rewrites.beforeFiles[i]);
    }
    matchedPage = pages.includes(fsPathname);
    if (!matchedPage) {
        if (!finished) {
            for(let i = 0; i < rewrites.afterFiles.length; i++){
                if (handleRewrite(rewrites.afterFiles[i])) {
                    finished = true;
                    break;
                }
            }
        }
        // check dynamic route before processing fallback rewrites
        if (!finished) {
            resolvedHref = resolveHref(fsPathname);
            matchedPage = pages.includes(resolvedHref);
            finished = matchedPage;
        }
        if (!finished) {
            for(let i = 0; i < rewrites.fallback.length; i++){
                if (handleRewrite(rewrites.fallback[i])) {
                    finished = true;
                    break;
                }
            }
        }
    }
    return {
        asPath,
        parsedAs,
        matchedPage,
        resolvedHref,
        externalDest
    };
}

var routeMatcher = {};

Object.defineProperty(routeMatcher, "__esModule", {
    value: true
});
routeMatcher.getRouteMatcher = getRouteMatcher;
var _utils$1 = utils;
function getRouteMatcher({ re , groups  }) {
    return (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) {
            return false;
        }
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch (_) {
                throw new _utils$1.DecodeError('failed to decode param');
            }
        };
        const params = {};
        Object.keys(groups).forEach((slugName)=>{
            const g = groups[slugName];
            const m = routeMatch[g.pos];
            if (m !== undefined) {
                params[slugName] = ~m.indexOf('/') ? m.split('/').map((entry)=>decode(entry)) : g.repeat ? [
                    decode(m)
                ] : decode(m);
            }
        });
        return params;
    };
}

var routeRegex = {};

Object.defineProperty(routeRegex, "__esModule", {
    value: true
});
routeRegex.getRouteRegex = getRouteRegex;
routeRegex.getNamedRouteRegex = getNamedRouteRegex;
routeRegex.getNamedMiddlewareRegex = getNamedMiddlewareRegex;
var _extends$1 = _extends$5.default;
var _escapeRegexp = escapeRegexp;
var _removeTrailingSlash$2 = removeTrailingSlash$1;
/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route. Examples:
 *   - `[...slug]` -> `{ name: 'slug', repeat: true, optional: true }`
 *   - `[foo]` -> `{ name: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ name: 'bar', repeat: false, optional: false }`
 */ function parseParameter(param) {
    const optional = param.startsWith('[') && param.endsWith(']');
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith('...');
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
}
function getParametrizedRoute(route) {
    const segments = (_removeTrailingSlash$2).removeTrailingSlash(route).slice(1).split('/');
    const groups = {};
    let groupIndex = 1;
    return {
        parameterizedRoute: segments.map((segment)=>{
            if (segment.startsWith('[') && segment.endsWith(']')) {
                const { key , optional , repeat  } = parseParameter(segment.slice(1, -1));
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
            } else {
                return `/${(_escapeRegexp).escapeStringRegexp(segment)}`;
            }
        }).join(''),
        groups
    };
}
function getRouteRegex(normalizedRoute) {
    const { parameterizedRoute , groups  } = getParametrizedRoute(normalizedRoute);
    return {
        re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1;
    return ()=>{
        let routeKey = '';
        for(let i = 0; i < routeKeyCharLength; i++){
            routeKey += String.fromCharCode(routeKeyCharCode);
            routeKeyCharCode++;
            if (routeKeyCharCode > 122) {
                routeKeyCharLength++;
                routeKeyCharCode = 97;
            }
        }
        return routeKey;
    };
}
function getNamedParametrizedRoute(route) {
    const segments = (_removeTrailingSlash$2).removeTrailingSlash(route).slice(1).split('/');
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    return {
        namedParameterizedRoute: segments.map((segment)=>{
            if (segment.startsWith('[') && segment.endsWith(']')) {
                const { key , optional , repeat  } = parseParameter(segment.slice(1, -1));
                // replace any non-word characters since they can break
                // the named regex
                let cleanedKey = key.replace(/\W/g, '');
                let invalidKey = false;
                // check if the key is still invalid and fallback to using a known
                // safe key
                if (cleanedKey.length === 0 || cleanedKey.length > 30) {
                    invalidKey = true;
                }
                if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
                    invalidKey = true;
                }
                if (invalidKey) {
                    cleanedKey = getSafeRouteKey();
                }
                routeKeys[cleanedKey] = key;
                return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
            } else {
                return `/${(_escapeRegexp).escapeStringRegexp(segment)}`;
            }
        }).join(''),
        routeKeys
    };
}
function getNamedRouteRegex(normalizedRoute) {
    const result = getNamedParametrizedRoute(normalizedRoute);
    return _extends$1({}, getRouteRegex(normalizedRoute), {
        namedRegex: `^${result.namedParameterizedRoute}(?:/)?$`,
        routeKeys: result.routeKeys
    });
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute  } = getParametrizedRoute(normalizedRoute);
    const { catchAll =true  } = options;
    if (parameterizedRoute === '/') {
        let catchAllRegex = catchAll ? '.*' : '';
        return {
            namedRegex: `^/${catchAllRegex}$`
        };
    }
    const { namedParameterizedRoute  } = getNamedParametrizedRoute(normalizedRoute);
    let catchAllGroupedRegex = catchAll ? '(?:(/.*)?)' : '';
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
}

var formatUrl$1 = {};

Object.defineProperty(formatUrl$1, "__esModule", {
    value: true
});
formatUrl$1.formatUrl = formatUrl;
formatUrl$1.formatWithValidation = formatWithValidation;
formatUrl$1.urlObjectKeys = void 0;
var _interop_require_wildcard$1 = _interop_require_wildcard$2.default;
var querystring = _interop_require_wildcard$1(querystring$1);
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth , hostname  } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes', 
];
formatUrl$1.urlObjectKeys = urlObjectKeys;
function formatWithValidation(url) {
    if (process.env.NODE_ENV === 'development') {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (urlObjectKeys.indexOf(key) === -1) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
}

var detectDomainLocale$1 = {exports: {}};

var detectDomainLocale = {};

var hasRequiredDetectDomainLocale$1;

function requireDetectDomainLocale$1 () {
	if (hasRequiredDetectDomainLocale$1) return detectDomainLocale;
	hasRequiredDetectDomainLocale$1 = 1;
	Object.defineProperty(detectDomainLocale, "__esModule", {
	    value: true
	});
	detectDomainLocale.detectDomainLocale = detectDomainLocale$1;
	function detectDomainLocale$1(domainItems, hostname, detectedLocale) {
	    let domainItem;
	    if (domainItems) {
	        if (detectedLocale) {
	            detectedLocale = detectedLocale.toLowerCase();
	        }
	        for (const item of domainItems){
	            var ref, ref1;
	            // remove port if present
	            const domainHostname = (ref = item.domain) == null ? void 0 : ref.split(':')[0].toLowerCase();
	            if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((ref1 = item.locales) == null ? void 0 : ref1.some((locale)=>locale.toLowerCase() === detectedLocale))) {
	                domainItem = item;
	                break;
	            }
	        }
	    }
	    return domainItem;
	}

	
	return detectDomainLocale;
}

var hasRequiredDetectDomainLocale;

function requireDetectDomainLocale () {
	if (hasRequiredDetectDomainLocale) return detectDomainLocale$1.exports;
	hasRequiredDetectDomainLocale = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		exports.detectDomainLocale = void 0;
		const detectDomainLocale = (...args)=>{
		    if (process.env.__NEXT_I18N_SUPPORT) {
		        return requireDetectDomainLocale$1().detectDomainLocale(...args);
		    }
		};
		exports.detectDomainLocale = detectDomainLocale;

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (detectDomainLocale$1, detectDomainLocale$1.exports));
	return detectDomainLocale$1.exports;
}

var addLocale$1 = {exports: {}};

var addLocale = {};

var addPathPrefix$1 = {};

Object.defineProperty(addPathPrefix$1, "__esModule", {
    value: true
});
addPathPrefix$1.addPathPrefix = addPathPrefix;
var _parsePath$2 = parsePath$1;
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname , query , hash  } = (_parsePath$2).parsePath(path);
    return `${prefix}${pathname}${query}${hash}`;
}

var hasRequiredAddLocale;

function requireAddLocale () {
	if (hasRequiredAddLocale) return addLocale;
	hasRequiredAddLocale = 1;
	Object.defineProperty(addLocale, "__esModule", {
	    value: true
	});
	addLocale.addLocale = addLocale$1;
	var _addPathPrefix = addPathPrefix$1;
	var _pathHasPrefix = pathHasPrefix$1;
	function addLocale$1(path, locale, defaultLocale, ignorePrefix) {
	    if (locale && locale !== defaultLocale && (ignorePrefix || !(_pathHasPrefix).pathHasPrefix(path.toLowerCase(), `/${locale.toLowerCase()}`) && !(_pathHasPrefix).pathHasPrefix(path.toLowerCase(), '/api'))) {
	        return (_addPathPrefix).addPathPrefix(path, `/${locale}`);
	    }
	    return path;
	}

	
	return addLocale;
}

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addLocale = void 0;
	var _normalizeTrailingSlash = normalizeTrailingSlashExports;
	const addLocale = (path, ...args)=>{
	    if (process.env.__NEXT_I18N_SUPPORT) {
	        return (_normalizeTrailingSlash).normalizePathTrailingSlash(requireAddLocale().addLocale(path, ...args));
	    }
	    return path;
	};
	exports.addLocale = addLocale;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (addLocale$1, addLocale$1.exports));

var addLocaleExports = addLocale$1.exports;

var removeLocale = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.removeLocale = removeLocale;
	var _parsePath = parsePath$1;
	function removeLocale(path, locale) {
	    if (process.env.__NEXT_I18N_SUPPORT) {
	        const { pathname  } = (_parsePath).parsePath(path);
	        const pathLower = pathname.toLowerCase();
	        const localeLower = locale == null ? void 0 : locale.toLowerCase();
	        return locale && (pathLower.startsWith(`/${localeLower}/`) || pathLower === `/${localeLower}`) ? `${pathname.length === locale.length + 1 ? `/` : ``}${path.slice(locale.length + 1)}` : path;
	    }
	    return path;
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (removeLocale, removeLocale.exports));

var removeLocaleExports = removeLocale.exports;

var addBasePath = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addBasePath = addBasePath;
	var _addPathPrefix = addPathPrefix$1;
	var _normalizeTrailingSlash = normalizeTrailingSlashExports;
	const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
	function addBasePath(path, required) {
	    if (process.env.__NEXT_MANUAL_CLIENT_BASE_PATH) {
	        if (!required) {
	            return path;
	        }
	    }
	    return (_normalizeTrailingSlash).normalizePathTrailingSlash((_addPathPrefix).addPathPrefix(path, basePath));
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (addBasePath, addBasePath.exports));

var addBasePathExports = addBasePath.exports;

var getNextPathnameInfo$1 = {};

var removePathPrefix$1 = {};

Object.defineProperty(removePathPrefix$1, "__esModule", {
    value: true
});
removePathPrefix$1.removePathPrefix = removePathPrefix;
var _pathHasPrefix$1 = pathHasPrefix$1;
function removePathPrefix(path, prefix) {
    if ((_pathHasPrefix$1).pathHasPrefix(path, prefix)) {
        const withoutPrefix = path.slice(prefix.length);
        return withoutPrefix.startsWith('/') ? withoutPrefix : `/${withoutPrefix}`;
    }
    return path;
}

Object.defineProperty(getNextPathnameInfo$1, "__esModule", {
    value: true
});
getNextPathnameInfo$1.getNextPathnameInfo = getNextPathnameInfo;
var _normalizeLocalePath$1 = normalizeLocalePath$2;
var _removePathPrefix = removePathPrefix$1;
var _pathHasPrefix = pathHasPrefix$1;
function getNextPathnameInfo(pathname, options) {
    var _nextConfig;
    const { basePath , i18n , trailingSlash  } = (_nextConfig = options.nextConfig) != null ? _nextConfig : {};
    const info = {
        pathname: pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (_pathHasPrefix).pathHasPrefix(info.pathname, basePath)) {
        info.pathname = (_removePathPrefix).removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    if (options.parseData === true && info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.pathname = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
        info.buildId = buildId;
    }
    if (i18n) {
        const pathLocale = (_normalizeLocalePath$1).normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = pathLocale == null ? void 0 : pathLocale.detectedLocale;
        info.pathname = (pathLocale == null ? void 0 : pathLocale.pathname) || info.pathname;
    }
    return info;
}

var formatNextPathnameInfo$1 = {};

var addPathSuffix$1 = {};

Object.defineProperty(addPathSuffix$1, "__esModule", {
    value: true
});
addPathSuffix$1.addPathSuffix = addPathSuffix;
var _parsePath$1 = parsePath$1;
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname , query , hash  } = (_parsePath$1).parsePath(path);
    return `${pathname}${suffix}${query}${hash}`;
}

Object.defineProperty(formatNextPathnameInfo$1, "__esModule", {
    value: true
});
formatNextPathnameInfo$1.formatNextPathnameInfo = formatNextPathnameInfo;
var _removeTrailingSlash$1 = removeTrailingSlash$1;
var _addPathPrefix = addPathPrefix$1;
var _addPathSuffix = addPathSuffix$1;
var _addLocale$1 = requireAddLocale();
function formatNextPathnameInfo(info) {
    let pathname = (_addLocale$1).addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId) {
        pathname = (_addPathSuffix).addPathSuffix((_addPathPrefix).addPathPrefix(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (_addPathPrefix).addPathPrefix(pathname, info.basePath);
    return info.trailingSlash ? !info.buildId && !pathname.endsWith('/') ? (_addPathSuffix).addPathSuffix(pathname, '/') : pathname : (_removeTrailingSlash$1).removeTrailingSlash(pathname);
}

var compareStates = {};

Object.defineProperty(compareStates, "__esModule", {
    value: true
});
compareStates.compareRouterStates = compareRouterStates;
function compareRouterStates(a, b) {
    const stateKeys = Object.keys(a);
    if (stateKeys.length !== Object.keys(b).length) return false;
    for(let i = stateKeys.length; i--;){
        const key = stateKeys[i];
        if (key === 'query') {
            const queryKeys = Object.keys(a.query);
            if (queryKeys.length !== Object.keys(b.query).length) {
                return false;
            }
            for(let j = queryKeys.length; j--;){
                const queryKey = queryKeys[j];
                if (!b.query.hasOwnProperty(queryKey) || a.query[queryKey] !== b.query[queryKey]) {
                    return false;
                }
            }
        } else if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

var isBot$1 = {};

Object.defineProperty(isBot$1, "__esModule", {
    value: true
});
isBot$1.isBot = isBot;
function isBot(userAgent) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(userAgent);
}

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b=60103,c=60106,d=60107,e=60108,f=60114,g=60109,h=60110,k=60112,l=60113,m=60120,n=60115,p=60116,q=60121,r=60122,u=60117,v=60129,w=60131;
	if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element");c=x("react.portal");d=x("react.fragment");e=x("react.strict_mode");f=x("react.profiler");g=x("react.provider");h=x("react.context");k=x("react.forward_ref");l=x("react.suspense");m=x("react.suspense_list");n=x("react.memo");p=x("react.lazy");q=x("react.block");r=x("react.server.block");u=x("react.fundamental");v=x("react.debug_trace_mode");w=x("react.legacy_hidden");}
	function y(a){if("object"===typeof a&&null!==a){var t=a.$$typeof;switch(t){case b:switch(a=a.type,a){case d:case f:case e:case l:case m:return a;default:switch(a=a&&a.$$typeof,a){case h:case k:case p:case n:case g:return a;default:return t}}case c:return t}}}var z=g,A=b,B=k,C=d,D=p,E=n,F=c,G=f,H=e,I=l;reactIs_production_min.ContextConsumer=h;reactIs_production_min.ContextProvider=z;reactIs_production_min.Element=A;reactIs_production_min.ForwardRef=B;reactIs_production_min.Fragment=C;reactIs_production_min.Lazy=D;reactIs_production_min.Memo=E;reactIs_production_min.Portal=F;reactIs_production_min.Profiler=G;reactIs_production_min.StrictMode=H;
	reactIs_production_min.Suspense=I;reactIs_production_min.isAsyncMode=function(){return !1};reactIs_production_min.isConcurrentMode=function(){return !1};reactIs_production_min.isContextConsumer=function(a){return y(a)===h};reactIs_production_min.isContextProvider=function(a){return y(a)===g};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min.isForwardRef=function(a){return y(a)===k};reactIs_production_min.isFragment=function(a){return y(a)===d};reactIs_production_min.isLazy=function(a){return y(a)===p};reactIs_production_min.isMemo=function(a){return y(a)===n};
	reactIs_production_min.isPortal=function(a){return y(a)===c};reactIs_production_min.isProfiler=function(a){return y(a)===f};reactIs_production_min.isStrictMode=function(a){return y(a)===e};reactIs_production_min.isSuspense=function(a){return y(a)===l};reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===v||a===e||a===l||a===m||a===w||"object"===typeof a&&null!==a&&(a.$$typeof===p||a.$$typeof===n||a.$$typeof===g||a.$$typeof===h||a.$$typeof===k||a.$$typeof===u||a.$$typeof===q||a[0]===r)?!0:!1};
	reactIs_production_min.typeOf=y;
	return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = 0xeac7;
	var REACT_PORTAL_TYPE = 0xeaca;
	var REACT_FRAGMENT_TYPE = 0xeacb;
	var REACT_STRICT_MODE_TYPE = 0xeacc;
	var REACT_PROFILER_TYPE = 0xead2;
	var REACT_PROVIDER_TYPE = 0xeacd;
	var REACT_CONTEXT_TYPE = 0xeace;
	var REACT_FORWARD_REF_TYPE = 0xead0;
	var REACT_SUSPENSE_TYPE = 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = 0xead8;
	var REACT_MEMO_TYPE = 0xead3;
	var REACT_LAZY_TYPE = 0xead4;
	var REACT_BLOCK_TYPE = 0xead9;
	var REACT_SERVER_BLOCK_TYPE = 0xeada;
	var REACT_FUNDAMENTAL_TYPE = 0xead5;
	var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
	var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

	if (typeof Symbol === 'function' && Symbol.for) {
	  var symbolFor = Symbol.for;
	  REACT_ELEMENT_TYPE = symbolFor('react.element');
	  REACT_PORTAL_TYPE = symbolFor('react.portal');
	  REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
	  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
	  REACT_PROFILER_TYPE = symbolFor('react.profiler');
	  REACT_PROVIDER_TYPE = symbolFor('react.provider');
	  REACT_CONTEXT_TYPE = symbolFor('react.context');
	  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
	  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
	  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
	  REACT_MEMO_TYPE = symbolFor('react.memo');
	  REACT_LAZY_TYPE = symbolFor('react.lazy');
	  REACT_BLOCK_TYPE = symbolFor('react.block');
	  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
	  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
	  symbolFor('react.scope');
	  symbolFor('react.opaque.id');
	  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
	  symbolFor('react.offscreen');
	  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
	}

	// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

	var enableScopeAPI = false; // Experimental Create Event Handle API.

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
	      return true;
	    }
	  }

	  return false;
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	          case REACT_SUSPENSE_LIST_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false;
	var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
	    }
	  }

	  return false;
	}
	function isConcurrentMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
	      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
	    }
	  }

	  return false;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs () {
	if (hasRequiredReactIs) return reactIs.exports;
	hasRequiredReactIs = 1;

	if (process.env.NODE_ENV === 'production') {
	  reactIs.exports = requireReactIs_production_min();
	} else {
	  reactIs.exports = requireReactIs_development();
	}
	return reactIs.exports;
}

Object.defineProperty(router, "__esModule", {
    value: true
});
router.matchesMiddleware = matchesMiddleware;
router.isLocalURL = isLocalURL;
router.interpolateAs = interpolateAs;
router.resolveHref = resolveHref;
router.createKey = createKey;
router.default = void 0;
var _async_to_generator = _async_to_generator$2.default;
var _extends = _extends$5.default;
var _interop_require_default$2 = _interop_require_default$4.default;
var _interop_require_wildcard = _interop_require_wildcard$2.default;
var _normalizeTrailingSlash = normalizeTrailingSlashExports;
var _removeTrailingSlash = removeTrailingSlash$1;
var _routeLoader = routeLoaderExports;
var _script = scriptExports;
var _isError = _interop_require_wildcard(isError$1);
var _denormalizePagePath = denormalizePagePath$1;
var _normalizeLocalePath = normalizeLocalePath$2;
var _mitt = _interop_require_default$2(mitt$1);
var _utils = utils;
var _isDynamic = isDynamic;
var _parseRelativeUrl = parseRelativeUrl$1;
var _querystring = querystring$1;
var _resolveRewrites = _interop_require_default$2(resolveRewrites$1);
var _routeMatcher = routeMatcher;
var _routeRegex = routeRegex;
var _formatUrl = formatUrl$1;
var _detectDomainLocale = requireDetectDomainLocale();
var _parsePath = parsePath$1;
var _addLocale = addLocaleExports;
var _removeLocale = removeLocaleExports;
var _removeBasePath = removeBasePathExports;
var _addBasePath = addBasePathExports;
var _hasBasePath = hasBasePathExports;
var _getNextPathnameInfo = getNextPathnameInfo$1;
var _formatNextPathnameInfo = formatNextPathnameInfo$1;
var _compareStates = compareStates;
var _isBot = isBot$1;
function buildCancellationError() {
    return Object.assign(new Error('Route Cancelled'), {
        cancelled: true
    });
}
function matchesMiddleware(options) {
    return _matchesMiddleware.apply(this, arguments);
}
function _matchesMiddleware() {
    _matchesMiddleware = _async_to_generator(function*(options) {
        const matchers = yield Promise.resolve(options.router.pageLoader.getMiddleware());
        if (!matchers) return false;
        const { pathname: asPathname  } = (_parsePath).parsePath(options.asPath);
        // remove basePath first since path prefix has to be in the order of `/${basePath}/${locale}`
        const cleanedAs = (_hasBasePath).hasBasePath(asPathname) ? (_removeBasePath).removeBasePath(asPathname) : asPathname;
        const asWithBasePathAndLocale = (_addBasePath).addBasePath((_addLocale).addLocale(cleanedAs, options.locale));
        // Check only path match on client. Matching "has" should be done on server
        // where we can access more info such as headers, HttpOnly cookie, etc.
        return matchers.some((m)=>new RegExp(m.regexp).test(asWithBasePathAndLocale));
    });
    return _matchesMiddleware.apply(this, arguments);
}
function stripOrigin(url) {
    const origin = (_utils).getLocationOrigin();
    return url.startsWith(origin) ? url.substring(origin.length) : url;
}
function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key)=>{
        if (!keys.includes(key)) {
            omitted[key] = object[key];
        }
    });
    return omitted;
}
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(_utils).isAbsoluteUrl(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils).getLocationOrigin();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasBasePath).hasBasePath(resolved.pathname);
    } catch (_) {
        return false;
    }
}
function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = '';
    const dynamicRegex = (_routeRegex).getRouteRegex(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = // Try to match the dynamic route against the asPath
    (asPathname !== route ? (_routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
    // TODO: should this take priority; also need to change in the router.
    query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param)=>{
        let value = dynamicMatches[param] || '';
        const { repeat , optional  } = dynamicGroups[param];
        // support single-level catch-all
        // TODO: more robust handling for user-error (passing `/`)
        let replaced = `[${repeat ? '...' : ''}${param}]`;
        if (optional) {
            replaced = `${!value ? '/' : ''}[${replaced}]`;
        }
        if (repeat && !Array.isArray(value)) value = [
            value
        ];
        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(// these values should be fully encoded instead of just
        // path delimiter escaped since they are being inserted
        // into the URL and we expect URL encoded segments
        // when parsing dynamic route params
        (segment)=>encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
    })) {
        interpolatedRoute = '' // did not satisfy all requirements
        ;
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
    }
    return {
        params,
        result: interpolatedRoute
    };
}
function resolveHref(router, href, resolveAs) {
    // we use a dummy base url for relative urls
    let base;
    let urlAsString = typeof href === 'string' ? href : (_formatUrl).formatWithValidation(href);
    // repeated slashes and backslashes in the URL are considered
    // invalid and will never match a Next.js page/file
    const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split('?');
    if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
        console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
        const normalizedUrl = (_utils).normalizeRepeatedSlashes(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
    }
    // Return because it cannot be routed by the Next.js router
    if (!isLocalURL(urlAsString)) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
    try {
        base = new URL(urlAsString.startsWith('#') ? router.asPath : router.pathname, 'http://n');
    } catch (_) {
        // fallback to / for invalid asPath values e.g. //
        base = new URL('/', 'http://n');
    }
    try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
        let interpolatedAs = '';
        if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
            const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
            const { result , params  } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);
            if (result) {
                interpolatedAs = (0, _formatUrl).formatWithValidation({
                    pathname: result,
                    hash: finalUrl.hash,
                    query: omit(query, params)
                });
            }
        }
        // if the origin didn't change, it means we received a relative href
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
            resolvedHref,
            interpolatedAs || resolvedHref
        ] : resolvedHref;
    } catch (_1) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
}
function prepareUrlAs(router, url, as) {
    // If url and as provided as an object representation,
    // we'll format them into the string version here.
    let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
    const origin = (_utils).getLocationOrigin();
    const hrefHadOrigin = resolvedHref.startsWith(origin);
    const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
    resolvedHref = stripOrigin(resolvedHref);
    resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
    const preparedUrl = hrefHadOrigin ? resolvedHref : (_addBasePath).addBasePath(resolvedHref);
    const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
    return {
        url: preparedUrl,
        as: asHadOrigin ? preparedAs : (_addBasePath).addBasePath(preparedAs)
    };
}
function resolveDynamicRoute(pathname, pages) {
    const cleanPathname = (_removeTrailingSlash).removeTrailingSlash((_denormalizePagePath).denormalizePagePath(pathname));
    if (cleanPathname === '/404' || cleanPathname === '/_error') {
        return pathname;
    }
    // handle resolving href for dynamic routes
    if (!pages.includes(cleanPathname)) {
        // eslint-disable-next-line array-callback-return
        pages.some((page)=>{
            if ((_isDynamic).isDynamicRoute(page) && (_routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
                pathname = page;
                return true;
            }
        });
    }
    return (_removeTrailingSlash).removeTrailingSlash(pathname);
}
function getMiddlewareData(source, response, options) {
    const nextConfig = {
        basePath: options.router.basePath,
        i18n: {
            locales: options.router.locales
        },
        trailingSlash: Boolean(process.env.__NEXT_TRAILING_SLASH)
    };
    const rewriteHeader = response.headers.get('x-nextjs-rewrite');
    let rewriteTarget = rewriteHeader || response.headers.get('x-nextjs-matched-path');
    const matchedPath = response.headers.get('x-matched-path');
    if (matchedPath && !rewriteTarget && !matchedPath.includes('__next_data_catchall') && !matchedPath.includes('/_error') && !matchedPath.includes('/404')) {
        // leverage x-matched-path to detect next.config.js rewrites
        rewriteTarget = matchedPath;
    }
    if (rewriteTarget) {
        if (rewriteTarget.startsWith('/')) {
            const parsedRewriteTarget = (_parseRelativeUrl).parseRelativeUrl(rewriteTarget);
            const pathnameInfo = (_getNextPathnameInfo).getNextPathnameInfo(parsedRewriteTarget.pathname, {
                nextConfig,
                parseData: true
            });
            let fsPathname = (_removeTrailingSlash).removeTrailingSlash(pathnameInfo.pathname);
            return Promise.all([
                options.router.pageLoader.getPageList(),
                (_routeLoader).getClientBuildManifest(), 
            ]).then(([pages, { __rewrites: rewrites  }])=>{
                let as = (_addLocale).addLocale(pathnameInfo.pathname, pathnameInfo.locale);
                if ((_isDynamic).isDynamicRoute(as) || !rewriteHeader && pages.includes((_normalizeLocalePath).normalizeLocalePath((_removeBasePath).removeBasePath(as), options.router.locales).pathname)) {
                    const parsedSource = (_getNextPathnameInfo).getNextPathnameInfo((_parseRelativeUrl).parseRelativeUrl(source).pathname, {
                        parseData: true
                    });
                    as = (_addBasePath).addBasePath(parsedSource.pathname);
                    parsedRewriteTarget.pathname = as;
                }
                if (process.env.__NEXT_HAS_REWRITES) {
                    const result = (_resolveRewrites).default(as, pages, rewrites, parsedRewriteTarget.query, (path)=>resolveDynamicRoute(path, pages), options.router.locales);
                    if (result.matchedPage) {
                        parsedRewriteTarget.pathname = result.parsedAs.pathname;
                        as = parsedRewriteTarget.pathname;
                        Object.assign(parsedRewriteTarget.query, result.parsedAs.query);
                    }
                } else if (!pages.includes(fsPathname)) {
                    const resolvedPathname = resolveDynamicRoute(fsPathname, pages);
                    if (resolvedPathname !== fsPathname) {
                        fsPathname = resolvedPathname;
                    }
                }
                const resolvedHref = !pages.includes(fsPathname) ? resolveDynamicRoute((_normalizeLocalePath).normalizeLocalePath((_removeBasePath).removeBasePath(parsedRewriteTarget.pathname), options.router.locales).pathname, pages) : fsPathname;
                if ((_isDynamic).isDynamicRoute(resolvedHref)) {
                    const matches = (_routeMatcher).getRouteMatcher((_routeRegex).getRouteRegex(resolvedHref))(as);
                    Object.assign(parsedRewriteTarget.query, matches || {});
                }
                return {
                    type: 'rewrite',
                    parsedAs: parsedRewriteTarget,
                    resolvedHref
                };
            });
        }
        const src = (_parsePath).parsePath(source);
        const pathname = (_formatNextPathnameInfo).formatNextPathnameInfo(_extends({}, (_getNextPathnameInfo).getNextPathnameInfo(src.pathname, {
            nextConfig,
            parseData: true
        }), {
            defaultLocale: options.router.defaultLocale,
            buildId: ''
        }));
        return Promise.resolve({
            type: 'redirect-external',
            destination: `${pathname}${src.query}${src.hash}`
        });
    }
    const redirectTarget = response.headers.get('x-nextjs-redirect');
    if (redirectTarget) {
        if (redirectTarget.startsWith('/')) {
            const src = (_parsePath).parsePath(redirectTarget);
            const pathname = (_formatNextPathnameInfo).formatNextPathnameInfo(_extends({}, (_getNextPathnameInfo).getNextPathnameInfo(src.pathname, {
                nextConfig,
                parseData: true
            }), {
                defaultLocale: options.router.defaultLocale,
                buildId: ''
            }));
            return Promise.resolve({
                type: 'redirect-internal',
                newAs: `${pathname}${src.query}${src.hash}`,
                newUrl: `${pathname}${src.query}${src.hash}`
            });
        }
        return Promise.resolve({
            type: 'redirect-external',
            destination: redirectTarget
        });
    }
    return Promise.resolve({
        type: 'next'
    });
}
function withMiddlewareEffects(options) {
    return matchesMiddleware(options).then((matches)=>{
        if (matches && options.fetchData) {
            return options.fetchData().then((data)=>getMiddlewareData(data.dataHref, data.response, options).then((effect)=>({
                        dataHref: data.dataHref,
                        cacheKey: data.cacheKey,
                        json: data.json,
                        response: data.response,
                        text: data.text,
                        effect
                    }))).catch((_err)=>{
                /**
           * TODO: Revisit this in the future.
           * For now we will not consider middleware data errors to be fatal.
           * maybe we should revisit in the future.
           */ return null;
            });
        }
        return null;
    });
}
const manualScrollRestoration = process.env.__NEXT_SCROLL_RESTORATION && typeof window !== 'undefined' && 'scrollRestoration' in window.history && !!function() {
    try {
        let v = '__next';
        // eslint-disable-next-line no-sequences
        return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), true;
    } catch (n) {}
}();
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');
function fetchRetry(url, attempts, options) {
    return fetch(url, {
        // Cookies are required to be present for Next.js' SSG "Preview Mode".
        // Cookies may also be required for `getServerSideProps`.
        //
        // > `fetch` won’t send cookies, unless you set the credentials init
        // > option.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        //
        // > For maximum browser compatibility when it comes to sending &
        // > receiving cookies, always supply the `credentials: 'same-origin'`
        // > option instead of relying on the default.
        // https://github.com/github/fetch#caveats
        credentials: 'same-origin',
        method: options.method || 'GET',
        headers: Object.assign({}, options.headers, {
            'x-nextjs-data': '1'
        })
    }).then((response)=>{
        return !response.ok && attempts > 1 && response.status >= 500 ? fetchRetry(url, attempts - 1, options) : response;
    });
}
const backgroundCache = {};
function handleSmoothScroll(fn) {
    const htmlElement = document.documentElement;
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    fn();
    htmlElement.style.scrollBehavior = existing;
}
function tryToParseAsJSON(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return null;
    }
}
function fetchNextData({ dataHref , inflightCache , isPrefetch , hasMiddleware , isServerRender , parseJSON , persistCache , isBackground , unstable_skipClientCache  }) {
    const { href: cacheKey  } = new URL(dataHref, window.location.href);
    var ref1;
    const getData = (params)=>{
        return fetchRetry(dataHref, isServerRender ? 3 : 1, {
            headers: isPrefetch ? {
                purpose: 'prefetch'
            } : {},
            method: (ref1 = params == null ? void 0 : params.method) != null ? ref1 : 'GET'
        }).then((response)=>{
            if (response.ok && (params == null ? void 0 : params.method) === 'HEAD') {
                return {
                    dataHref,
                    response,
                    text: '',
                    json: {},
                    cacheKey
                };
            }
            return response.text().then((text)=>{
                if (!response.ok) {
                    /**
             * When the data response is a redirect because of a middleware
             * we do not consider it an error. The headers must bring the
             * mapped location.
             * TODO: Change the status code in the handler.
             */ if (hasMiddleware && [
                        301,
                        302,
                        307,
                        308
                    ].includes(response.status)) {
                        return {
                            dataHref,
                            response,
                            text,
                            json: {},
                            cacheKey
                        };
                    }
                    if (!hasMiddleware && response.status === 404) {
                        var ref;
                        if ((ref = tryToParseAsJSON(text)) == null ? void 0 : ref.notFound) {
                            return {
                                dataHref,
                                json: {
                                    notFound: SSG_DATA_NOT_FOUND
                                },
                                response,
                                text,
                                cacheKey
                            };
                        }
                    }
                    const error = new Error(`Failed to load static props`);
                    /**
             * We should only trigger a server-side transition if this was
             * caused on a client-side transition. Otherwise, we'd get into
             * an infinite loop.
             */ if (!isServerRender) {
                        (_routeLoader).markAssetError(error);
                    }
                    throw error;
                }
                return {
                    dataHref,
                    json: parseJSON ? tryToParseAsJSON(text) : null,
                    response,
                    text,
                    cacheKey
                };
            });
        }).then((data)=>{
            if (!persistCache || process.env.NODE_ENV !== 'production' || data.response.headers.get('x-middleware-cache') === 'no-cache') {
                delete inflightCache[cacheKey];
            }
            return data;
        }).catch((err)=>{
            delete inflightCache[cacheKey];
            throw err;
        });
    };
    // when skipping client cache we wait to update
    // inflight cache until successful data response
    // this allows racing click event with fetching newer data
    // without blocking navigation when stale data is available
    if (unstable_skipClientCache && persistCache) {
        return getData({}).then((data)=>{
            inflightCache[cacheKey] = Promise.resolve(data);
            return data;
        });
    }
    if (inflightCache[cacheKey] !== undefined) {
        return inflightCache[cacheKey];
    }
    return inflightCache[cacheKey] = getData(isBackground ? {
        method: 'HEAD'
    } : {});
}
function createKey() {
    return Math.random().toString(36).slice(2, 10);
}
function handleHardNavigation({ url , router  }) {
    // ensure we don't trigger a hard navigation to the same
    // URL as this can end up with an infinite refresh
    if (url === (_addBasePath).addBasePath((_addLocale).addLocale(router.asPath, router.locale))) {
        throw new Error(`Invariant: attempted to hard navigate to the same URL ${url} ${location.href}`);
    }
    window.location.href = url;
}
const getCancelledHandler = ({ route , router  })=>{
    let cancelled = false;
    const cancel = router.clc = ()=>{
        cancelled = true;
    };
    const handleCancelled = ()=>{
        if (cancelled) {
            const error = new Error(`Abort fetching component for route: "${route}"`);
            error.cancelled = true;
            throw error;
        }
        if (cancel === router.clc) {
            router.clc = null;
        }
    };
    return handleCancelled;
};
class Router {
    reload() {
        window.location.reload();
    }
    /**
   * Go back in history
   */ back() {
        window.history.back();
    }
    /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ push(url, as, options = {}) {
        if (process.env.__NEXT_SCROLL_RESTORATION) {
            // TODO: remove in the future when we update history before route change
            // is complete, as the popstate event should handle this capture.
            if (manualScrollRestoration) {
                try {
                    // Snapshot scroll position right before navigating to a new page:
                    sessionStorage.setItem('__next_scroll_' + this._key, JSON.stringify({
                        x: self.pageXOffset,
                        y: self.pageYOffset
                    }));
                } catch (e) {}
            }
        }
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change('pushState', url, as, options);
    }
    /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ replace(url, as, options = {}) {
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change('replaceState', url, as, options);
    }
    change(method, url, as, options, forcedScroll) {
        var _this = this;
        return _async_to_generator(function*() {
            if (!isLocalURL(url)) {
                handleHardNavigation({
                    url,
                    router: _this
                });
                return false;
            }
            // WARNING: `_h` is an internal option for handing Next.js client-side
            // hydration. Your app should _never_ use this property. It may change at
            // any time without notice.
            const isQueryUpdating = options._h;
            const shouldResolveHref = isQueryUpdating || options._shouldResolveHref || (_parsePath).parsePath(url).pathname === (_parsePath).parsePath(as).pathname;
            const nextState = _extends({}, _this.state);
            // for static pages with query params in the URL we delay
            // marking the router ready until after the query is updated
            // or a navigation has occurred
            const readyStateChange = _this.isReady !== true;
            _this.isReady = true;
            const isSsr = _this.isSsr;
            if (!isQueryUpdating) {
                _this.isSsr = false;
            }
            // if a route transition is already in progress before
            // the query updating is triggered ignore query updating
            if (isQueryUpdating && _this.clc) {
                return false;
            }
            const prevLocale = nextState.locale;
            if (process.env.__NEXT_I18N_SUPPORT) {
                nextState.locale = options.locale === false ? _this.defaultLocale : options.locale || nextState.locale;
                if (typeof options.locale === 'undefined') {
                    options.locale = nextState.locale;
                }
                const parsedAs = (_parseRelativeUrl).parseRelativeUrl((_hasBasePath).hasBasePath(as) ? (_removeBasePath).removeBasePath(as) : as);
                const localePathResult = (_normalizeLocalePath).normalizeLocalePath(parsedAs.pathname, _this.locales);
                if (localePathResult.detectedLocale) {
                    nextState.locale = localePathResult.detectedLocale;
                    parsedAs.pathname = (_addBasePath).addBasePath(parsedAs.pathname);
                    as = (_formatUrl).formatWithValidation(parsedAs);
                    url = (_addBasePath).addBasePath((_normalizeLocalePath).normalizeLocalePath((_hasBasePath).hasBasePath(url) ? (_removeBasePath).removeBasePath(url) : url, _this.locales).pathname);
                }
                let didNavigate = false;
                // we need to wrap this in the env check again since regenerator runtime
                // moves this on its own due to the return
                if (process.env.__NEXT_I18N_SUPPORT) {
                    var ref;
                    // if the locale isn't configured hard navigate to show 404 page
                    if (!((ref = _this.locales) == null ? void 0 : ref.includes(nextState.locale))) {
                        parsedAs.pathname = (_addLocale).addLocale(parsedAs.pathname, nextState.locale);
                        handleHardNavigation({
                            url: (_formatUrl).formatWithValidation(parsedAs),
                            router: _this
                        });
                        // this was previously a return but was removed in favor
                        // of better dead code elimination with regenerator runtime
                        didNavigate = true;
                    }
                }
                const detectedDomain = (_detectDomainLocale).detectDomainLocale(_this.domainLocales, undefined, nextState.locale);
                // we need to wrap this in the env check again since regenerator runtime
                // moves this on its own due to the return
                if (process.env.__NEXT_I18N_SUPPORT) {
                    // if we are navigating to a domain locale ensure we redirect to the
                    // correct domain
                    if (!didNavigate && detectedDomain && _this.isLocaleDomain && self.location.hostname !== detectedDomain.domain) {
                        const asNoBasePath = (_removeBasePath).removeBasePath(as);
                        handleHardNavigation({
                            url: `http${detectedDomain.http ? '' : 's'}://${detectedDomain.domain}${(_addBasePath).addBasePath(`${nextState.locale === detectedDomain.defaultLocale ? '' : `/${nextState.locale}`}${asNoBasePath === '/' ? '' : asNoBasePath}` || '/')}`,
                            router: _this
                        });
                        // this was previously a return but was removed in favor
                        // of better dead code elimination with regenerator runtime
                        didNavigate = true;
                    }
                }
                if (didNavigate) {
                    return new Promise(()=>{});
                }
            }
            // marking route changes as a navigation start entry
            if (_utils.ST) {
                performance.mark('routeChange');
            }
            const { shallow =false , scroll =true  } = options;
            const routeProps = {
                shallow
            };
            if (_this._inFlightRoute && _this.clc) {
                if (!isSsr) {
                    Router.events.emit('routeChangeError', buildCancellationError(), _this._inFlightRoute, routeProps);
                }
                _this.clc();
                _this.clc = null;
            }
            as = (_addBasePath).addBasePath((_addLocale).addLocale((_hasBasePath).hasBasePath(as) ? (_removeBasePath).removeBasePath(as) : as, options.locale, _this.defaultLocale));
            const cleanedAs = (_removeLocale).removeLocale((_hasBasePath).hasBasePath(as) ? (_removeBasePath).removeBasePath(as) : as, nextState.locale);
            _this._inFlightRoute = as;
            const localeChange = prevLocale !== nextState.locale;
            // If the url change is only related to a hash change
            // We should not proceed. We should only change the state.
            if (!isQueryUpdating && _this.onlyAHashChange(cleanedAs) && !localeChange) {
                nextState.asPath = cleanedAs;
                Router.events.emit('hashChangeStart', as, routeProps);
                // TODO: do we need the resolved href when only a hash change?
                _this.changeState(method, url, as, _extends({}, options, {
                    scroll: false
                }));
                if (scroll) {
                    _this.scrollToHash(cleanedAs);
                }
                try {
                    yield _this.set(nextState, _this.components[nextState.route], null);
                } catch (err) {
                    if ((_isError).default(err) && err.cancelled) {
                        Router.events.emit('routeChangeError', err, cleanedAs, routeProps);
                    }
                    throw err;
                }
                Router.events.emit('hashChangeComplete', as, routeProps);
                return true;
            }
            let parsed = (_parseRelativeUrl).parseRelativeUrl(url);
            let { pathname , query  } = parsed;
            // The build manifest needs to be loaded before auto-static dynamic pages
            // get their query parameters to allow ensuring they can be parsed properly
            // when rewritten to
            let pages, rewrites;
            try {
                [pages, { __rewrites: rewrites  }] = yield Promise.all([
                    _this.pageLoader.getPageList(),
                    (0, _routeLoader).getClientBuildManifest(),
                    _this.pageLoader.getMiddleware(), 
                ]);
            } catch (err) {
                // If we fail to resolve the page list or client-build manifest, we must
                // do a server-side transition:
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                return false;
            }
            // If asked to change the current URL we should reload the current page
            // (not location.reload() but reload getInitialProps and other Next.js stuffs)
            // We also need to set the method = replaceState always
            // as this should not go into the history (That's how browsers work)
            // We should compare the new asPath to the current asPath, not the url
            if (!_this.urlIsNew(cleanedAs) && !localeChange) {
                method = 'replaceState';
            }
            // we need to resolve the as value using rewrites for dynamic SSG
            // pages to allow building the data URL correctly
            let resolvedAs = as;
            // url and as should always be prefixed with basePath by this
            // point by either next/link or router.push/replace so strip the
            // basePath from the pathname to match the pages dir 1-to-1
            pathname = pathname ? (_removeTrailingSlash).removeTrailingSlash((_removeBasePath).removeBasePath(pathname)) : pathname;
            // we don't attempt resolve asPath when we need to execute
            // middleware as the resolving will occur server-side
            const isMiddlewareMatch = yield matchesMiddleware({
                asPath: as,
                locale: nextState.locale,
                router: _this
            });
            if (options.shallow && isMiddlewareMatch) {
                pathname = _this.pathname;
            }
            if (shouldResolveHref && pathname !== '/_error') {
                options._shouldResolveHref = true;
                if (process.env.__NEXT_HAS_REWRITES && as.startsWith('/')) {
                    const rewritesResult = (_resolveRewrites).default((_addBasePath).addBasePath((_addLocale).addLocale(cleanedAs, nextState.locale), true), pages, rewrites, query, (p)=>resolveDynamicRoute(p, pages), _this.locales);
                    if (rewritesResult.externalDest) {
                        handleHardNavigation({
                            url: as,
                            router: _this
                        });
                        return true;
                    }
                    if (!isMiddlewareMatch) {
                        resolvedAs = rewritesResult.asPath;
                    }
                    if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
                        // if this directly matches a page we need to update the href to
                        // allow the correct page chunk to be loaded
                        pathname = rewritesResult.resolvedHref;
                        parsed.pathname = (_addBasePath).addBasePath(pathname);
                        if (!isMiddlewareMatch) {
                            url = (_formatUrl).formatWithValidation(parsed);
                        }
                    }
                } else {
                    parsed.pathname = resolveDynamicRoute(pathname, pages);
                    if (parsed.pathname !== pathname) {
                        pathname = parsed.pathname;
                        parsed.pathname = (_addBasePath).addBasePath(pathname);
                        if (!isMiddlewareMatch) {
                            url = (_formatUrl).formatWithValidation(parsed);
                        }
                    }
                }
            }
            if (!isLocalURL(as)) {
                if (process.env.NODE_ENV !== 'production') {
                    throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`);
                }
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                return false;
            }
            resolvedAs = (_removeLocale).removeLocale((_removeBasePath).removeBasePath(resolvedAs), nextState.locale);
            let route = (_removeTrailingSlash).removeTrailingSlash(pathname);
            let routeMatch = false;
            if ((_isDynamic).isDynamicRoute(route)) {
                const parsedAs = (_parseRelativeUrl).parseRelativeUrl(resolvedAs);
                const asPathname = parsedAs.pathname;
                const routeRegex = (_routeRegex).getRouteRegex(route);
                routeMatch = (_routeMatcher).getRouteMatcher(routeRegex)(asPathname);
                const shouldInterpolate = route === asPathname;
                const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};
                if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
                    const missingParams = Object.keys(routeRegex.groups).filter((param)=>!query[param]);
                    if (missingParams.length > 0 && !isMiddlewareMatch) {
                        if (process.env.NODE_ENV !== 'production') {
                            console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
                        }
                        throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
                    }
                } else if (shouldInterpolate) {
                    as = (_formatUrl).formatWithValidation(Object.assign({}, parsedAs, {
                        pathname: interpolatedAs.result,
                        query: omit(query, interpolatedAs.params)
                    }));
                } else {
                    // Merge params into `query`, overwriting any specified in search
                    Object.assign(query, routeMatch);
                }
            }
            if (!isQueryUpdating) {
                Router.events.emit('routeChangeStart', as, routeProps);
            }
            try {
                var ref2, ref3;
                let routeInfo = yield _this.getRouteInfo({
                    route,
                    pathname,
                    query,
                    as,
                    resolvedAs,
                    routeProps,
                    locale: nextState.locale,
                    isPreview: nextState.isPreview,
                    hasMiddleware: isMiddlewareMatch
                });
                if ('route' in routeInfo && isMiddlewareMatch) {
                    pathname = routeInfo.route || route;
                    route = pathname;
                    if (!routeProps.shallow) {
                        query = Object.assign({}, routeInfo.query || {}, query);
                    }
                    const cleanedParsedPathname = (0, _hasBasePath).hasBasePath(parsed.pathname) ? (0, _removeBasePath).removeBasePath(parsed.pathname) : parsed.pathname;
                    if (routeMatch && pathname !== cleanedParsedPathname) {
                        Object.keys(routeMatch).forEach((key)=>{
                            if (routeMatch && query[key] === routeMatch[key]) {
                                delete query[key];
                            }
                        });
                    }
                    if ((0, _isDynamic).isDynamicRoute(pathname)) {
                        const prefixedAs = !routeProps.shallow && routeInfo.resolvedAs ? routeInfo.resolvedAs : (0, _addBasePath).addBasePath((0, _addLocale).addLocale(new URL(as, location.href).pathname, nextState.locale), true);
                        let rewriteAs = prefixedAs;
                        if ((0, _hasBasePath).hasBasePath(rewriteAs)) {
                            rewriteAs = (0, _removeBasePath).removeBasePath(rewriteAs);
                        }
                        if (process.env.__NEXT_I18N_SUPPORT) {
                            const localeResult = (0, _normalizeLocalePath).normalizeLocalePath(rewriteAs, _this.locales);
                            nextState.locale = localeResult.detectedLocale || nextState.locale;
                            rewriteAs = localeResult.pathname;
                        }
                        const routeRegex = (0, _routeRegex).getRouteRegex(pathname);
                        const curRouteMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(rewriteAs);
                        if (curRouteMatch) {
                            Object.assign(query, curRouteMatch);
                        }
                    }
                }
                // If the routeInfo brings a redirect we simply apply it.
                if ('type' in routeInfo) {
                    if (routeInfo.type === 'redirect-internal') {
                        return _this.change(method, routeInfo.newUrl, routeInfo.newAs, options);
                    } else {
                        handleHardNavigation({
                            url: routeInfo.destination,
                            router: _this
                        });
                        return new Promise(()=>{});
                    }
                }
                let { error , props , __N_SSG , __N_SSP  } = routeInfo;
                const component = routeInfo.Component;
                if (component && component.unstable_scriptLoader) {
                    const scripts = [].concat(component.unstable_scriptLoader());
                    scripts.forEach((script)=>{
                        (0, _script).handleClientScriptLoad(script.props);
                    });
                }
                // handle redirect on client-transition
                if ((__N_SSG || __N_SSP) && props) {
                    if (props.pageProps && props.pageProps.__N_REDIRECT) {
                        // Use the destination from redirect without adding locale
                        options.locale = false;
                        const destination = props.pageProps.__N_REDIRECT;
                        // check if destination is internal (resolves to a page) and attempt
                        // client-navigation if it is falling back to hard navigation if
                        // it's not
                        if (destination.startsWith('/') && props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
                            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
                            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
                            const { url: newUrl , as: newAs  } = prepareUrlAs(_this, destination, destination);
                            return _this.change(method, newUrl, newAs, options);
                        }
                        handleHardNavigation({
                            url: destination,
                            router: _this
                        });
                        return new Promise(()=>{});
                    }
                    nextState.isPreview = !!props.__N_PREVIEW;
                    // handle SSG data 404
                    if (props.notFound === SSG_DATA_NOT_FOUND) {
                        let notFoundRoute;
                        try {
                            yield _this.fetchComponent('/404');
                            notFoundRoute = '/404';
                        } catch (_) {
                            notFoundRoute = '/_error';
                        }
                        routeInfo = yield _this.getRouteInfo({
                            route: notFoundRoute,
                            pathname: notFoundRoute,
                            query,
                            as,
                            resolvedAs,
                            routeProps: {
                                shallow: false
                            },
                            locale: nextState.locale,
                            isPreview: nextState.isPreview
                        });
                        if ('type' in routeInfo) {
                            throw new Error(`Unexpected middleware effect on /404`);
                        }
                    }
                }
                Router.events.emit('beforeHistoryChange', as, routeProps);
                _this.changeState(method, url, as, options);
                if (isQueryUpdating && pathname === '/_error' && ((ref2 = self.__NEXT_DATA__.props) == null ? void 0 : (ref3 = ref2.pageProps) == null ? void 0 : ref3.statusCode) === 500 && (props == null ? void 0 : props.pageProps)) {
                    // ensure statusCode is still correct for static 500 page
                    // when updating query information
                    props.pageProps.statusCode = 500;
                }
                var _route;
                // shallow routing is only allowed for same page URL changes.
                const isValidShallowRoute = options.shallow && nextState.route === ((_route = routeInfo.route) != null ? _route : route);
                var _scroll;
                const shouldScroll = (_scroll = options.scroll) != null ? _scroll : !options._h && !isValidShallowRoute;
                const resetScroll = shouldScroll ? {
                    x: 0,
                    y: 0
                } : null;
                // the new state that the router gonna set
                const upcomingRouterState = _extends({}, nextState, {
                    route,
                    pathname,
                    query,
                    asPath: cleanedAs,
                    isFallback: false
                });
                const upcomingScrollState = forcedScroll != null ? forcedScroll : resetScroll;
                // for query updates we can skip it if the state is unchanged and we don't
                // need to scroll
                // https://github.com/vercel/next.js/issues/37139
                const canSkipUpdating = options._h && !upcomingScrollState && !readyStateChange && !localeChange && (0, _compareStates).compareRouterStates(upcomingRouterState, _this.state);
                if (!canSkipUpdating) {
                    yield _this.set(upcomingRouterState, routeInfo, upcomingScrollState).catch((e)=>{
                        if (e.cancelled) error = error || e;
                        else throw e;
                    });
                    if (error) {
                        if (!isQueryUpdating) {
                            Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
                        }
                        throw error;
                    }
                    if (process.env.__NEXT_I18N_SUPPORT) {
                        if (nextState.locale) {
                            document.documentElement.lang = nextState.locale;
                        }
                    }
                    if (!isQueryUpdating) {
                        Router.events.emit('routeChangeComplete', as, routeProps);
                    }
                    // A hash mark # is the optional last part of a URL
                    const hashRegex = /#.+$/;
                    if (shouldScroll && hashRegex.test(as)) {
                        _this.scrollToHash(as);
                    }
                }
                return true;
            } catch (err1) {
                if ((_isError).default(err1) && err1.cancelled) {
                    return false;
                }
                throw err1;
            }
        })();
    }
    changeState(method, url, as, options = {}) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof window.history === 'undefined') {
                console.error(`Warning: window.history is not available.`);
                return;
            }
            if (typeof window.history[method] === 'undefined') {
                console.error(`Warning: window.history.${method} is not available`);
                return;
            }
        }
        if (method !== 'pushState' || (_utils).getURL() !== as) {
            this._shallow = options.shallow;
            window.history[method]({
                url,
                as,
                options,
                __N: true,
                key: this._key = method !== 'pushState' ? this._key : createKey()
            }, // Most browsers currently ignores this parameter, although they may use it in the future.
            // Passing the empty string here should be safe against future changes to the method.
            // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
            '', as);
        }
    }
    handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
        var _this = this;
        return _async_to_generator(function*() {
            console.error(err);
            if (err.cancelled) {
                // bubble up cancellation errors
                throw err;
            }
            if ((_routeLoader).isAssetError(err) || loadErrorFail) {
                Router.events.emit('routeChangeError', err, as, routeProps);
                // If we can't load the page it could be one of following reasons
                //  1. Page doesn't exists
                //  2. Page does exist in a different zone
                //  3. Internal error while loading the page
                // So, doing a hard reload is the proper way to deal with this.
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                // Changing the URL doesn't block executing the current code path.
                // So let's throw a cancellation error stop the routing logic.
                throw buildCancellationError();
            }
            try {
                let props;
                const { page: Component , styleSheets  } = yield _this.fetchComponent('/_error');
                const routeInfo = {
                    props,
                    Component,
                    styleSheets,
                    err,
                    error: err
                };
                if (!routeInfo.props) {
                    try {
                        routeInfo.props = yield _this.getInitialProps(Component, {
                            err,
                            pathname,
                            query
                        });
                    } catch (gipErr) {
                        console.error('Error in error page `getInitialProps`: ', gipErr);
                        routeInfo.props = {};
                    }
                }
                return routeInfo;
            } catch (routeInfoErr) {
                return _this.handleRouteInfoError((_isError).default(routeInfoErr) ? routeInfoErr : new Error(routeInfoErr + ''), pathname, query, as, routeProps, true);
            }
        })();
    }
    getRouteInfo({ route: requestedRoute , pathname , query , as , resolvedAs , routeProps , locale , hasMiddleware , isPreview , unstable_skipClientCache  }) {
        var _this = this;
        return _async_to_generator(function*() {
            /**
     * This `route` binding can change if there's a rewrite
     * so we keep a reference to the original requested route
     * so we can store the cache for it and avoid re-requesting every time
     * for shallow routing purposes.
     */ let route = requestedRoute;
            try {
                var ref, ref4, ref5;
                const handleCancelled = getCancelledHandler({
                    route,
                    router: _this
                });
                let existingInfo = _this.components[route];
                if (routeProps.shallow && existingInfo && _this.route === route) {
                    return existingInfo;
                }
                if (hasMiddleware) {
                    existingInfo = undefined;
                }
                let cachedRouteInfo = existingInfo && !('initial' in existingInfo) && process.env.NODE_ENV !== 'development' ? existingInfo : undefined;
                const fetchNextDataParams = {
                    dataHref: _this.pageLoader.getDataHref({
                        href: (0, _formatUrl).formatWithValidation({
                            pathname,
                            query
                        }),
                        skipInterpolation: true,
                        asPath: resolvedAs,
                        locale
                    }),
                    hasMiddleware: true,
                    isServerRender: _this.isSsr,
                    parseJSON: true,
                    inflightCache: _this.sdc,
                    persistCache: !isPreview,
                    isPrefetch: false,
                    unstable_skipClientCache
                };
                const data = yield withMiddlewareEffects({
                    fetchData: ()=>fetchNextData(fetchNextDataParams),
                    asPath: resolvedAs,
                    locale: locale,
                    router: _this
                });
                handleCancelled();
                if ((data == null ? void 0 : (ref = data.effect) == null ? void 0 : ref.type) === 'redirect-internal' || (data == null ? void 0 : (ref4 = data.effect) == null ? void 0 : ref4.type) === 'redirect-external') {
                    return data.effect;
                }
                if ((data == null ? void 0 : (ref5 = data.effect) == null ? void 0 : ref5.type) === 'rewrite') {
                    route = (0, _removeTrailingSlash).removeTrailingSlash(data.effect.resolvedHref);
                    pathname = data.effect.resolvedHref;
                    query = _extends({}, query, data.effect.parsedAs.query);
                    resolvedAs = (0, _removeBasePath).removeBasePath((0, _normalizeLocalePath).normalizeLocalePath(data.effect.parsedAs.pathname, _this.locales).pathname);
                    // Check again the cache with the new destination.
                    existingInfo = _this.components[route];
                    if (routeProps.shallow && existingInfo && _this.route === route && !hasMiddleware) {
                        // If we have a match with the current route due to rewrite,
                        // we can copy the existing information to the rewritten one.
                        // Then, we return the information along with the matched route.
                        return _extends({}, existingInfo, {
                            route
                        });
                    }
                }
                if (route === '/api' || route.startsWith('/api/')) {
                    handleHardNavigation({
                        url: as,
                        router: _this
                    });
                    return new Promise(()=>{});
                }
                const routeInfo = cachedRouteInfo || (yield _this.fetchComponent(route).then((res)=>({
                        Component: res.page,
                        styleSheets: res.styleSheets,
                        __N_SSG: res.mod.__N_SSG,
                        __N_SSP: res.mod.__N_SSP
                    })));
                if (process.env.NODE_ENV !== 'production') {
                    const { isValidElementType  } = requireReactIs();
                    if (!isValidElementType(routeInfo.Component)) {
                        throw new Error(`The default export is not a React Component in page: "${pathname}"`);
                    }
                }
                const shouldFetchData = routeInfo.__N_SSG || routeInfo.__N_SSP;
                const { props , cacheKey  } = yield _this._getData(_async_to_generator(function*() {
                    if (shouldFetchData) {
                        const { json , cacheKey: _cacheKey  } = (data == null ? void 0 : data.json) ? data : yield fetchNextData({
                            dataHref: _this.pageLoader.getDataHref({
                                href: (0, _formatUrl).formatWithValidation({
                                    pathname,
                                    query
                                }),
                                asPath: resolvedAs,
                                locale
                            }),
                            isServerRender: _this.isSsr,
                            parseJSON: true,
                            inflightCache: _this.sdc,
                            persistCache: !isPreview,
                            isPrefetch: false,
                            unstable_skipClientCache
                        });
                        return {
                            cacheKey: _cacheKey,
                            props: json || {}
                        };
                    }
                    return {
                        headers: {},
                        cacheKey: '',
                        props: yield _this.getInitialProps(routeInfo.Component, // we provide AppTree later so this needs to be `any`
                        {
                            pathname,
                            query,
                            asPath: as,
                            locale,
                            locales: _this.locales,
                            defaultLocale: _this.defaultLocale
                        })
                    };
                }));
                // Only bust the data cache for SSP routes although
                // middleware can skip cache per request with
                // x-middleware-cache: no-cache as well
                if (routeInfo.__N_SSP && fetchNextDataParams.dataHref) {
                    delete _this.sdc[cacheKey];
                }
                // we kick off a HEAD request in the background
                // when a non-prefetch request is made to signal revalidation
                if (!_this.isPreview && routeInfo.__N_SSG && process.env.NODE_ENV !== 'development') {
                    fetchNextData(Object.assign({}, fetchNextDataParams, {
                        isBackground: true,
                        persistCache: false,
                        inflightCache: backgroundCache
                    })).catch(()=>{});
                }
                props.pageProps = Object.assign({}, props.pageProps);
                routeInfo.props = props;
                routeInfo.route = route;
                routeInfo.query = query;
                routeInfo.resolvedAs = resolvedAs;
                _this.components[route] = routeInfo;
                return routeInfo;
            } catch (err) {
                return _this.handleRouteInfoError((_isError).getProperError(err), pathname, query, as, routeProps);
            }
        })();
    }
    set(state, data, resetScroll) {
        this.state = state;
        return this.sub(data, this.components['/_app'].Component, resetScroll);
    }
    /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */ beforePopState(cb) {
        this._bps = cb;
    }
    onlyAHashChange(as) {
        if (!this.asPath) return false;
        const [oldUrlNoHash, oldHash] = this.asPath.split('#');
        const [newUrlNoHash, newHash] = as.split('#');
        // Makes sure we scroll to the provided hash if the url/hash are the same
        if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
            return true;
        }
        // If the urls are change, there's more than a hash change
        if (oldUrlNoHash !== newUrlNoHash) {
            return false;
        }
        // If the hash has changed, then it's a hash only change.
        // This check is necessary to handle both the enter and
        // leave hash === '' cases. The identity case falls through
        // and is treated as a next reload.
        return oldHash !== newHash;
    }
    scrollToHash(as) {
        const [, hash = ''] = as.split('#');
        // Scroll to top if the hash is just `#` with no value or `#top`
        // To mirror browsers
        if (hash === '' || hash === 'top') {
            handleSmoothScroll(()=>window.scrollTo(0, 0));
            return;
        }
        // Decode hash to make non-latin anchor works.
        const rawHash = decodeURIComponent(hash);
        // First we check if the element by id is found
        const idEl = document.getElementById(rawHash);
        if (idEl) {
            handleSmoothScroll(()=>idEl.scrollIntoView());
            return;
        }
        // If there's no element with the id, we check the `name` property
        // To mirror browsers
        const nameEl = document.getElementsByName(rawHash)[0];
        if (nameEl) {
            handleSmoothScroll(()=>nameEl.scrollIntoView());
        }
    }
    urlIsNew(asPath) {
        return this.asPath !== asPath;
    }
    /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */ prefetch(url, asPath = url, options = {}) {
        var _this = this;
        return _async_to_generator(function*() {
            if (typeof window !== 'undefined' && (_isBot).isBot(window.navigator.userAgent)) {
                // No prefetches for bots that render the link since they are typically navigating
                // links via the equivalent of a hard navigation and hence never utilize these
                // prefetches.
                return;
            }
            let parsed = (_parseRelativeUrl).parseRelativeUrl(url);
            let { pathname , query  } = parsed;
            if (process.env.__NEXT_I18N_SUPPORT) {
                if (options.locale === false) {
                    pathname = (_normalizeLocalePath).normalizeLocalePath(pathname, _this.locales).pathname;
                    parsed.pathname = pathname;
                    url = (_formatUrl).formatWithValidation(parsed);
                    let parsedAs = (_parseRelativeUrl).parseRelativeUrl(asPath);
                    const localePathResult = (_normalizeLocalePath).normalizeLocalePath(parsedAs.pathname, _this.locales);
                    parsedAs.pathname = localePathResult.pathname;
                    options.locale = localePathResult.detectedLocale || _this.defaultLocale;
                    asPath = (_formatUrl).formatWithValidation(parsedAs);
                }
            }
            const pages = yield _this.pageLoader.getPageList();
            let resolvedAs = asPath;
            const locale = typeof options.locale !== 'undefined' ? options.locale || undefined : _this.locale;
            if (process.env.__NEXT_HAS_REWRITES && asPath.startsWith('/')) {
                let rewrites;
                ({ __rewrites: rewrites  } = yield (_routeLoader).getClientBuildManifest());
                const rewritesResult = (_resolveRewrites).default((_addBasePath).addBasePath((_addLocale).addLocale(asPath, _this.locale), true), pages, rewrites, parsed.query, (p)=>resolveDynamicRoute(p, pages), _this.locales);
                if (rewritesResult.externalDest) {
                    return;
                }
                resolvedAs = (_removeLocale).removeLocale((_removeBasePath).removeBasePath(rewritesResult.asPath), _this.locale);
                if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
                    // if this directly matches a page we need to update the href to
                    // allow the correct page chunk to be loaded
                    pathname = rewritesResult.resolvedHref;
                    parsed.pathname = pathname;
                    url = (_formatUrl).formatWithValidation(parsed);
                }
            }
            parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);
            if ((_isDynamic).isDynamicRoute(parsed.pathname)) {
                pathname = parsed.pathname;
                parsed.pathname = pathname;
                Object.assign(query, (_routeMatcher).getRouteMatcher((_routeRegex).getRouteRegex(parsed.pathname))((_parsePath).parsePath(asPath).pathname) || {});
                url = (_formatUrl).formatWithValidation(parsed);
            }
            // Prefetch is not supported in development mode because it would trigger on-demand-entries
            if (process.env.NODE_ENV !== 'production') {
                return;
            }
            const route = (_removeTrailingSlash).removeTrailingSlash(pathname);
            yield Promise.all([
                _this.pageLoader._isSsg(route).then((isSsg)=>{
                    return isSsg ? fetchNextData({
                        dataHref: _this.pageLoader.getDataHref({
                            href: url,
                            asPath: resolvedAs,
                            locale: locale
                        }),
                        isServerRender: false,
                        parseJSON: true,
                        inflightCache: _this.sdc,
                        persistCache: !_this.isPreview,
                        isPrefetch: true,
                        unstable_skipClientCache: options.unstable_skipClientCache || options.priority && !!process.env.__NEXT_OPTIMISTIC_CLIENT_CACHE
                    }).then(()=>false) : false;
                }),
                _this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route), 
            ]);
        })();
    }
    fetchComponent(route) {
        var _this = this;
        return _async_to_generator(function*() {
            const handleCancelled = getCancelledHandler({
                route,
                router: _this
            });
            try {
                const componentResult = yield _this.pageLoader.loadPage(route);
                handleCancelled();
                return componentResult;
            } catch (err) {
                handleCancelled();
                throw err;
            }
        })();
    }
    _getData(fn) {
        let cancelled = false;
        const cancel = ()=>{
            cancelled = true;
        };
        this.clc = cancel;
        return fn().then((data)=>{
            if (cancel === this.clc) {
                this.clc = null;
            }
            if (cancelled) {
                const err = new Error('Loading initial props cancelled');
                err.cancelled = true;
                throw err;
            }
            return data;
        });
    }
    _getFlightData(dataHref) {
        // Do not cache RSC flight response since it's not a static resource
        return fetchNextData({
            dataHref,
            isServerRender: true,
            parseJSON: false,
            inflightCache: this.sdc,
            persistCache: false,
            isPrefetch: false
        }).then(({ text  })=>({
                data: text
            }));
    }
    getInitialProps(Component, ctx) {
        const { Component: App  } = this.components['/_app'];
        const AppTree = this._wrapApp(App);
        ctx.AppTree = AppTree;
        return (_utils).loadGetInitialProps(App, {
            AppTree,
            Component,
            router: this,
            ctx
        });
    }
    get route() {
        return this.state.route;
    }
    get pathname() {
        return this.state.pathname;
    }
    get query() {
        return this.state.query;
    }
    get asPath() {
        return this.state.asPath;
    }
    get locale() {
        return this.state.locale;
    }
    get isFallback() {
        return this.state.isFallback;
    }
    get isPreview() {
        return this.state.isPreview;
    }
    constructor(pathname1, query1, as1, { initialProps , pageLoader , App , wrapApp , Component , err , subscription , isFallback , locale , locales , defaultLocale , domainLocales , isPreview  }){
        // Server Data Cache
        this.sdc = {};
        this.isFirstPopStateEvent = true;
        this._key = createKey();
        this.onPopState = (e)=>{
            const { isFirstPopStateEvent  } = this;
            this.isFirstPopStateEvent = false;
            const state = e.state;
            if (!state) {
                // We get state as undefined for two reasons.
                //  1. With older safari (< 8) and older chrome (< 34)
                //  2. When the URL changed with #
                //
                // In the both cases, we don't need to proceed and change the route.
                // (as it's already changed)
                // But we can simply replace the state with the new changes.
                // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
                // So, doing the following for (1) does no harm.
                const { pathname , query  } = this;
                this.changeState('replaceState', (_formatUrl).formatWithValidation({
                    pathname: (_addBasePath).addBasePath(pathname),
                    query
                }), (_utils).getURL());
                return;
            }
            // __NA is used to identify if the history entry can be handled by the app-router.
            if (state.__NA) {
                window.location.reload();
                return;
            }
            if (!state.__N) {
                return;
            }
            // Safari fires popstateevent when reopening the browser.
            if (isFirstPopStateEvent && this.locale === state.options.locale && state.as === this.asPath) {
                return;
            }
            let forcedScroll;
            const { url , as , options , key  } = state;
            if (process.env.__NEXT_SCROLL_RESTORATION) {
                if (manualScrollRestoration) {
                    if (this._key !== key) {
                        // Snapshot current scroll position:
                        try {
                            sessionStorage.setItem('__next_scroll_' + this._key, JSON.stringify({
                                x: self.pageXOffset,
                                y: self.pageYOffset
                            }));
                        } catch (e) {}
                        // Restore old scroll position:
                        try {
                            const v = sessionStorage.getItem('__next_scroll_' + key);
                            forcedScroll = JSON.parse(v);
                        } catch (e1) {
                            forcedScroll = {
                                x: 0,
                                y: 0
                            };
                        }
                    }
                }
            }
            this._key = key;
            const { pathname  } = (_parseRelativeUrl).parseRelativeUrl(url);
            // Make sure we don't re-render on initial load,
            // can be caused by navigating back from an external site
            if (this.isSsr && as === (_addBasePath).addBasePath(this.asPath) && pathname === (_addBasePath).addBasePath(this.pathname)) {
                return;
            }
            // If the downstream application returns falsy, return.
            // They will then be responsible for handling the event.
            if (this._bps && !this._bps(state)) {
                return;
            }
            this.change('replaceState', url, as, Object.assign({}, options, {
                shallow: options.shallow && this._shallow,
                locale: options.locale || this.defaultLocale,
                // @ts-ignore internal value not exposed on types
                _h: 0
            }), forcedScroll);
        };
        // represents the current component key
        const route = (_removeTrailingSlash).removeTrailingSlash(pathname1);
        // set up the component cache (by route keys)
        this.components = {};
        // We should not keep the cache, if there's an error
        // Otherwise, this cause issues when when going back and
        // come again to the errored page.
        if (pathname1 !== '/_error') {
            this.components[route] = {
                Component,
                initial: true,
                props: initialProps,
                err,
                __N_SSG: initialProps && initialProps.__N_SSG,
                __N_SSP: initialProps && initialProps.__N_SSP
            };
        }
        this.components['/_app'] = {
            Component: App,
            styleSheets: []
        };
        // Backwards compat for Router.router.events
        // TODO: Should be remove the following major version as it was never documented
        this.events = Router.events;
        this.pageLoader = pageLoader;
        // if auto prerendered and dynamic route wait to update asPath
        // until after mount to prevent hydration mismatch
        const autoExportDynamic = (_isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;
        this.basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
        this.sub = subscription;
        this.clc = null;
        this._wrapApp = wrapApp;
        // make sure to ignore extra popState in safari on navigating
        // back from external site
        this.isSsr = true;
        this.isLocaleDomain = false;
        this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !process.env.__NEXT_HAS_REWRITES);
        if (process.env.__NEXT_I18N_SUPPORT) {
            this.locales = locales;
            this.defaultLocale = defaultLocale;
            this.domainLocales = domainLocales;
            this.isLocaleDomain = !!(_detectDomainLocale).detectDomainLocale(domainLocales, self.location.hostname);
        }
        this.state = {
            route,
            pathname: pathname1,
            query: query1,
            asPath: autoExportDynamic ? pathname1 : as1,
            isPreview: !!isPreview,
            locale: process.env.__NEXT_I18N_SUPPORT ? locale : undefined,
            isFallback
        };
        this._initialMatchesMiddlewarePromise = Promise.resolve(false);
        if (typeof window !== 'undefined') {
            // make sure "as" doesn't start with double slashes or else it can
            // throw an error as it's considered invalid
            if (!as1.startsWith('//')) {
                // in order for `e.state` to work on the `onpopstate` event
                // we have to register the initial route upon initialization
                const options = {
                    locale
                };
                const asPath = (_utils).getURL();
                this._initialMatchesMiddlewarePromise = matchesMiddleware({
                    router: this,
                    locale,
                    asPath
                }).then((matches)=>{
                    options._shouldResolveHref = as1 !== pathname1;
                    this.changeState('replaceState', matches ? asPath : (_formatUrl).formatWithValidation({
                        pathname: (_addBasePath).addBasePath(pathname1),
                        query: query1
                    }), asPath, options);
                    return matches;
                });
            }
            window.addEventListener('popstate', this.onPopState);
            // enable custom scroll restoration handling when available
            // otherwise fallback to browser's default handling
            if (process.env.__NEXT_SCROLL_RESTORATION) {
                if (manualScrollRestoration) {
                    window.history.scrollRestoration = 'manual';
                }
            }
        }
    }
}
Router.events = (_mitt).default();
router.default = Router;

var routerContext = {};

Object.defineProperty(routerContext, "__esModule", {
    value: true
});
routerContext.RouterContext = void 0;
var _interop_require_default$1 = _interop_require_default$4.default;
var _react$1 = _interop_require_default$1(reactExports);
const RouterContext = _react$1.default.createContext(null);
routerContext.RouterContext = RouterContext;
if (process.env.NODE_ENV !== 'production') {
    RouterContext.displayName = 'RouterContext';
}

var appRouterContext = {};

Object.defineProperty(appRouterContext, "__esModule", {
    value: true
});
appRouterContext.TemplateContext = appRouterContext.GlobalLayoutRouterContext = appRouterContext.LayoutRouterContext = appRouterContext.AppRouterContext = void 0;
var _interop_require_default = _interop_require_default$4.default;
var _react = _interop_require_default(reactExports);
const AppRouterContext = _react.default.createContext(null);
appRouterContext.AppRouterContext = AppRouterContext;
const LayoutRouterContext = _react.default.createContext(null);
appRouterContext.LayoutRouterContext = LayoutRouterContext;
const GlobalLayoutRouterContext = _react.default.createContext(null);
appRouterContext.GlobalLayoutRouterContext = GlobalLayoutRouterContext;
const TemplateContext = _react.default.createContext(null);
appRouterContext.TemplateContext = TemplateContext;
if (process.env.NODE_ENV !== 'production') {
    AppRouterContext.displayName = 'AppRouterContext';
    LayoutRouterContext.displayName = 'LayoutRouterContext';
    GlobalLayoutRouterContext.displayName = 'GlobalLayoutRouterContext';
    TemplateContext.displayName = 'TemplateContext';
}

var useIntersection = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.useIntersection = useIntersection;
	var _react = reactExports;
	var _requestIdleCallback = requestIdleCallbackExports;
	const hasIntersectionObserver = typeof IntersectionObserver === 'function';
	const observers = new Map();
	const idList = [];
	function createObserver(options) {
	    const id = {
	        root: options.root || null,
	        margin: options.rootMargin || ''
	    };
	    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
	    let instance;
	    if (existing) {
	        instance = observers.get(existing);
	        if (instance) {
	            return instance;
	        }
	    }
	    const elements = new Map();
	    const observer = new IntersectionObserver((entries)=>{
	        entries.forEach((entry)=>{
	            const callback = elements.get(entry.target);
	            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
	            if (callback && isVisible) {
	                callback(isVisible);
	            }
	        });
	    }, options);
	    instance = {
	        id,
	        observer,
	        elements
	    };
	    idList.push(id);
	    observers.set(id, instance);
	    return instance;
	}
	function observe(element, callback, options) {
	    const { id , observer , elements  } = createObserver(options);
	    elements.set(element, callback);
	    observer.observe(element);
	    return function unobserve() {
	        elements.delete(element);
	        observer.unobserve(element);
	        // Destroy observer when there's nothing left to watch:
	        if (elements.size === 0) {
	            observer.disconnect();
	            observers.delete(id);
	            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
	            if (index > -1) {
	                idList.splice(index, 1);
	            }
	        }
	    };
	}
	function useIntersection({ rootRef , rootMargin , disabled  }) {
	    const isDisabled = disabled || !hasIntersectionObserver;
	    const [visible, setVisible] = (_react).useState(false);
	    const [element, setElement] = (_react).useState(null);
	    (_react).useEffect(()=>{
	        if (hasIntersectionObserver) {
	            if (isDisabled || visible) return;
	            if (element && element.tagName) {
	                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
	                    root: rootRef == null ? void 0 : rootRef.current,
	                    rootMargin
	                });
	                return unobserve;
	            }
	        } else {
	            if (!visible) {
	                const idleCallback = (_requestIdleCallback).requestIdleCallback(()=>setVisible(true));
	                return ()=>(_requestIdleCallback).cancelIdleCallback(idleCallback);
	            }
	        }
	    }, [
	        element,
	        isDisabled,
	        rootMargin,
	        rootRef,
	        visible
	    ]);
	    const resetVisible = (_react).useCallback(()=>{
	        setVisible(false);
	    }, []);
	    return [
	        setElement,
	        visible,
	        resetVisible
	    ];
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (useIntersection, useIntersection.exports));

var useIntersectionExports = useIntersection.exports;

var getDomainLocale = {exports: {}};

var normalizeLocalePath = {exports: {}};

var hasRequiredNormalizeLocalePath;

function requireNormalizeLocalePath () {
	if (hasRequiredNormalizeLocalePath) return normalizeLocalePath.exports;
	hasRequiredNormalizeLocalePath = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		exports.normalizeLocalePath = void 0;
		const normalizeLocalePath = (pathname, locales)=>{
		    if (process.env.__NEXT_I18N_SUPPORT) {
		        return normalizeLocalePath$2.normalizeLocalePath(pathname, locales);
		    }
		    return {
		        pathname,
		        detectedLocale: undefined
		    };
		};
		exports.normalizeLocalePath = normalizeLocalePath;

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (normalizeLocalePath, normalizeLocalePath.exports));
	return normalizeLocalePath.exports;
}

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDomainLocale = getDomainLocale;
	const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
	function getDomainLocale(path, locale, locales, domainLocales) {
	    if (process.env.__NEXT_I18N_SUPPORT) {
	        const normalizeLocalePath = requireNormalizeLocalePath().normalizeLocalePath;
	        const detectDomainLocale = requireDetectDomainLocale().detectDomainLocale;
	        const target = locale || normalizeLocalePath(path, locales).detectedLocale;
	        const domain = detectDomainLocale(domainLocales, undefined, target);
	        if (domain) {
	            const proto = `http${domain.http ? '' : 's'}://`;
	            const finalLocale = target === domain.defaultLocale ? '' : `/${target}`;
	            return `${proto}${domain.domain}${basePath}${finalLocale}${path}`;
	        }
	        return false;
	    } else {
	        return false;
	    }
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (getDomainLocale, getDomainLocale.exports));

var getDomainLocaleExports = getDomainLocale.exports;

(function (module, exports) {
	"client";
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = void 0;
	var _interop_require_default = _interop_require_default$4.default;
	var _object_without_properties_loose$1 = _object_without_properties_loose.default;
	var _react = _interop_require_default(reactExports);
	var _router = router;
	var _addLocale = addLocaleExports;
	var _routerContext = routerContext;
	var _appRouterContext = appRouterContext;
	var _useIntersection = useIntersectionExports;
	var _getDomainLocale = getDomainLocaleExports;
	var _addBasePath = addBasePathExports;
	const prefetched = {};
	function prefetch(router, href, as, options) {
	    if (typeof window === 'undefined' || !router) return;
	    if (!(_router).isLocalURL(href)) return;
	    // Prefetch the JSON page if asked (only in the client)
	    // We need to handle a prefetch error here since we may be
	    // loading with priority which can reject but we don't
	    // want to force navigation since this is only a prefetch
	    Promise.resolve(router.prefetch(href, as, options)).catch((err)=>{
	        if (process.env.NODE_ENV !== 'production') {
	            // rethrow to show invalid URL errors
	            throw err;
	        }
	    });
	    const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale;
	    // Join on an invalid URI character
	    prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
	}
	function isModifiedEvent(event) {
	    const { target  } = event.currentTarget;
	    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
	}
	function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
	    const { nodeName  } = e.currentTarget;
	    // anchors inside an svg have a lowercase nodeName
	    const isAnchorNodeName = nodeName.toUpperCase() === 'A';
	    if (isAnchorNodeName && (isModifiedEvent(e) || !(_router).isLocalURL(href))) {
	        // ignore click for browser’s default behavior
	        return;
	    }
	    e.preventDefault();
	    const navigate = ()=>{
	        // If the router is an NextRouter instance it will have `beforePopState`
	        if ('beforePopState' in router) {
	            router[replace ? 'replace' : 'push'](href, as, {
	                shallow,
	                locale,
	                scroll
	            });
	        } else {
	            // If `beforePopState` doesn't exist on the router it's the AppRouter.
	            const method = replace ? 'replace' : 'push';
	            router[method](href, {
	                forceOptimisticNavigation: !prefetchEnabled
	            });
	        }
	    };
	    if (isAppRouter) {
	        // @ts-expect-error startTransition exists.
	        _react.default.startTransition(navigate);
	    } else {
	        navigate();
	    }
	}
	const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
	    if (process.env.NODE_ENV !== 'production') {
	        function createPropError(args) {
	            return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : ''));
	        }
	        // TypeScript trick for type-guarding:
	        const requiredPropsGuard = {
	            href: true
	        };
	        const requiredProps = Object.keys(requiredPropsGuard);
	        requiredProps.forEach((key)=>{
	            if (key === 'href') {
	                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
	                    throw createPropError({
	                        key,
	                        expected: '`string` or `object`',
	                        actual: props[key] === null ? 'null' : typeof props[key]
	                    });
	                }
	            }
	        });
	        // TypeScript trick for type-guarding:
	        const optionalPropsGuard = {
	            as: true,
	            replace: true,
	            scroll: true,
	            shallow: true,
	            passHref: true,
	            prefetch: true,
	            locale: true,
	            onClick: true,
	            onMouseEnter: true,
	            onTouchStart: true,
	            legacyBehavior: true
	        };
	        const optionalProps = Object.keys(optionalPropsGuard);
	        optionalProps.forEach((key)=>{
	            const valType = typeof props[key];
	            if (key === 'as') {
	                if (props[key] && valType !== 'string' && valType !== 'object') {
	                    throw createPropError({
	                        key,
	                        expected: '`string` or `object`',
	                        actual: valType
	                    });
	                }
	            } else if (key === 'locale') {
	                if (props[key] && valType !== 'string') {
	                    throw createPropError({
	                        key,
	                        expected: '`string`',
	                        actual: valType
	                    });
	                }
	            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart') {
	                if (props[key] && valType !== 'function') {
	                    throw createPropError({
	                        key,
	                        expected: '`function`',
	                        actual: valType
	                    });
	                }
	            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch' || key === 'legacyBehavior') {
	                if (props[key] != null && valType !== 'boolean') {
	                    throw createPropError({
	                        key,
	                        expected: '`boolean`',
	                        actual: valType
	                    });
	                }
	            } else ;
	        });
	        // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
	        // eslint-disable-next-line react-hooks/rules-of-hooks
	        const hasWarned = _react.default.useRef(false);
	        if (props.prefetch && !hasWarned.current) {
	            hasWarned.current = true;
	            console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
	        }
	    }
	    let children;
	    const { href: hrefProp , as: asProp , children: childrenProp , prefetch: prefetchProp , passHref , replace , shallow , scroll , locale , onClick , onMouseEnter , onTouchStart , legacyBehavior =Boolean(process.env.__NEXT_NEW_LINK_BEHAVIOR) !== true  } = props, restProps = _object_without_properties_loose$1(props, [
	        "href",
	        "as",
	        "children",
	        "prefetch",
	        "passHref",
	        "replace",
	        "shallow",
	        "scroll",
	        "locale",
	        "onClick",
	        "onMouseEnter",
	        "onTouchStart",
	        "legacyBehavior"
	    ]);
	    children = childrenProp;
	    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
	        children = /*#__PURE__*/ _react.default.createElement("a", null, children);
	    }
	    const p = prefetchProp !== false;
	    let router = _react.default.useContext(_routerContext.RouterContext);
	    // TODO-APP: type error. Remove `as any`
	    const appRouter = _react.default.useContext(_appRouterContext.AppRouterContext);
	    if (appRouter) {
	        router = appRouter;
	    }
	    const { href , as  } = _react.default.useMemo(()=>{
	        const [resolvedHref, resolvedAs] = (_router).resolveHref(router, hrefProp, true);
	        return {
	            href: resolvedHref,
	            as: asProp ? (_router).resolveHref(router, asProp) : resolvedAs || resolvedHref
	        };
	    }, [
	        router,
	        hrefProp,
	        asProp
	    ]);
	    const previousHref = _react.default.useRef(href);
	    const previousAs = _react.default.useRef(as);
	    // This will return the first child, if multiple are provided it will throw an error
	    let child;
	    if (legacyBehavior) {
	        if (process.env.NODE_ENV === 'development') {
	            if (onClick) {
	                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
	            }
	            if (onMouseEnter) {
	                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
	            }
	            try {
	                child = _react.default.Children.only(children);
	            } catch (err) {
	                if (!children) {
	                    throw new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`);
	                }
	                throw new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : ''));
	            }
	        } else {
	            child = _react.default.Children.only(children);
	        }
	    }
	    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
	    const [setIntersectionRef, isVisible, resetVisible] = (_useIntersection).useIntersection({
	        rootMargin: '200px'
	    });
	    const setRef = _react.default.useCallback((el)=>{
	        // Before the link getting observed, check if visible state need to be reset
	        if (previousAs.current !== as || previousHref.current !== href) {
	            resetVisible();
	            previousAs.current = as;
	            previousHref.current = href;
	        }
	        setIntersectionRef(el);
	        if (childRef) {
	            if (typeof childRef === 'function') childRef(el);
	            else if (typeof childRef === 'object') {
	                childRef.current = el;
	            }
	        }
	    }, [
	        as,
	        childRef,
	        href,
	        resetVisible,
	        setIntersectionRef
	    ]);
	    _react.default.useEffect(()=>{
	        const shouldPrefetch = isVisible && p && (_router).isLocalURL(href);
	        const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
	        const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];
	        if (shouldPrefetch && !isPrefetched) {
	            prefetch(router, href, as, {
	                locale: curLocale
	            });
	        }
	    }, [
	        as,
	        href,
	        isVisible,
	        locale,
	        p,
	        router
	    ]);
	    const childProps = {
	        ref: setRef,
	        onClick: (e)=>{
	            if (process.env.NODE_ENV !== 'production') {
	                if (!e) {
	                    throw new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`);
	                }
	            }
	            if (!legacyBehavior && typeof onClick === 'function') {
	                onClick(e);
	            }
	            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
	                child.props.onClick(e);
	            }
	            if (!e.defaultPrevented) {
	                linkClicked(e, router, href, as, replace, shallow, scroll, locale, Boolean(appRouter), p);
	            }
	        },
	        onMouseEnter: (e)=>{
	            if (!legacyBehavior && typeof onMouseEnter === 'function') {
	                onMouseEnter(e);
	            }
	            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
	                child.props.onMouseEnter(e);
	            }
	            // Check for not prefetch disabled in page using appRouter
	            if (!(!p && appRouter)) {
	                if ((_router).isLocalURL(href)) {
	                    prefetch(router, href, as, {
	                        priority: true
	                    });
	                }
	            }
	        },
	        onTouchStart: (e)=>{
	            if (!legacyBehavior && typeof onTouchStart === 'function') {
	                onTouchStart(e);
	            }
	            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
	                child.props.onTouchStart(e);
	            }
	            // Check for not prefetch disabled in page using appRouter
	            if (!(!p && appRouter)) {
	                if ((_router).isLocalURL(href)) {
	                    prefetch(router, href, as, {
	                        priority: true
	                    });
	                }
	            }
	        }
	    };
	    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
	    // defined, we specify the current 'href', so that repetition is not needed by the user
	    if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
	        const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
	        // we only render domain locales if we are currently on a domain locale
	        // so that locale links are still visitable in development/preview envs
	        const localeDomain = router && router.isLocaleDomain && (_getDomainLocale).getDomainLocale(as, curLocale, router.locales, router.domainLocales);
	        childProps.href = localeDomain || (_addBasePath).addBasePath((_addLocale).addLocale(as, curLocale, router && router.defaultLocale));
	    }
	    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ _react.default.createElement("a", Object.assign({}, restProps, childProps), children);
	});
	var _default = Link;
	exports.default = _default;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (link$1, link$1.exports));

var linkExports = link$1.exports;

var link = linkExports;

var Link = /*@__PURE__*/getDefaultExportFromCjs(link);

var styles = "@-webkit-keyframes slideInLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    visibility: visible;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n@keyframes slideInLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    visibility: visible;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n.wrapper {\n  margin-top: 13px;\n  font-size: 18px;\n  line-height: 21px;\n  font-family: \"Big Shoulders Text\";\n  color: #676565;\n  display: flex;\n  align-self: flex-start;\n}\n.wrapper .spliter {\n  padding: 0px 12px;\n}\n@media (max-width: 641px) {\n  .wrapper .spliter {\n    padding: 0px 3px;\n  }\n}\n@media (max-width: 641px) {\n  .wrapper {\n    font-size: 16px;\n    width: 100%;\n    margin-top: 15px;\n    margin-bottom: 5px;\n  }\n  .wrapper a:first-child {\n    padding-left: 5px;\n  }\n}\n.wrapper .wrapperLink {\n  display: flex;\n}";

var SubLink = function SubLink(_ref) {
  var data = _ref.data,
    _ref$wrapperStyle = _ref.wrapperStyle,
    wrapperStyle = _ref$wrapperStyle === void 0 ? {} : _ref$wrapperStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.wrapperLink, " ").concat(className),
      key: i
    }, /*#__PURE__*/React.createElement(Link, {
      href: item.url
    }, /*#__PURE__*/React.createElement("a", null, item.text)), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles.spliter
    }, '>'));
  }));
};

export { SubLink };
