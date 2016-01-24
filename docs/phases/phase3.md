# Phase 3: Social Functionality and Feed (2.5 days)

## Rails
### Models
* Likes
* Comments
* Commentings
* Reposts

### Controllers
* API::CommentsController(create, update, destroy, show, index (nested under commments)

### Views
* loops/tags/index.json.jbuilder
* loops/comments/index.json.jbuilder
* loops/likes/index.json.jbuilder
* loops/reposts/index.json.jbuilder

## Flux
### Views (React Components)
* Comment Form
* Update Loop with Like Button
* Update Loop with Like display
* Update Loop with Repost Button
* Update Loop with Repost display
* Comment view (child of loop view)

### Stores
* Comments Store

### Actions

* LoopActions.fetchFeedLoops
* ApiActions.receiveComment
* ApiActions.deleteComment
* CommentActions.fetchSingleComment
* CommentActions.fetchLoopComments
* Update LoopActions.fetchUserLoops to include reposts

### ApiUtil
* ApiUtil.fetchComment
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment


## Gems/Libraries
