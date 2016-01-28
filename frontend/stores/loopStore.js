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


LoopStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case Constants.LOOPS_RECEIVED:
      resetLoops(payload.loops);
      LoopStore.__emitChange();
      break;
  }
};

LoopStore.loops = function(){
  return _loops.slice(0);
};

module.exports = LoopStore;
