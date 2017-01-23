'use strict';

const MoaLog = require('MoaLog');
const PromisePattern = require('index');

var arr = [
  {k: {k: '1'}},
  {k: {k: '2'}},
  {k: {k: '3'}},
  {k: {k: '4'}},
  {k: {k: '5'}},
];
PromisePattern.mapSeries(arr, (obj) => {
  return PromisePattern.delay(Math.random()*1000).then(() => {
    MoaLog.debug('mapSeries', obj.k.k);
    return obj.k.k;
  });
}).then(res => MoaLog.info('mapSeries', `res: ${res}`));

