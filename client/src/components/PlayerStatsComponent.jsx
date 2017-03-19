import React, { Component } from 'react'

class PlayerStatsComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="player-stats-block"> 
        <h1> Player Stats </h1>
        <p> Name: {this.props.currentPlayer.name} </p>
        <p> Colour: {this.props.currentPlayer.colour} </p>
        <p> Roads available: {this.props.currentPlayer.roadsAvailable} </p>
      </div>
    )
  }

}

export default PlayerStatsComponent