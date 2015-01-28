var Reflux = require('reflux')
var actions = require('../actions')

var TimerStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    this.timeSpent = this._prevTime = this.timeSpent || 0
    this._startDt = new Date()

    // set update interval
    this.interval = setInterval(this.update.bind(this), 231)
  },
  update: function () {
    this.timeSpent = (new Date() - this._startDt) + this._prevTime
    this.trigger(this.timeSpent)
  },
  resetTimer: function () {
    this.timeSpent = this._prevTime = 0
    this._startDt = new Date()
    this.trigger(this.timeSpent)
  }
})

module.exports = TimerStore
