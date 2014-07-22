var EventEmitter = require('events').EventEmitter
var util = require('util')

/**
 * Dispatchr constructor for setting state on load
 * @param {Object} context full dispatcher context
 * @param {Object} initialState initial state for this store
 */
function TimerStore (context, initialState) {
  initialState = initialState || {}

  this.timeSpent = this._prevTime = initialState.timeSpent || 0
  this._startDt = new Date()

  // set update interval
  this.interval = setInterval(this.update.bind(this), 231)
}

/**
 * Extend EventEmitter to components can receive notifications
 * when the state changes
 */
util.inherits(TimerStore, EventEmitter)

TimerStore.storeName = 'TimerStore' // required

/**
 * Handers when events are dispatched
 */
TimerStore.handlers = {
  'RESET_TIMER': 'reset',
  'AAA': 'reset'
}

/**
 * Updates the state of the store
 */
TimerStore.prototype.update = function () {
  this.timeSpent = (new Date() - this._startDt) + this._prevTime
  this.emit('update')
}

/**
 * Resets the state of the store
 */
TimerStore.prototype.reset = function (payload, done) {
  console.log("HERE")
  this.timeSpent = this._prevTime = 0
  this._startDt = new Date()
  this.emit('update')
  done()
}

/**
 * Required method for Dispatchr to get the current state
 * (public data, unchangeable)
 */
TimerStore.prototype.getState = function () {
  return {
    timeSpent: this.timeSpent
  }
}

module.exports = TimerStore
