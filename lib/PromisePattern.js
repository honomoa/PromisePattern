'use strict';

const _ = require('lodash');

module.exports = class PromisePattern {
  constructor() {
    setPromise();
  }

  _selectPromise() {
    if (global.Promise) {
      return 'Native';
    }
    try {
      require('Q');
      return 'Q';
    } catch (err) {
      MoaLog.err(err);
    }
    try {
      require('bluebird');
      return 'Bluebird';
    } catch (err) {
      MoaLog.err(err);
    }
    throw Error('Please using least one Promise library.');
  }
  setPromise() {
    const promiseLib = _selectPromise();
    return this[`_set${promiseLib}Promise`]();
  }
  _setNativePromise() {
    return this;
  }
  _setQPromise() {
    global.Promise = require('Q');
    return this;
  }
  _setBluebirdPromise() {
    global.Promise = require('bluebird');
    return this;
  }
  static delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }
  static while(condition, action) {
    const deferred = _.get(Promise, 'defer', PromisePattern.defer)();
    function loop() {
      if (!condition()) return deferred.resolve();
      return Promise.resolve().then(action).then(loop).catch(deferred.reject);
    }
    process.nextTick(loop);
    return deferred.promise;
  }
  static whileTrue(action) {
    return PromisePattern.while(() => true, action);
  }
  static mapSeries(arr, iterator) {
    let currentPromise = Promise.resolve();
    let promises = arr.map((el, idx, arr) => {
      return currentPromise = currentPromise.then(() => {
        return iterator(el, idx, arr);
      }).catch(err => {
        MoaLog.error('mapSeries', err);
      });
    });
    return Promise.all(promises);
  }
  static defer() {
    let resolve, reject;
    let promise = new Promise(function() {
      resolve = arguments[0];
      reject = arguments[1];
    });
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }
}

