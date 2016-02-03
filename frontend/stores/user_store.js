var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/user_constants');
var UserStore = new Store(AppDispatcher);

var _users = [];

var resetUser = function(user){
  _users = [];
  _users.push(user);
};

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case Constants.USER_RECEIVED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

UserStore.user = function(){
  return _users.slice(0);
};

module.exports = UserStore;
