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

var updateLoop = function(loop) {
  for (var i = 0; i < _loops.length; i++) {
    if (loop.id === _loops[i].id) {
      _loops[i] = loop;
      return;
    }
  }
};

var deleteLoop = function(loop) {
  for (var i = 0; i < _loops.length; i++) {
    if (loop.id === _loops[i].id) {
      _loops.splice(i, 1);
      return;
    }
  }
};

var addCommentToLoop = function(comment) {
  var loopId = comment.loop;
  for (var i = 0; i < _loops.length; i++) {
    if (loopId === _loops[i].id) {
      _loops[i].comments.array.push(comment);
      return;
    }
  }
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
      break;
    case Constants.UPDATE_LOOP:
      updateLoop(payload.loop);
      LoopStore.__emitChange();
      break;
    case Constants.DELETE_LOOP:
      deleteLoop(payload.loop);
      LoopStore.__emitChange();
      break;
    case Constants.COMMENT_RECEIVED:
      addCommentToLoop(payload.comment);
      LoopStore.__emitChange();
      break;
  }
};

LoopStore.loops = function(){
  return _loops.slice(0);
};

module.exports = LoopStore;
