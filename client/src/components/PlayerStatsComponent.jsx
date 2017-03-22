import React, { Component } from 'react'
// import Dice from '../models/dice'
// const dice = new Dice()

class PlayerStatsComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {

    let resourceHash = { 
      "wood": 0, 
      "clay": 0, 
      "sheep": 0, 
      "rock": 0, 
      "crop": 0
    }

    this.props.currentPlayer.resourceCards.forEach((resourceCard) => {
      resourceHash[resourceCard.type] += 1
    })

    this.props.currentPlayer.findLongestRoads()

    let longestRoad = this.props.getLongestRoadCount(this.props.currentPlayer)

    this.props.currentPlayer.hasLongestRoad = this.props.checkForLongestRoadWinner(this.props.currentPlayer)
    console.log("has longest road", this.props.currentPlayer.hasLongestRoad)

    return (
      <div id="player-stats-block"> 
        <button id="roll-dice-button" onClick={this.props.rollDice}> Roll Dice </button>
        <button id="next-turn-button" onClick={this.props.nextTurn}> Next Turn </button>
        <h1> Player Stats </h1>
        <p> Name: {this.props.currentPlayer.name} </p>
        <p> Score: {this.props.currentPlayer.score} </p>
        <p> Colour: {this.props.currentPlayer.colour} </p>
        <p> Roads available: {this.props.currentPlayer.roadsAvailable} </p>
        <p> Settlements available: {this.props.currentPlayer.settlementsAvailable} </p>
        <p> Cities available: {this.props.currentPlayer.citiesAvailable} </p>
        <p> Number rolled: {this.props.currentPlayer.numberRolled} </p>
        <p> Wood: {resourceHash["wood"]} </p>
        <p> Clay: {resourceHash["clay"]} </p>
        <p> Sheep: {resourceHash["sheep"]} </p>
        <p> Rock: {resourceHash["rock"]} </p>
        <p> Crop: {resourceHash["crop"]} </p>
        <p> Longest Road: {longestRoad} </p>
        <p> Has Longest Road: {this.props.currentPlayer.hasLongestRoad} </p>
      </div>
    )
  }

}

export default PlayerStatsComponent