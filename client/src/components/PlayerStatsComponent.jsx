import React, { Component } from 'react'
// import Dice from '../models/dice'
// const dice = new Dice()

class PlayerStatsComponent extends Component{
  constructor(props) {
    super(props)
    // this.rollDice = this.rollDice.bind(this)
  }

  render() {

    const resourceCards = this.props.currentPlayer.resourceCards.map((resource) => {
      return resource.type + " "
    })

    console.log("resourceCards", resourceCards)

    return (
      <div id="player-stats-block"> 
        <button id="roll-dice-button" onClick={this.props.rollDice}> Roll Dice </button>
        <h1> Player Stats </h1>
        <p> Name: {this.props.currentPlayer.name} </p>
        <p> Colour: {this.props.currentPlayer.colour} </p>
        <p> Roads available: {this.props.currentPlayer.roadsAvailable} </p>
        <p> Number rolled: {this.props.currentPlayer.numberRolled} </p>
        Resources: {resourceCards}
      </div>
    )
  }

  // rollDice() {
  //   this.props.rollDice()
  // }

}

export default PlayerStatsComponent