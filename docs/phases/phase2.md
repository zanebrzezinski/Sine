# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* Feed
  - Loop
* LoopForm

### Stores
* Loops

### Actions
* ApiActions.receiveAllLoops -> triggered by ApiUtil
* ApiActions.receiveSingleLoop
* ApiActions.deleteLoop
* FeedActions.fetchAllLoops -> triggers ApiUtil
* FeedActions.fetchUserLoops
* LoopActions.fetchSingleLoop 
* LoopActions.createLoop -> triggers ApiUtil
* LoopActions.editLoop -> triggers ApiUtil
* LoopActions.destroyLoop -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchAllLoops
* ApiUtil.fetchSingleLoop
* ApiUtil.createLoop
* ApiUtil.editLoop
* ApiUtil.destroyLoop

## Gems/Libraries
* Flux Dispatcher (npm)
