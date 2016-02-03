var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/loop_constants.js');
var userConstants = require('../constants/user_constants.js');
var LoopStore = require('../stores/loopStore.js');

var ApiActions = {
  receiveLoops: function(loops) {
    AppDispatcher.dispatch({
      actionType: Constants.LOOPS_RECEIVED,
      loops: loops
    });
  },

  receiveOneLoop: function(loop) {
    AppDispatcher.dispatch({
      actionType: Constants.LOOP_RECEIVED,
      loop: loop
    });
  },

  updateLoop: function(loop) {
    AppDispatcher.dispatch({
      actionType: Constants.UPDATE_LOOP,
      loop: loop
    });
  },

  deleteLoop: function(loop) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_LOOP,
      loop: loop
    });
  },

  receiveUser: function(user) {
    AppDispatcher.dispatch({
      actionType: userConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = ApiActions;
