import React, { Component } from 'react'
// import Dice from '../models/dice'
// const dice = new Dice()

class PlayerStatsComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      resourceToTrade: undefined
    }
    this.onResourceToGiveSelect = this.onResourceToGiveSelect.bind(this)
    this.onResourceToReceiveSelect = this.onResourceToReceiveSelect.bind(this)
    this.playDevCard = this.playDevCard.bind(this)
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

    let rollDiceButtonId = "roll-dice-button"
    let nextTurnButtonId = "next-turn-button"

    if (this.props.turn < 8) {
      rollDiceButtonId = "invisibleButton"
      nextTurnButtonId = "next-turn-button"
    } else {
      if (!this.props.showRollDiceButton) {
        rollDiceButtonId = "invisibleButton"
      }
      if (!this.props.showTurnButton) {
        nextTurnButtonId = "invisibleButton"
      }
    }

    let dropDown = [<option selected="true" disabled> Resource to give </option>]
    let allResourcesDropDown = [<option selected="true" disabled> Resource to receive </option>]
    let keys = Object.keys(resourceHash)
    keys.forEach((resource) => {
      if (resourceHash[resource] >= 4) {
        dropDown.push(<option value={resource} > {resource} </option>)
      }
    })
    keys.forEach((resource) => {
      allResourcesDropDown.push(<option value={resource} > {resource} </option>)
    })

    let devCards = this.props.currentPlayer.developmentCards.map((card) => {
      return (
        <button value={card.type} onClick={this.playDevCard}> {card.type}</button>
      )
    })


    return (
      <div id="player-stats-block"> 
        <button id={rollDiceButtonId} onClick={this.props.rollDice}> Roll Dice </button>
        <button id={nextTurnButtonId} onClick={this.props.nextTurn}> Next Turn </button>
        <button id="development-card" onClick={this.props.getDevelopmentCard}> Buy Development Card </button>
        <h1> Player Stats </h1>
        <p> Name: {this.props.currentPlayer.name} </p>
        <p> Score: {this.props.currentPlayer.score} </p>
        <p> Colour: {this.props.currentPlayer.colour} </p>
        <p> Roads available: {this.props.currentPlayer.roadsAvailable} </p>
        <p> Settlements available: {this.props.currentPlayer.settlementsAvailable} </p>
        <p> Cities available: {this.props.currentPlayer.citiesAvailable} </p>
        <p> Wood: {resourceHash["wood"]} </p>
        <p> Clay: {resourceHash["clay"]} </p>
        <p> Sheep: {resourceHash["sheep"]} </p>
        <p> Rock: {resourceHash["rock"]} </p>
        <p> Crop: {resourceHash["crop"]} </p>
        <p> Longest Road: {longestRoad} </p>
        <p> Has Longest Road: {this.props.currentPlayer.hasLongestRoad} </p>
        <select onChange={this.onResourceToGiveSelect}> {dropDown} </select> 
        <select onChange={this.onResourceToReceiveSelect}> {allResourcesDropDown} </select> 
        {devCards}
      </div>
    )
  }


  onResourceToGiveSelect(event) {
    const resource = event.target.value
    if (resource) {
      this.setState({resourceToTrade: resource})
    }
  }

  onResourceToReceiveSelect(event) {
    const resourceToReceive = event.target.value
    if (resourceToReceive) {
      this.props.tradeWithBank(this.state.resourceToTrade, resourceToReceive)
    }
  }

  playDevCard(event) {
    console.log("test")
    const type = event.target.value
    this.props.playDevCard(type)
  }

}

export default PlayerStatsComponent