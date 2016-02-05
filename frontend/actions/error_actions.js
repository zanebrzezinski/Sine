var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/error_constants.js');

var ErrorActions = {
  error: function(response) {
    AppDispatcher.dispatch({
      actionType: Constants.ERROR,
      response: response
    });
  },
};

module.exports = ErrorActions;
