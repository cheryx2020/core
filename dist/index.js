import React, { useState, useRef, useEffect, Component } from 'react';
import publicIp from 'public-ip';
import { ImageUploadable as ImageUploadable$1, gtag as gtag$1, MenuAddComponentPost as MenuAddComponentPost$1, POST_ITEM_TYPE as POST_ITEM_TYPE$1, AdminMenu as AdminMenu$1, PatternDetail as PatternDetail$1, YouTubeSubscribe as YouTubeSubscribe$1, POST_ITEM_TYPE_SUBMENU as POST_ITEM_TYPE_SUBMENU$1, ImageUpload as ImageUpload$1, PatternPreview as PatternPreview$1, PostVideo as PostVideo$1, RelatedToMenu as RelatedToMenu$1, AdBanner as AdBanner$1 } from '@cheryx2020/core';
import Linkify from 'linkify-react';

var styles$8 = {"wrapper":"Sublink-module_wrapper__v-n3q","spliter":"Sublink-module_spliter__j4x-a","wrapperLink":"Sublink-module_wrapperLink__Lozil"};

const SubLink = ({
  data,
  wrapperStyle = {},
  className = '',
  renderItem = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `${styles$8.wrapperLink} ${className}`,
      key: i
    }, renderItem(item), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles$8.spliter
    }, '>'));
  }));
};

var styles$7 = {"image":"ImageUploadable-module_image__B0Aq1","imageMenu":"ImageUploadable-module_imageMenu__KVFuF","resizer":"ImageUploadable-module_resizer__ccKdB","vertical":"ImageUploadable-module_vertical__cn5LW","horizontal":"ImageUploadable-module_horizontal__e9JwU"};

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

var utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if(!requestHeaders.getContentType(/^\s*multipart\/form-data/)){
        requestHeaders.setContentType('multipart/form-data'); // mobile/desktop app frameworks
      } else if(utils.isString(contentType = requestHeaders.getContentType())){
        // fix semicolon duplication issue for ReactNative FormData implementation
        requestHeaders.setContentType(contentType.replace(/^\s*(multipart\/form-data);+/, '$1'));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.5.1";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

// this module should only have a default export
var axios$1 = axios;

axios$1.interceptors.request.use(function (config) {
  try {
    if (typeof localStorage === 'object') {
      const token = localStorage.getItem('accessToken');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization =  'Bearer ' + token;
      }
    }
  } catch(e) {
  }
  return config;
});
const APIService = {
  post: (url, data, cf) => {
    return axios$1.post(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data, cf);
  },
  put: (url, data, cf) => {
    return axios$1.put(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data, cf);
  },
  get: (url) => {
    return axios$1.get(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`);
  },
  delete : (url, data) => {
    return axios$1.delete(`${process.env.NEXT_PUBLIC_apiBaseUrl}${url}`,data);
  }
};
/**
 * Handle api call error
 */
const handleApiError = (err, { callBackStatusCode, showAlert = true, callBackErrorMessage } = {}) => {
  let message = 'Unknow error';
  try {
    if (typeof callBackStatusCode === 'function') {
      callBackStatusCode(err.response.status);
    }
  } catch (e) { }
  if (err.response && err.response.data && err.response.data.error) {
    message = err.response.data.error;
  }
  if (typeof callBackErrorMessage === 'function') {
    callBackErrorMessage(message);
  }

  if (showAlert) {
    alert(message);
  }
};

/**
   * Check file size is bigger than size
   * @param {*} file file object
   * @param {*} size default is 500000 (value: 500000 for 500KB)
   */
  const isBigFile = (file, size = 500000) => {
    let result = false;
    if (file && file.size > 500000) {
      result = true;
    }
    return result;
  };

const removeAccents = str => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};
const readFile = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
/**
 * 
 * @param {*} file 
 * @param {*} localPath if exist, the file will be saved to local path
 */
const uploadFile = (file, localPath, hideAlert, fileName, requestAbsoluteUrlResponse) => {
  const bodyFormData = new FormData();
  bodyFormData.set('file', file);
  if (localPath) {
    bodyFormData.set('path', localPath);
  }
  if (fileName) {
    bodyFormData.set('fileName', fileName);
  }
  if (requestAbsoluteUrlResponse) {
    bodyFormData.set('requestAbsoluteUrlResponse', requestAbsoluteUrlResponse);
  }
  return new Promise((resolve, reject) => {
    APIService.post('upload-file', bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      console.log(res);
      // Handle upload file success
      if (res && res.data) {
        if (localPath) {
          resolve(`${res.data}`);
        } else {
          resolve(`https://drive.google.com/uc?export=view&id=${res.data.id}`);
        }
        if (!hideAlert) {
          alert('Tải hình thành công');
        }
      } else {
        reject('Tải ảnh không thành công');
      }
    }).catch(err => {
      handleApiError(err);
    });
  });
};

const SLACK_CHANNELS = {
  FREE_CRAFTPATTERNS: 'FREE_CRAFTPATTERNS'
};
const sendSlackMessage = async ({ channel = 'FREE_CRAFTPATTERNS', message = 'Text message' }) => {
  let ip = '', _message = message || '';
  try {
    ip = await publicIp.v4();
  } catch (e) {
    console.log(e);
  }  _message += `\\nIP Address: *${ip}*&ip=${ip}`;
  return APIService.get(`send-message-slack?channel=${channel}&message=${_message}`).then(() => {
    console.log('send-message-slack success');
  }).catch(err => {
    console.log('send-message-slack error');
  })
};

const ImageUploadable = ({
  width = 500,
  height = 333,
  src,
  onChangeImage = () => {},
  isAdmin,
  isAddNew,
  isEdit,
  wrapperStyle = {},
  className = '',
  onChangeStyle = () => {},
  resizeable = false
}) => {
  let defaultWrapperStyle = {
    width: isAddNew ? '100%' : {
      width
    },
    height: isAddNew ? '73%' : 'initial'
  };
  if (wrapperStyle.width) {
    width = wrapperStyle.width;
  }
  if (wrapperStyle.height) {
    height = wrapperStyle.height;
  }
  const [imgSrc, setImgSrc] = useState('');
  const imageWap = useRef(null);
  const image = useRef(null);
  useEffect(() => {
    if (typeof src === 'object' && src.name) {
      readFile(src).then(res => {
        setImgSrc(res);
      });
    } else {
      setImgSrc(src);
    }
  }, [src]);
  const onChange = async e => {
    // Check file size
    if (isBigFile(e?.target?.files[0])) {
      alert('Kích thước file không được vượt quá 500KB');
      return;
    }
    const {
      imgSrc,
      imgFile
    } = await new Promise(resolve => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve({
          imgSrc: reader.result,
          imgFile: e.target.files[0]
        });
      }, false);
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    });
    setImgSrc(imgSrc);
    onChangeImage({
      imgSrc,
      imgFile
    });
    return;
  };
  let startX, startY, startWidth, startHeight;
  const initDrag = e => {
    e.stopPropagation();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(imageWap.current).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(imageWap.current).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  };
  function doDrag(e) {
    imageWap.current.style.width = startWidth + e.clientX - startX + 'px';
    imageWap.current.style.height = startHeight + e.clientY - startY + 'px';
    image.current.style.width = startWidth + e.clientX - startX + 'px';
    image.current.style.height = startHeight + e.clientY - startY + 'px';
  }
  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    onChangeStyle({
      width: imageWap.current.style.width,
      height: imageWap.current.style.height
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: imageWap,
    className: `${styles$7.image} ${className}`,
    style: {
      ...defaultWrapperStyle,
      ...wrapperStyle
    }
  }, isAdmin && isEdit && /*#__PURE__*/React.createElement("div", {
    className: styles$7.imageMenu,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("div", null, "Choose Image"), /*#__PURE__*/React.createElement("input", {
    accept: "image/png, image/jpeg, image/svg+xml",
    hidden: true,
    type: "file",
    onChange: onChange
  }))), isEdit ? /*#__PURE__*/React.createElement("img", {
    ref: image,
    width: width,
    height: height,
    src: imgSrc != '' ? imgSrc : src,
    style: {
      width,
      height
    }
  }) : /*#__PURE__*/React.createElement("img", {
    alt: process.env.NEXT_PUBLIC_SEO_mainTitle,
    width: width,
    height: height,
    src: src
  }), isEdit && resizeable && /*#__PURE__*/React.createElement("div", {
    onDrag: e => {
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseDown: initDrag,
    className: styles$7.resizer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$7.vertical
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$7.horizontal
  })));
};

var styles$6 = {"editImageBtn":"ImageUpload-module_editImageBtn__WJjSq","menuImage":"ImageUpload-module_menuImage__Qkkfq","uploadButton":"ImageUpload-module_uploadButton__QCNEB","textarea":"ImageUpload-module_textarea__pbgpO","imgWrapper":"ImageUpload-module_imgWrapper__y6fHe","videoMenu":"ImageUpload-module_videoMenu__pMOzt","deleteButton":"ImageUpload-module_deleteButton__K4dVX"};

const ImageUpload = ({
  url,
  onChange = () => {},
  caption,
  onDragStart = () => {},
  onResize = () => {},
  width,
  height
}) => {
  const [showMenuImage, setShowMenuImage] = useState(false);
  const onMouseOut = e => {
    onResize({
      width: parseInt(e.target.style.width) || 0,
      height: parseInt(e.target.style.height) || 0
    });
  };
  const styleImage = {
    backgroundImage: `url('${url}')`
  };
  if (width) {
    styleImage.width = width;
  }
  if (height) {
    styleImage.height = height;
  }
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles$6.imgWrapper,
    style: {
      position: 'relative'
    }
  }, showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$6.menuImage
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.deleteButton,
    onClick: () => setShowMenuImage(false)
  }, "x"), /*#__PURE__*/React.createElement("label", {
    className: styles$6.uploadButton
  }, /*#__PURE__*/React.createElement("span", null, "Upload Image"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: e => {
      setShowMenuImage(false);
      onChange(e);
    }
  }))), !showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$6.editImageBtn,
    onClick: () => setShowMenuImage(true)
  }, "Edit"), /*#__PURE__*/React.createElement("textarea", {
    className: styles$6.textarea,
    onMouseOut: onMouseOut,
    disabled: true,
    style: {
      ...styleImage
    }
  }), caption);
};

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return /*#__PURE__*/React.createElement("ins", {
    className: "adsbygoogle adbanner-customize",
    style: {
      display: "block"
    },
    "data-ad-layout": "in-article",
    "data-ad-format": "fluid",
    "data-ad-client": "ca-pub-4179656549806780",
    "data-ad-slot": "9675079770"
  });
};

const PostVideo = ({
  text,
  url = 'vTJdVE_gjI0',
  onChange = () => {},
  onChangeText = () => {},
  onDragStart = () => {}
}) => {
  const [showMenuVideo, setShowMenuVideo] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles$6.imgWrapper
  }, showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$6.videoMenu
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.deleteButton,
    onClick: () => setShowMenuVideo(false)
  }, "x"), /*#__PURE__*/React.createElement("label", null, "Video Id:"), /*#__PURE__*/React.createElement("input", {
    value: url,
    onChange: e => onChange(e)
  })), /*#__PURE__*/React.createElement("iframe", {
    title: text,
    width: "560",
    height: "315",
    src: `https://www.youtube.com/embed/${url}`,
    frameBorder: 0,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  }), /*#__PURE__*/React.createElement("figcaption", {
    suppressContentEditableWarning: true,
    contentEditable: true,
    onBlur: onChangeText,
    className: styles$6.imageDescription,
    style: {
      minWidth: 100
    }
  }, text), !showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$6.editImageBtn,
    onClick: () => setShowMenuVideo(true)
  }, "Edit"));
};

class YouTubeSubscribe extends Component {
  static defaultProps = {
    channelName: "",
    channelid: "UCaYhcUwRBNscFNUKTjgPFiA",
    theme: "full",
    layout: "default",
    count: "default"
  };

  /**
   *  React.createRef to attach script after mount
   *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
   */

  constructor(props) {
    super(props);
    this.youtubeSubscribeNode = /*#__PURE__*/React.createRef();

    // To render components economically w/o repetition
    this.state = {
      initialized: false
    };
  }
  initialized() {
    this.setState({
      initialized: true
    });
  }

  /**
   * 1. Script for API doesn't work in index.html.
   * 2. So You have to make it after components render.
   * 3. Make a script with JavaScript method to work.
   * 4. It is a little slow to show component at first.
   * 5. YouTube API gives you channelId instead channelName
   *    So You don't have to think about channelName when you
   *    need its API.
   */

  componentDidMount() {
    if (this.state.initialized) {
      return;
    }

    // Make <script src="https://apis.google.com/js/platform.js" ></script>
    const youtubescript = document.createElement("script");
    youtubescript.src = "https://apis.google.com/js/platform.js";
    this.youtubeSubscribeNode.current.parentNode.appendChild(youtubescript);
    this.initialized();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.channelName === nextProps.channelName) {
  //     return false;
  //   }

  //   if (this.props.channelid === nextProps.channelid) {
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    const {
      theme,
      layout,
      count,
      channelName,
      channelid
    } = this.props;
    return /*#__PURE__*/React.createElement("section", {
      className: "youtubeSubscribe"
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.youtubeSubscribeNode,
      className: "g-ytsubscribe",
      "data-theme": theme,
      "data-layout": layout,
      "data-count": count,
      "data-channel": channelName,
      "data-channelid": channelid
    }));
  }
}

var styles$5 = {"wrapper":"PatternPreview-module_wrapper__rtoPF","image":"PatternPreview-module_image__jMSHM","info":"PatternPreview-module_info__pn5aE","previewUrl":"PatternPreview-module_previewUrl__ulKmu"};

const PatternPreview = ({
  isAdmin,
  onChange = () => {},
  index,
  imageUrl: _imageUrl,
  previewUrl: _previewUrl,
  buttonText = "Look inside the pattern",
  message = 'You can preview 3 pages of the knitting pattern!'
}) => {
  const [imageUrl, setImageUrl] = useState(_imageUrl);
  const [previewUrl, setPreviewUrl] = useState(_previewUrl);
  const onChangeBigImage = ({
    imgFile
  }) => {
    onChange(imgFile, index, 'imageUrl');
  };
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while (value == '') {
        value = prompt(`Nhập đường dẫn file pdf`, previewUrl);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value, index, key);
    }
  };
  useEffect(() => {
    setImageUrl(_imageUrl);
    setPreviewUrl(_previewUrl);
  }, [_imageUrl, _previewUrl]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$5.image
  }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
    width: '100%',
    height: '100%',
    wrapperStyle: {
      width: '100%',
      height: '100%',
      minWidth: '100%'
    },
    onChangeImage: onChangeBigImage,
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: imageUrl
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$5.info
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: previewUrl,
    onClick: e => onClickLink(e, 'previewUrl'),
    target: "_blank",
    className: styles$5.previewUrl
  }, buttonText), /*#__PURE__*/React.createElement("div", {
    contentEditable: isAdmin ? "true" : "false",
    onBlur: () => {}
  }, message)));
};

var styles$4 = {"adminMenuBtn":"MenuAddComponentPost-module_adminMenuBtn__GaIEv","adminMenu":"MenuAddComponentPost-module_adminMenu__Yw2pt","hidden":"MenuAddComponentPost-module_hidden__HLj-8","menuItem":"MenuAddComponentPost-module_menuItem__gHxYw","subMenu":"MenuAddComponentPost-module_subMenu__oZH07"};

const POST_ITEM_TYPE = {
  TITLE: 'title',
  BIG_HEADER: 'big-header',
  MEDIUM_HEADER: 'medium-header',
  SMALL_HEADER: 'small-header',
  PARAGRAPH: 'paragraph',
  RELATED_TOPIC: 'related-topic',
  SUBCRIBE_ME: 'subcribe-me',
  IMAGE: 'image',
  BUY_ME_A_COFFEE: 'buy-me-a-coffee',
  VIDEO: 'video',
  ADS: 'ads',
  PATTERN: 'pattern',
  PATTERN_PREVIEW: 'pattern_preview',
  GROUP: 'group'
};
const IMAGE_SUBMENU = {
  ONE_IMAGE: 'image',
  TWO_IMAGE: 'two_image',
  THREE_IMAGE: 'three_image'
};
const POST_ITEM_TYPE_SUBMENU = {
  IMAGE: [IMAGE_SUBMENU.ONE_IMAGE, IMAGE_SUBMENU.TWO_IMAGE, IMAGE_SUBMENU.THREE_IMAGE]
};
const MenuAddComponentPost = ({
  onClickMenuItem = () => {},
  btnClass = '',
  menuItems = []
}) => {
  const [hoverItem, setHoverItem] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const onMenuMouseOver = item => {
    setHoverItem(item);
  };
  const hasSubMenu = item => {
    return Array.isArray(POST_ITEM_TYPE_SUBMENU[item]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${styles$4.adminMenuBtn}${btnClass ? ' ' + btnClass : ''}`,
    onClick: () => {
      setShowMenu(!showMenu);
    }
  }, showMenu ? 'X' : 'Add', /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.adminMenu + ` ${!showMenu ? styles$4.hidden : ''}`
  }, Array.isArray(Object.keys(menuItems)) && menuItems.map((item, index) => /*#__PURE__*/React.createElement("div", {
    onMouseOver: () => onMenuMouseOver(item),
    className: styles$4.menuItem,
    key: index,
    onClick: e => {
      e.stopPropagation();
      !hasSubMenu(item) && onClickMenuItem(POST_ITEM_TYPE[item]);
      setShowMenu(false);
    }
  }, item, hasSubMenu(item) && hoverItem === item && /*#__PURE__*/React.createElement("div", {
    className: `${styles$4.adminMenu} ${styles$4.subMenu}`
  }, POST_ITEM_TYPE_SUBMENU[item].map((i, idx) => /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onClickMenuItem(i);
      setShowMenu(false);
    },
    className: styles$4.menuItem,
    key: idx
  }, i))))))));
};

const GA_TRACKING_ID = 'G-E1RDMRRT6L';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({
  action,
  category,
  label,
  value
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
var gtag = {
  GA_TRACKING_ID,
  pageview,
  event
};

var styles$3 = {"wrapper":"PatternDetail-module_wrapper__CFlmD","mainImage":"PatternDetail-module_mainImage__ac-c1","rightInfo":"PatternDetail-module_rightInfo__6J0eO","title":"PatternDetail-module_title__0IjOq","author":"PatternDetail-module_author__Xgx6J","storeInfo":"PatternDetail-module_storeInfo__IwaSl","blackCatWrapper":"PatternDetail-module_blackCatWrapper__cqlld","blackCat":"PatternDetail-module_blackCat__xwKnn","message":"PatternDetail-module_message__Wf-re","text":"PatternDetail-module_text__Whs4v","supperWrapperButton":"PatternDetail-module_supperWrapperButton__KF8fO","buttonWrapper":"PatternDetail-module_buttonWrapper__Z-n6q","priceWrapper":"PatternDetail-module_priceWrapper__7pvJH","price":"PatternDetail-module_price__JsXa9","payPalWrapper":"PatternDetail-module_payPalWrapper__C7Mpl","show":"PatternDetail-module_show__L4BBl","payPal":"PatternDetail-module_payPal__0QLxu","closeLink":"PatternDetail-module_closeLink__Xfvkv","linkStore":"PatternDetail-module_linkStore__gf5UQ","mb11":"PatternDetail-module_mb11__sNoEg","paypalButton":"PatternDetail-module_paypalButton__bUOF3","listSmallImage":"PatternDetail-module_listSmallImage__h5eyY","deleteButton":"PatternDetail-module_deleteButton__5oh8i","triangleLeft":"PatternDetail-module_triangleLeft__C0z45","triangleRight":"PatternDetail-module_triangleRight__krzev"};

const PatternDetail = ({
  name: _name,
  price: _price,
  ravelryUrl: _ravelryUrl = 'https://www.messenger.com/t/100004957155465',
  lovecraftsUrl: _lovecraftsUrl,
  bigImageUrl: _bigImageUrl,
  imageList: _imageList,
  isAdmin,
  onChange = () => {},
  index,
  noImageUrl = '/images/no-image.png'
}) => {
  const [imageList, setImageList] = useState([noImageUrl]);
  const [name, setName] = useState("Pattern name");
  const [bigImageFile, setBigImageFile] = useState(null);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [price, setPrice] = useState(_price);
  const [ravelryUrl, setRavelryUrl] = useState(_ravelryUrl || 'https://www.messenger.com/t/100004957155465');
  const [lovecraftsUrl, setLovecraftsUrl] = useState(_lovecraftsUrl);
  useState(false);
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while (value == '') {
        value = prompt(`Nhập đường dẫn tới tin nhắn riêng`);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value, index, key);
    } else {
      // Track
      gtag$1.event({
        action: "pattern_store_click",
        category: "engagement",
        label: "pattern_store_click",
        value: `${key} - ${name}`
      });
    }
  };
  useEffect(() => {
    setName(_name || "Pattern name");
    setPrice(_price || "Học phí: 100.000");
    setRavelryUrl(_ravelryUrl);
    setLovecraftsUrl(_lovecraftsUrl);
    if (Array.isArray(_imageList) && isAdmin && !_imageList.includes(noImageUrl)) {
      _imageList.push(noImageUrl);
    } else if (Array.isArray(_imageList) && !isAdmin && _imageList.includes(noImageUrl)) {
      const idx = _imageList.indexOf(noImageUrl);
      _imageList.splice(idx, 1);
      setImageList(_imageList);
    } else {
      setImageList(_imageList);
    }
    setBigImageUrl(_bigImageUrl);
  }, [_price, _name, _lovecraftsUrl, _ravelryUrl, _imageList, _bigImageUrl]);
  useEffect(() => {
    if (window.paypal && window.paypal.Buttons) {
      console.count('Render');
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            const {
              id
            } = details;
            // This function shows a transaction success message to your buyer.

            window.open(`https://api.cheryx.com/verify-order?order=${id}`);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);
  const onChangeBigImage = ({
    imgFile
  }) => {
    setBigImageFile(imgFile);
    onChange(imgFile, index, 'bigImageUrl');
  };
  const onChangeListImage = (imgFile, i) => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList[i] = imgFile;
      if (!_imageList.find(item => typeof item === 'string')) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList');
    }
  };
  const removeImage = i => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList.splice(i, 1);
      if (_imageList.length == 0) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.mainImage
  }, isAdmin ? /*#__PURE__*/React.createElement(ImageUploadable$1, {
    wrapperStyle: {
      width: '100%',
      height: '100%'
    },
    onChangeImage: onChangeBigImage,
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: bigImageUrl
  }) : /*#__PURE__*/React.createElement("img", {
    src: bigImageUrl
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$3.rightInfo
  }, /*#__PURE__*/React.createElement("h1", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'name'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$3.title
  }, name)), /*#__PURE__*/React.createElement("div", {
    className: styles$3.storeInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.blackCatWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.blackCat
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.message
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.text
  }, "Nh\u1EAFn tin cho m\xECnh \u0111\u1EC3 tham gia l\u1EDBp nh\xE9!")))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.supperWrapperButton
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.buttonWrapper
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: ravelryUrl,
    onClick: e => onClickLink(e, 'ravelryUrl'),
    target: "_blank",
    className: `${styles$3.linkStore}`
  }, "\u0110\u0103ng k\xED l\u1EDBp \u0111an th\xFA b\xF4ng online"))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.priceWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'price'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$3.price
  }, price), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleLeft
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleLeft
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.listSmallImage
  }, Array.isArray(imageList) && imageList.map((img, i) => isAdmin ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, i < imageList.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: styles$3.deleteButton,
    onClick: () => {
      removeImage(i);
    }
  }, "x"), /*#__PURE__*/React.createElement(ImageUploadable$1, {
    key: i,
    wrapperStyle: {
      width: '243px',
      height: '243px',
      marginRight: 15
    },
    onChangeImage: ({
      imgFile
    }) => {
      onChangeListImage(imgFile, i);
    },
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: img
  })) : /*#__PURE__*/React.createElement("img", {
    key: i,
    src: img
  }))));
};

var styles$2 = {"relatedTo":"RelatedToMenu-module_relatedTo__eRHql","menuLink":"RelatedToMenu-module_menuLink__8MBUA","deleteButton":"RelatedToMenu-module_deleteButton__Hqq16","arrow":"RelatedToMenu-module_arrow__njWAs","textRelatedTo":"RelatedToMenu-module_textRelatedTo__n7-3q"};

const RelatedToMenu = ({
  url,
  text,
  textLink,
  onChange = () => {},
  onDragStart = () => {},
  index
}) => {
  const [showMenuUrl, setShowMenuUrl] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles$2.relatedTo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.arrow
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$2.textRelatedTo,
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, text), /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, textLink), showMenuUrl && /*#__PURE__*/React.createElement("div", {
    className: styles$2.menuLink
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.deleteButton,
    onClick: () => {
      setShowMenuUrl(false);
    }
  }, "x"), /*#__PURE__*/React.createElement("label", null, "Text:"), /*#__PURE__*/React.createElement("input", {
    className: styles$2.text,
    onChange: e => onChange('textLink', e, index),
    value: textLink
  }), /*#__PURE__*/React.createElement("label", null, "Url:"), /*#__PURE__*/React.createElement("input", {
    className: styles$2.url,
    onChange: e => onChange('url', e, index),
    value: url
  })));
};

var styles$1 = {"btnCommon":"AdminMenu-module_btnCommon__zAFca","bigMenu":"AdminMenu-module_bigMenu__9UUTu","btn":"AdminMenu-module_btn__JqVGf","menuActive":"AdminMenu-module_menuActive__8EWvI","bottom":"AdminMenu-module_bottom__6oYnv","top":"AdminMenu-module_top__U0RCz","left":"AdminMenu-module_left__A-mrQ","show":"AdminMenu-module_show__Ie-bf"};

const AdminMenu = ({
  isEdit,
  text,
  onSaveClick = () => {},
  onEditClick = () => {},
  onCancelClick = () => {},
  onPreviewClick = () => {},
  hideButtons = []
}) => {
  const [_isEdit, setIsEdit] = useState(isEdit);
  const [isShowMenu, setIsShowMenu] = useState(false);
  useEffect(() => {
    setIsEdit(isEdit);
  }, [isEdit]);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setIsShowMenu(!isShowMenu);
    },
    className: `${styles$1.bigMenu}${isShowMenu ? ' ' + styles$1.menuActive : ''}`
  }, /*#__PURE__*/React.createElement("span", null, text), !hideButtons.includes('edit-save') && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      setIsShowMenu(!isShowMenu);
      _isEdit ? onSaveClick() : onEditClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.top} ` + styles$1.show : ''}`
  }, _isEdit ? 'Save' : 'Edit'), _isEdit && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      setIsShowMenu(!isShowMenu);
      onCancelClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.bottom} ` + styles$1.show : ''}`
  }, 'Cancel'), _isEdit && !hideButtons.includes('preview') && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onPreviewClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.left} ` + styles$1.show : ''}`
  }, '👁'));
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var styles = {"wrapperGroupContent":"PostContent-module_wrapperGroupContent__yFH1p","header":"PostContent-module_header__PsWMK","contentZone":"PostContent-module_contentZone__HUhpk","show":"PostContent-module_show__ZMf2A","edit":"PostContent-module_edit__Qe59Q","btnMenu":"PostContent-module_btnMenu__-mGU-","imageWrapper":"PostContent-module_imageWrapper__2Fk0j","bigTitle":"PostContent-module_bigTitle__iLoUj","wrapperAction":"PostContent-module_wrapperAction__-kVIX","deleteButton":"PostContent-module_deleteButton__iDrEN","addButton":"PostContent-module_addButton__sb98L","button":"PostContent-module_button__FKbWL","imageUpload":"PostContent-module_imageUpload__qkS0y","wrapper":"PostContent-module_wrapper__ahlNi","adminTopHeader":"PostContent-module_adminTopHeader__aIDLA","actionButtons":"PostContent-module_actionButtons__KUzyc","checkBox":"PostContent-module_checkBox__edKrx","ads":"PostContent-module_ads__vHBWo","shareZone":"PostContent-module_shareZone__gri02","shareBtn":"PostContent-module_shareBtn__hl-WI","adminMenuBtn":"PostContent-module_adminMenuBtn__dISi1","adminMenu":"PostContent-module_adminMenu__-hGkg","hidden":"PostContent-module_hidden__GQw-G","menuItem":"PostContent-module_menuItem__HomeL","adminMenuBtnSave":"PostContent-module_adminMenuBtnSave__t-FUr","listPost":"PostContent-module_listPost__cjbZ5","adminMenuInputPostId":"PostContent-module_adminMenuInputPostId__my03L","relatedTo":"PostContent-module_relatedTo__NKbLQ","menuLink":"PostContent-module_menuLink__kQC0Q","arrow":"PostContent-module_arrow__ms8AO","textRelatedTo":"PostContent-module_textRelatedTo__IHBxX","dropZone":"PostContent-module_dropZone__8WDHC","subcribeMe":"PostContent-module_subcribeMe__3y1K-","imgWrapper":"PostContent-module_imgWrapper__4YZaL","videoMenu":"PostContent-module_videoMenu__lxwk3","imageDescription":"PostContent-module_imageDescription__19QTz"};

const getSelectionText = () => {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
};
const PostContent = ({
  data = [],
  onChangeData = () => {},
  onSaveClick = () => {},
  onEditClick = () => {},
  onCancelClick = () => {},
  isMobile,
  isEdit,
  isShowBigMenu = false,
  menuBtnClass = ''
}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [_isShowBigMenu, setIsShowBigMenu] = useState(isShowBigMenu);
  const [_isEdit, setIsEdit] = useState(isEdit);
  const [_isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    setIsShowBigMenu(isShowBigMenu);
  }, [isShowBigMenu]);
  useEffect(() => {
    setIsEdit(isEdit);
  }, [isEdit]);
  const addNewContentItem = (type, textDefault = 'Edit this text', currentIndex = -1) => {
    onChangeData([...getContentByType(type, textDefault, currentIndex, data)]);
  };
  const onEditBtnClick = () => {
    if (_isPreview) {
      setIsEdit(true);
      setIsPreview(false);
    } else {
      onEditClick();
    }
  };
  const onDeleteContentItem = index => {
    if (confirm('Bạn có chắn chắn muốn xoá dòng này?')) {
      let currentContent = [...data];
      currentContent.splice(index, 1);
      onChangeData([...currentContent]);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, Array.isArray(data) && data.map((item, i) => renderItemByType(item ? item : {}, i, styles, onDeleteContentItem, addNewContentItem, isMobile, _isEdit, data, onChangeData)), _isEdit && Array.isArray(data) && data.length == 0 && /*#__PURE__*/React.createElement(MenuAddComponentPost$1, {
    menuItems: Object.keys(POST_ITEM_TYPE$1),
    btnClass: `${menuBtnClass ? ' ' + menuBtnClass : ''}`,
    onClickMenuItem: item => {
      addNewContentItem(item);
    }
  }), _isShowBigMenu && /*#__PURE__*/React.createElement(AdminMenu$1, {
    isEdit: _isEdit,
    text: isShowMenu ? 'X' : 'Menu',
    onSaveClick: onSaveClick,
    onEditClick: onEditBtnClick,
    onCancelClick: onCancelClick,
    onPreviewClick: () => {
      setIsEdit(!_isEdit);
      setIsPreview(!_isPreview);
    }
  }));
};
const GroupContent = ({
  title,
  content,
  isMobile,
  isEdit,
  onChange = () => {},
  expanded
}) => {
  const [contentData, setContentData] = useState(content);
  const [_expanded, setExpanded] = useState(expanded);
  useEffect(() => {
    setContentData(content);
  }, [content]);
  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapperGroupContent
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      !isEdit && onChange(!_expanded, 'expanded');
    },
    suppressContentEditableWarning: isEdit,
    onBlur: e => onChange(e, 'text'),
    contentEditable: `${isEdit ? "true" : "false"}`,
    className: styles.header
  }, title), /*#__PURE__*/React.createElement("div", {
    className: `${styles.contentZone}${_expanded || isEdit ? ` ${styles.edit} ` + styles.show : ''}`
  }, /*#__PURE__*/React.createElement(PostContent, {
    isShowBigMenu: false,
    menuBtnClass: styles.btnMenu,
    onChangeData: c => {
      setContentData(c);
      onChange(c, 'content');
    },
    isEdit: isEdit,
    data: contentData,
    isMobile: isMobile
  })));
};
const ImageConfig = ({
  title,
  value,
  onChange = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      marginRight: 5,
      minWidth: 50
    }
  }, title, ": "), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    onChange: e => {
      onChange(parseInt(e.target.value));
    }
  }));
};
const MultiImageConfig = ({
  data = {},
  onChange = () => {}
}) => {
  const [isLinkWidthHeight, setIsLinkWidthHeight] = useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -10,
      top: 9,
      cursor: 'pointer',
      width: 10
    },
    onClick: () => {
      setIsLinkWidthHeight(!isLinkWidthHeight);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 5,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      width: 1,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 5,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  })), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Width",
    value: parseInt(data.width),
    onChange: value => {
      onChange({
        ...data,
        width: value,
        height: isLinkWidthHeight ? value : data.height
      });
    }
  }), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Height",
    value: parseInt(data.height),
    onChange: value => {
      onChange({
        ...data,
        height: value,
        width: isLinkWidthHeight ? value : data.width
      });
    }
  })), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Gap",
    value: data.marginLeft * 2,
    onChange: value => {
      onChange({
        ...data,
        marginLeft: value / 2,
        marginRight: value / 2
      });
    }
  }));
};
const noImageUrl = '/images/no-image.png';
const getPostId = titleData => {
  let result = '';
  if (titleData) {
    result = removeAccents(titleData).trim().toLocaleLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-');
  }
  return result;
};
const onDragStart = e => {
  try {
    e.dataTransfer.setData("itemIndex", e.target.dataset.index);
  } catch (err) {
    console.log(err);
  }
};
const makeContentOnChangeText = (e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index].text = e.target.innerText;
    return [...currentContent];
  }
};
const makeContentDataOnDrop = (e, contentData) => {
  const indexStart = parseInt(e.dataTransfer.getData('itemIndex'));
  const indexEnd = parseInt(e.target.id);
  if (indexStart > -1 && indexEnd > -1) {
    var elementMove = contentData.splice(indexStart, 1);
    contentData.splice(indexEnd, 0, elementMove[0]);
  }
  e.target.style.backgroundColor = 'white';
  e.target.style.height = '1px';
  return contentData;
};
const onDragOver = e => {
  e.target.style.backgroundColor = 'blue';
  e.target.style.height = '30px';
  e.preventDefault();
};
const onDragLeave = e => {
  e.target.style.backgroundColor = 'white';
  e.target.style.height = '1px';
};
const getContentByType = (type, textDefault = 'Edit this text', currentIndex = -1, contentData) => {
  let result = {
    type: type,
    text: textDefault
  };
  const currentContent = [...contentData];
  const imgStyles = {
    width: 250,
    height: 250,
    marginLeft: 10,
    marginRight: 10
  };
  switch (type) {
    case POST_ITEM_TYPE$1.PATTERN_PREVIEW:
      result = {
        ...result,
        imageUrl: '/images/assets/image-pattern-preview.png'
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[0]:
      // result = {
      //     ...result,
      //     webWidth: 435,
      //     webHeight: 652,
      //     mobileWidth: 299,
      //     mobileHeight: 212,
      //     urlWeb: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
      //     urlMobile: ''
      // }
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[1]:
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[2]:
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE$1.RELATED_TOPIC:
      result.text = 'Xem thêm:';
      result.textLink = 'Link';
      result.url = '#';
      break;
    case POST_ITEM_TYPE$1.VIDEO:
      result.text = 'Video Description';
      break;
    case POST_ITEM_TYPE$1.PATTERN:
      result.patternDetail = {
        name: "Pattern Name",
        price: "Học phí: 100.000",
        ravelryUrl: "",
        lovecraftsUrl: "",
        imageList: [noImageUrl],
        bigImageUrl: noImageUrl
      };
      break;
    case POST_ITEM_TYPE$1.GROUP:
      result.text = 'Group 1';
      result.content = [];
      break;
  }
  if (currentIndex !== -1 && currentIndex !== currentContent.length - 1) {
    // Handle push new content to currentIndex
    const tmp = [];
    for (let i = 0; i < currentContent.length; i++) {
      tmp.push(currentContent[i]);
      if (i === currentIndex) {
        tmp.push({
          ...result
        });
      }
    }
    return [...tmp];
  } else {
    currentContent.push({
      ...result
    });
    return [...currentContent];
  }
};
const uploadContentImageFiles = _contentData => {
  return new Promise(async resolve => {
    const __contentData = [..._contentData];
    let listFileUploaded = [];
    let patternName = '';
    if (Array.isArray(__contentData)) {
      for (let i = 0; i < __contentData.length; i++) {
        if (typeof __contentData[i].patternDetail === 'object' && typeof __contentData[i].patternDetail.bigImageUrl === 'object' && typeof __contentData[i].patternDetail.bigImageUrl.name === 'string') {
          patternName = __contentData[i].patternDetail.name;
          __contentData[i].patternDetail.bigImageUrl = await uploadFile(__contentData[i].patternDetail.bigImageUrl, process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_bigImage_${__contentData[i].patternDetail.name}`, true);
          if (__contentData[i].patternDetail.bigImageUrl) {
            listFileUploaded.push(__contentData[i].patternDetail.bigImageUrl);
          }
        }
        if (typeof __contentData[i].patternDetail === 'object' && Array.isArray(__contentData[i].patternDetail.imageList)) {
          for (let j = 0; j < __contentData[i].patternDetail.imageList.length; j++) {
            if (typeof __contentData[i].patternDetail.imageList[j] === 'object' && __contentData[i].patternDetail.imageList[j].name) {
              __contentData[i].patternDetail.imageList[j] = await uploadFile(__contentData[i].patternDetail.imageList[j], process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_smallImage_${j}${__contentData[i].patternDetail.name}`, true);
              if (__contentData[i].patternDetail.imageList[j]) {
                listFileUploaded.push(__contentData[i].patternDetail.imageList[j]);
              }
            }
          }
        }
        /** 
         * Handle upload image preview
        */
        if (typeof __contentData[i].imageUrl === 'object' && typeof __contentData[i].imageUrl.name === 'string') {
          __contentData[i].imageUrl = await uploadFile(__contentData[i].imageUrl, process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_imageUrl_${patternName || new Date().getTime()}`, true);
          if (__contentData[i].imageUrl) {
            listFileUploaded.push(__contentData[i].imageUrl);
          }
        }
        /**
         * Handle upload 2, 3 images component
         */
        if (Array.isArray(__contentData[i].data)) {
          for (let j = 0; j < __contentData[i].data.length; j++) {
            if (typeof __contentData[i].data[j] === 'object' && typeof __contentData[i].data[j].imgFile === 'object') {
              __contentData[i].data[j].url = await uploadFile(__contentData[i].data[j].imgFile, process.env.NEXT_PUBLIC_publicImagesPath, true, `post-images-${new Date().getTime()}`, true);
              delete __contentData[i].data[j].imgFile;
            }
          }
        }
        /**
         * Handle upload images for group component
         */
        if (Array.isArray(__contentData[i].content)) {
          const groupContentResponse = await uploadContentImageFiles(__contentData[i].content);
          if (groupContentResponse && Array.isArray(groupContentResponse.updatedContent)) {
            __contentData[i].content = groupContentResponse.updatedContent;
          }
          if (groupContentResponse && Array.isArray(groupContentResponse.listFileUploaded)) {
            listFileUploaded = [...listFileUploaded, ...groupContentResponse.listFileUploaded];
          }
        }
      }
    }
    resolve({
      updatedContent: __contentData,
      listFileUploaded
    });
  });
};
const wrapperActionAdmin = (item, index, styles = {}, onDeleteContentItem = () => {}, onAddNewContentItem = () => {}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapperAction
  }, item, /*#__PURE__*/React.createElement("div", {
    onClick: () => onDeleteContentItem(index),
    className: styles.deleteButton
  }, "X"), /*#__PURE__*/React.createElement("div", {
    className: styles.addButton
  }, /*#__PURE__*/React.createElement(MenuAddComponentPost$1, {
    menuItems: Object.keys(POST_ITEM_TYPE$1),
    btnClass: styles.button,
    onClickMenuItem: item => {
      onAddNewContentItem(item, undefined, index);
    }
  })));
};
const onChangeText = (e, index, contentData) => {
  return [...makeContentOnChangeText(e, index, contentData)];
};
const onDrop = (e, contentData) => {
  return [...makeContentDataOnDrop(e, contentData)];
};
const onChangeImageMultiple = ({
  imgIndex,
  data,
  style
}, index, key, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    let _data = currentContent[index][key];
    if (key === 'data' && Array.isArray(_data) && _data.length > 0 && _data.length > imgIndex && data && typeof data === 'object') {
      if (data.imgFile && data.imgSrc) {
        _data[imgIndex].url = data.imgSrc;
        _data[imgIndex].imgFile = data.imgFile;
      } else if (data.description != undefined) {
        _data[imgIndex].description = data.description;
      }
    } else if (key === 'style' && _data && typeof _data === 'object') {
      _data = {
        ...style
      };
    }
    currentContent[index][key] = _data;
  }
  return [...currentContent];
};
const onChangeUrl = (key, e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index][key] = e.target.value;
  }
  return [...currentContent];
};
const onImageResize = (size, index, contentData) => {
  if (index < contentData.length && size.width && size.height) {
    contentData[index].webWidth = size.width;
    contentData[index].webHeight = size.height;
  }
  return [...contentData];
};
const onChangeImage = async (e, index, contentData) => {
  if (e && e.target && e.target.files && e.target.files[0] && index < contentData.length) {
    if (isBigFile(e?.target?.files[0])) {
      alert('Kích thước file không được vượt quá 500KB');
      return;
    }
    let url = '';
    try {
      url = await uploadFile(e.target.files[0], process.env.NEXT_PUBLIC_publicImagesPath, false, `post_${new Date().getTime()}_image`, true);
    } catch (e) {
      url = '';
      alert('Có lỗi xảy ra khi tải ảnh lên.');
    }
    contentData[index].urlWeb = url;
  }
  return [...contentData];
};
const onChangePatternPreview = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'string' || Array.isArray(e) || typeof e === 'object' && e.name) {
        value = e;
      }
      currentContent[index][key] = value;
    }
  }
  return [...currentContent];
};
const onChangePatternDetail = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && typeof currentContent[index].patternDetail === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'string' || Array.isArray(e) || typeof e === 'object' && e.name) {
        value = e;
      }
      if (typeof e === 'object' && e.target) {
        value = e.target.innerText;
      }
      currentContent[index].patternDetail[key] = value;
    }
  }
  return [...currentContent];
};
const onChangeGroupDetail = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'object' && e.target) {
        value = e.target.innerText;
      } else if (['content', 'expanded'].includes(key)) {
        value = e;
      }
      currentContent[index][key] = value;
    }
  }
  return [...currentContent];
};
const onKeyDownParagraph = (e, addNewContentItem = () => {}) => {
  if (e.keyCode === 38) {
    // Key Up press => Move to top parrent p
    setTimeout(() => {
      try {
        const pElement = e.target.parentElement.previousElementSibling.querySelector('p');
        if (pElement) {
          e.target.blur();
          pElement.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }
  if (e.keyCode === 40) {
    // Key Up press => Move to down parrent p
    setTimeout(() => {
      try {
        const pElement = e.target.parentElement.nextElementSibling.querySelector('p');
        if (pElement) {
          e.target.blur();
          pElement.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }
  if (e.shiftKey && e.keyCode === 8) {
    // Handle delete when detect Shift + Delete
    try {
      e.target.parentNode.lastElementChild.click();
    } catch (e) {
      console.log(e);
    }
  }
  if (e && e.keyCode === 13) {
    //Enter key press detected
    // Add new blank paragraph
    // Get current item index
    try {
      const currentItemIndex = parseInt(e.target.getAttribute('data-index'));
      if (typeof currentItemIndex === 'number') {
        addNewContentItem(POST_ITEM_TYPE$1.PARAGRAPH, getSelectionText(), currentItemIndex);
      }
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      if (e && e.target && e.target.blur) {
        e.target.blur();
        const listParagraph = document.querySelectorAll('p');
        if (listParagraph.length > 0) {
          // Focus to next sibling
          const item = e.target.parentElement.nextElementSibling.querySelector('p');
          if (item && item.focus) {
            item.focus();
            if (window.getSelection) {
              const selection = window.getSelection(),
                range = document.createRange();
              range.selectNodeContents(item);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      }
    }, 100);
    e.preventDefault();
  }
};
const onCaptionChange = (e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index].imageDescription = e.target.innerText;
  }
  return [...currentContent];
};
const renderItemByType = ({
  type,
  text,
  content,
  webWidth,
  webHeight,
  urlWeb,
  imageDescription = 'Image description',
  url,
  textLink,
  patternDetail = {},
  imageUrl,
  previewUrl,
  buttonText,
  message,
  data = [],
  style = {},
  expanded
}, index, styles = {}, onDeleteContentItem = () => {}, onAddNewContentItem = () => {}, isMobile, isAdmin, contentData, onChangeContent = () => {}) => {
  let result = /*#__PURE__*/React.createElement("p", null, text),
    editComponent = /*#__PURE__*/React.createElement("p", {
      onDragStart: onDragStart,
      draggable: "true",
      suppressContentEditableWarning: true,
      contentEditable: "true",
      onBlur: e => onChangeContent(onChangeText(e, index, contentData)),
      onKeyDown: e => onKeyDownParagraph(e, onAddNewContentItem),
      "data-index": index
    }, text),
    viewComponent = /*#__PURE__*/React.createElement(Linkify, {
      as: "p",
      options: {
        target: '_blank'
      }
    }, text);
  let subContent = /*#__PURE__*/React.createElement("div", null);
  const dropZoneDiv = /*#__PURE__*/React.createElement("div", {
    id: index,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDrop: e => onChangeContent(onDrop(e, contentData)),
    className: styles.dropZone
  });
  switch (type) {
    case POST_ITEM_TYPE$1.TITLE:
      editComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.bigTitle,
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.bigTitle
      }, text);
      break;
    case POST_ITEM_TYPE$1.BIG_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h2", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h2", null, text);
      break;
    case POST_ITEM_TYPE$1.MEDIUM_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h3", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h3", null, text);
      break;
    case POST_ITEM_TYPE$1.SMALL_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h4", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h4", null, text);
      break;
    case POST_ITEM_TYPE$1.RELATED_TOPIC:
      editComponent = /*#__PURE__*/React.createElement(RelatedToMenu$1, {
        url: url,
        text: text,
        textLink: textLink,
        onDragStart: onDragStart,
        onChange: (key, e, index) => onChangeContent(onChangeUrl(key, e, index, contentData)),
        index: index
      });
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.relatedTo
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.arrow
      }), /*#__PURE__*/React.createElement("div", {
        className: styles.textRelatedTo
      }, text), /*#__PURE__*/React.createElement("a", {
        href: url,
        onClick: e => {
          sendSlackMessage({
            channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS,
            message: `Related To Clicked:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>\\n*Url*: <${process.env.NEXT_PUBLIC_pageUrl}${url}|${textLink}>`
          });
        }
      }, textLink));
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[0]:
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[1]:
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[2]:
      if (Array.isArray(data)) {
        editComponent = /*#__PURE__*/React.createElement("div", {
          onDragStart: onDragStart,
          onMouseDown: e => {
            e.currentTarget.draggable = true;
          },
          onMouseUp: e => {
            e.currentTarget.draggable = false;
          },
          draggable: "false",
          style: {
            display: 'flex',
            flexDirection: 'column'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.imageWrapper,
          style: {
            display: 'flex',
            justifyContent: 'center'
          }
        }, data.map((img, idx) => /*#__PURE__*/React.createElement("div", {
          style: {
            ...style,
            width: 'unset',
            height: 'unset'
          }
        }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
          resizeable: true,
          key: idx,
          wrapperStyle: {
            width: style.width,
            height: style.height
          },
          onChangeImage: ({
            imgSrc,
            imgFile
          }) => {
            onChangeContent(onChangeImageMultiple({
              imgIndex: idx,
              data: {
                imgSrc,
                imgFile
              }
            }, index, 'data', contentData));
          },
          onChangeStyle: s => {
            onChangeContent(onChangeImageMultiple({
              style: {
                ...style,
                ...s
              }
            }, index, 'style', contentData));
          },
          isAdmin: true,
          isEdit: true,
          src: img.url
        }), /*#__PURE__*/React.createElement("figcaption", {
          onBlur: e => onChangeContent(onChangeImageMultiple({
            imgIndex: idx,
            data: {
              description: e.target.innerText
            }
          }, index, 'data', contentData)),
          suppressContentEditableWarning: true,
          contentEditable: "true",
          className: styles.imageDescription
        }, img.description)))), /*#__PURE__*/React.createElement(MultiImageConfig, {
          data: style,
          onChange: data => {
            onChangeContent(onChangeImageMultiple({
              style: {
                ...data
              }
            }, index, 'style', contentData));
          }
        }));
        viewComponent = /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 20
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.imageWrapper
        }, data.map((img, idx) => /*#__PURE__*/React.createElement("div", {
          style: {
            ...style,
            width: 'unset',
            height: 'unset'
          }
        }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
          className: styles.imageUpload,
          key: idx,
          wrapperStyle: {
            width: style.width,
            height: style.height
          },
          src: img.url
        }), /*#__PURE__*/React.createElement("figcaption", {
          className: styles.imageDescription
        }, img.description)))));
      }
      /**
       * Support old image component with urlWeb
       */
      if (urlWeb) {
        editComponent = /*#__PURE__*/React.createElement(ImageUpload$1, {
          width: webWidth,
          height: webHeight,
          onResize: size => onChangeContent(onImageResize(size, index, contentData)),
          onDragStart: onDragStart,
          caption: /*#__PURE__*/React.createElement("figcaption", {
            onBlur: e => onChangeContent(onCaptionChange(e, index, contentData)),
            suppressContentEditableWarning: true,
            contentEditable: "true",
            className: styles.imageDescription
          }, imageDescription),
          onChange: async e => onChangeContent(await onChangeImage(e, index, contentData)),
          url: urlWeb
        });
        viewComponent = /*#__PURE__*/React.createElement("div", {
          className: styles.imgWrapper
        }, /*#__PURE__*/React.createElement("img", {
          alt: imageDescription || 'Image with no description',
          src: urlWeb,
          width: isMobile ? '100%' : webWidth,
          height: isMobile ? 'auto' : webHeight
        }), /*#__PURE__*/React.createElement("figcaption", {
          className: styles.imageDescription
        }, imageDescription));
      }
      /** */
      break;
    case POST_ITEM_TYPE$1.ADS:
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true",
        className: styles.ads
      }, "ADS HERE");
      viewComponent = /*#__PURE__*/React.createElement(AdBanner$1, null);
      break;
    case POST_ITEM_TYPE$1.VIDEO:
      editComponent = /*#__PURE__*/React.createElement(PostVideo$1, {
        onDragStart: onDragStart,
        url: url,
        onChange: e => onChangeContent(onChangeUrl('url', e, index, contentData)),
        onChangeText: e => onChangeContent(onChangeText(e, index, contentData)),
        text: text
      });
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.imgWrapper
      }, url && /*#__PURE__*/React.createElement("iframe", {
        title: text,
        src: `https://www.youtube.com/embed/${url}`,
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }), /*#__PURE__*/React.createElement("figcaption", {
        className: styles.imageDescription
      }, text));
      break;
    case POST_ITEM_TYPE$1.SUBCRIBE_ME:
      subContent = /*#__PURE__*/React.createElement("div", {
        className: styles.subcribeMe
      }, /*#__PURE__*/React.createElement(YouTubeSubscribe$1, {
        channelid: 'UCf0jCxiSGh_pBExFN3k1CIA',
        theme: "default",
        layout: "full",
        count: "hidden"
      }), /*#__PURE__*/React.createElement("img", {
        alt: "Subcribe me",
        src: "/images/subcribe-me.png"
      }));
      editComponent = subContent;
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.BUY_ME_A_COFFEE:
      subContent = /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("a", {
        onClick: () => {
          sendSlackMessage({
            channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS,
            message: `An user has clicked on the buy me a coffee:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>`
          });
        },
        href: "https://www.buymeacoffee.com/cheryx",
        target: "_blank"
      }, /*#__PURE__*/React.createElement("img", {
        src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
        alt: "Buy Me A Coffee",
        style: {
          height: 60,
          width: 217
        }
      })));
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.PATTERN:
      subContent = /*#__PURE__*/React.createElement(PatternDetail$1, _extends({
        onChange: (e, index, key) => onChangeContent(onChangePatternDetail(e, index, key, contentData))
      }, patternDetail, {
        index: index,
        isAdmin: isAdmin
      }));
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.PATTERN_PREVIEW:
      subContent = /*#__PURE__*/React.createElement(PatternPreview$1, {
        buttonText: buttonText,
        message: message,
        previewUrl: previewUrl,
        onChange: (e, index, key) => onChangeContent(onChangePatternPreview(e, index, key, contentData)),
        imageUrl: imageUrl,
        index: index,
        isAdmin: isAdmin
      });
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.GROUP:
      subContent = /*#__PURE__*/React.createElement(GroupContent, {
        expanded: expanded,
        isEdit: isAdmin,
        isMobile: isMobile,
        title: text,
        content: content,
        onChange: (e, key) => onChangeContent(onChangeGroupDetail(e, index, key, contentData))
      });
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
  }
  if (isAdmin) {
    result = wrapperActionAdmin( /*#__PURE__*/React.createElement(React.Fragment, null, dropZoneDiv, " ", editComponent), index, styles, onDeleteContentItem, onAddNewContentItem);
  } else {
    result = viewComponent;
  }
  return result;
};

export { AdBanner, AdminMenu, IMAGE_SUBMENU, ImageUpload, ImageUploadable, MenuAddComponentPost, POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU, PatternDetail, PatternPreview, PostContent, PostVideo, RelatedToMenu, SubLink, YouTubeSubscribe, getPostId, gtag, noImageUrl, uploadContentImageFiles };
