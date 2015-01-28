/** @jsx React.DOM */

var React = require('react')
var Reflux = require('reflux')
var mui = require('material-ui')

var resetTimer = require('../actions').resetTimer
var TimerStore = require('../stores/TimerStore')
var Paper = mui.Paper
var RaisedButton = mui.RaisedButton

var Timer = React.createClass({
  mixins: [Reflux.connect(TimerStore, 'timeSpent')],
  onReset: resetTimer,

  render: function() {
    var style = {
      textAlign: "center",
      paddingBottom: "10px",
    }
    return (
      <Paper zDepth={3} >
        <div style={style}>
          <h3>Time spent on this page: <b>{this.state.timeSpent}</b></h3>
          <RaisedButton label="Reset" primary={true} onClick={this.onReset} />
        </div>
      </Paper>
    )
  }
})

module.exports = Timer
