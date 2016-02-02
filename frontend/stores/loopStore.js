var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/loop_constants');
var LoopStore = new Store(AppDispatcher);

var _loops = [];

var resetLoops = function(loops) {
  if (loops instanceof Array) {
    _loops = loops;
  } else {
    _loops = [loops];
  }
};

var addOneLoop = function(loop) {
  _loops.unshift(loop);
};


LoopStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case Constants.LOOPS_RECEIVED:
      resetLoops(payload.loops);
      LoopStore.__emitChange();
      break;
    case Constants.LOOP_RECEIVED:
      addOneLoop(payload.loop);
      LoopStore.__emitChange();
  }
};

LoopStore.loops = function(){
  return _loops.slice(0);
};

module.exports = LoopStore;
