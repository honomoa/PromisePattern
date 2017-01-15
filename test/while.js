'use strict';

const MoaLog = require('MoaLog');
const PromisePattern = require('index');

var it = 0;
PromisePattern.whileTrue(() => PromisePattern.delay(Math.random()*1000).then(() => MoaLog.debug('whileTrue nerver stop', it++)));

