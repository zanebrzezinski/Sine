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
  },

  fetchFeed: function() {
    $.ajax({
      type: "GET",
      url: "api/feed",
      dataType: "json",
      success: function(data) {
        ApiActions.receiveLoops(data);
      },
    });
  },

  fetchUserLoops: function(id) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id,
      dataType: "json",
      success: function(data) {
        ApiActions.receiveLoops(data.loops);
      },
    });
  },

  createLoop: function(formData, cb){
    $.ajax({
      url: '/api/loops',
      type: 'POST',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(data) {
        ApiActions.receiveOneLoop(data);
        cb && cb();
      }
    });
  },

  createUser: function(formData, cb) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(user) {
        cb && cb(user);
      }
    });
  },

  createLike: function(data, cb) {
    $.ajax({
      url: '/api/likes',
      type: 'POST',
      dataType: 'json',
      data: {likes: data},
      success: function(data) {
        cb && cb();
      }
    });
  },

  destroyLike: function(id, cb) {
    $.ajax({
      url: '/api/likes',
      type: 'DELETE',
      dataType: 'json',
      data: {id: id},
      success: function(data) {
        console.log("BAHLETED");
        cb && cb();
      }
    });
  }
};

module.exports = ApiUtil;
