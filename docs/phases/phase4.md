# Phase 4: Notifications (.5 days)

## Rails
### Models
* Notification

### Controllers
* API::NotificationsController(create, destroy, index)

### Views
* notifications/index.json.jbuilder

## Flux
### Views (React Components)
* Notifications

### Stores
* Notifications

### Actions
* ApiActions.receiveUserNotifications
* NotificationActions.receiveUserNotifications

## ApiUtil

* ApiUtil.fetchUserNotifications
* ApiUtil.createNotification
* ApiUtil.clearNotifications

## Gems/Libraries
