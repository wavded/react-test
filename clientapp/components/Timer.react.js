/** @jsx React.DOM */

var React = require('react')

var Timer = React.createClass({

  /**
   * Set property type information
   */
  propTypes: {
    dispatcher: React.PropTypes.object.isRequired
  },

  /**
   * Get initial state from store
   */
  getInitialState: function() {
    this.store = this.props.dispatcher.getStore('TimerStore')
    return this.store.getState()
  },

  /**
   * Additional component setup after mount
   */
  componentDidMount: function() {
    this.store.on('update', this._sync)
  },

  /**
   * Additional component teardown before unmount
   */
  componentWillUnmount: function() {
    this.store.removeListener('update', this._sync)
    this._sync = null
  },

  /**
   * The component to render
   */
  render: function() {
    return (
      <div>
        <div>Time spent on this page: {this.state.timeSpent}</div>
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  },

  onReset: function () {
    this.props.dispatcher.dispatch('RESET_TIMER')
  },

  /**
   * Custom _sync method to be called when state changes
   */
  _sync: function () {
    this.setState(this.store.getState())
  }
})

module.exports = Timer
