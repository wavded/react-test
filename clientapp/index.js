/** @jsx React.DOM */

var React = require('react')
window.React = React // for debugging tools

// required for react < 1.0.0 (touch events for material-ui)
require('react-tap-event-plugin')()

var Timer = require('./components/Timer.react')
React.render(
  <Timer />,
  document.getElementById('timerapp')
)