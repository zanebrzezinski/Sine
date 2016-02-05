var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/error_constants');

var ErrorStore = new Store(AppDispatcher);


ErrorStore.__onDispatch = function (payload) {
  if (payload.actionType === Constants.ERROR) {
    ErrorStore.__emitChange();
  }
};

module.exports = ErrorStore;
