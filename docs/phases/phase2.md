# Phase 2: Flux Architecture and Loop CRUD (2.5 days)

## Rails
### Models
* Tag
* Tagging

### Controllers

### Views

## Flux
### Views (React Components)
* Loop
* Feed
* LoopForm

### Stores
* Loops

### Actions
* ApiActions.receiveAllLoops -> triggered by ApiUtil
* ApiActions.receiveSingleLoop
* ApiActions.deleteLoop
* LoopActions.fetchAllLoops -> triggers ApiUtil
* LoopActions.fetchUserLoops
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
