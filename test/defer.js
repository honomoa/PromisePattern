'use strict';

const MoaLog = require('MoaLog');
const PromisePattern = require('index');

function async() {
  const deferred = PromisePattern.defer();
  setTimeout(function(){
    deferred.resolve('called');
  }, 2000);
  return deferred.promise;
}

async().then(res => MoaLog.info('defer', `res: ${res}`));

