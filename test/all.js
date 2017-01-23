'use strict';

const _ = require('lodash');
const MoaLog = require('MoaLog');
const PromisePattern = require('index');


global.rs = function rs(delay) {
  let deferred = Promise.defer();
  setTimeout(function(){
    deferred.resolve(delay);
  }, delay*1000);
  return deferred.promise;
}
global.rj = function rj(delay) {
  let deferred = Promise.defer();
  setTimeout(function(){
    deferred.reject(delay);
  }, delay*1000);
  return deferred.promise;
}

var arr = [
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
  {func: 'rj', d: 10},
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
  {func: 'rs', d: 1},
]

function exec(func, delay) {
  MoaLog.info('Executing:', func);
  return Promise.resolve().then(function() {
    return global[func](delay);
  }).catch(function(err) {
    MoaLog.error(err);
  });
}

function startJob() {
  MoaLog.info('start', new Date().toISOString());
  let promises = _.forEach(arr, a => {
    return exec(a.func, a.d);
  });
  return Promise.all(promises).then(function(values) {
    MoaLog.info(values);
    MoaLog.info('end', new Date().toISOString());
  }).catch(function(err) {
    MoaLog.error(err);
  });
}


PromisePattern.whileTrue(function() {
  return startJob(1, 0).then(function() {
    return PromisePattern.delay(5000);
  });
}).catch(function(err) {
  MoaLog.error(err);
});

