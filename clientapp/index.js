/** @jsx React.DOM */
var React = require('react')
var Dispatchr = require('dispatchr')()
require('react-tap-event-plugin')()

var Promise = global.Promise = require('bluebird')
window.React = React // for debugging tools

/**
 * Register stores with dispatcher and set initial context
 */
var context = localStorage.context ? JSON.parse(localStorage.context) : {}
Dispatchr.registerStore(require('./stores/TimerStore'))
var dispatcher = new Dispatchr({})

/**
 * Hydrate with existing data
 */
dispatcher.rehydrate(context)

var Timer = require('./components/Timer.react')
React.render(
  <Timer dispatcher={dispatcher} />,
  document.getElementById('timerapp')
)

/**
 * Persist state in local storage on unload
 */
window.onunload = function () {
  localStorage.context = JSON.stringify(dispatcher.toJSON())
}
