var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/loop_constants.js');
var LoopStore = require('../stores/loopStore.js');

var ApiActions = {
  receiveAll: function(loops) {
    AppDispatcher.dispatch({
      actionType: Constants.ALL_LOOPS_RECEIVED,
      loops: loops
    });
  }
};
