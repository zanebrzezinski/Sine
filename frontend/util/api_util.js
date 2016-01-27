var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchAllLoops: function() {
    $.ajax({
      type: "GET",
      url: "api/loops",
      dataType: "json",
      success: function(data) {
        ApiActions.receiveAllLoops(data);
      }
    });
  }
};

module.exports = ApiUtil;
