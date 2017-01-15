'use strict';

const MoaLog = require('MoaLog');
const PromisePattern = require('index');

var times = 5;
var it = 0;
PromisePattern.while(() => it < 5, () => PromisePattern.delay(Math.random()*1000).then(() => MoaLog.debug('while', it++)));

