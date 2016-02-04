var ApiActions = require('../actions/api_actions');

ApiUtil = {
  fetchAllLoops: function(page) {
    $.ajax({
      type: "GET",
      url: "api/loops",
      dataType: "json",
      data: {page: page},
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

  fetchUser: function(id) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id,
      dataType: "json",
      success: function(data) {
        ApiActions.receiveUser(data);
      },
    });
  },

  fetchUserLoops: function(id) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id + "/userloops",
      dataType: "json",
      success: function(data) {
        ApiActions.receiveLoops(data);
      },
    });
  },


  fetchLikeLoops: function(id, page) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id,
      dataType: "json",
      data: {page: page},
      success: function(data) {
        ApiActions.receiveLoops(data.liked_loops.reverse());
      },
    });
  },

  fetchTagLoops: function(id, page) {
    $.ajax({
      type: "GET",
      url: "api/tags/" + id,
      dataType: "json",
      data: {page: page},
      success: function(data) {
        ApiActions.receiveLoops(data);
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
        cb && cb(data);
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
        ApiActions.updateLoop(data);
        cb && cb();
      }
    });
  },

  destroyLike: function(id, cb) {
    $.ajax({
      url: '/api/likes/' + id,
      type: 'DELETE',
      dataType: 'json',
      data: {id: id},
      success: function(data) {
        cb && cb();
      }
    });
  },

  createFollowing: function(data, cb) {
    $.ajax({
      url: '/api/followings/',
      type: 'POST',
      dataType: 'json',
      data: {followings: data},
      success: function(data) {
        debugger
        cb && cb();
      }
    });
  },

  destroyFollowing: function(id, cb) {
    $.ajax({
      url: '/api/followings/' + id,
      type: 'DELETE',
      dataType: 'json',
      data: {id: id},
      success: function(data) {
        cb && cb();
      }
    });
  },

  destroyLoop: function(id, cb){
    $.ajax({
      url: '/api/loops/' + id,
      type: 'DELETE',
      dataType: 'json',
      data: {id: id},
      success: function(data) {
        ApiActions.deleteLoop(data);
        cb && cb();
      }
    });
  },

  createTaggings: function(tags){
    $.ajax({
      url: '/api/taggings/',
      type: 'POST',
      dataType: 'json',
      data: {taggings: tags},
      success: function(data) {
        ApiActions.updateLoop(data);
      }
    });
  },

  createComment: function(data, cb){
    $.ajax({
      url: '/api/comments/',
      type: 'POST',
      dataType: 'json',
      data: {comment: data},
      success: function(data) {
        ApiActions.updateLoopComment(data);
        cb && cb();
      }
    });
  },
};

module.exports = ApiUtil;
