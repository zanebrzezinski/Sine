var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchAllLoops: function() {
    $.ajax({
      type: "GET",
      url: "api/loops",
      dataType: "json",
      success: function(data) {
        ApiActions.receiveLoops(data);
      }
    });
  },

  fetchOneLoop: function(id) {
    $.ajax({
      type: "GET",
      url: "api/loops/" + id,
      dataType: "json",
      success: function(data) {
        ApiActions.receiveLoops(data);
      },
    });
  }
};

module.exports = ApiUtil;
