/** @jsx React.DOM */

var React = require('react')
var L = require('leaflet')

window.React = React // for debugging tools

console.log(L.Map)

var Timer = React.createClass({
  getInitialState: function() {
    return { secondsElapsed: 100000 }
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 10})
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000)
  },
  componentWillUnmount: function() {
    clearInterval(this.interval)
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    )
  }
})

React.renderComponent(<Timer />, document.getElementById('monkey'))
