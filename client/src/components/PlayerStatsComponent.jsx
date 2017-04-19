import React, { Component } from 'react'

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

    let dropDown = [<option selected="true" disabled> Resource to trade </option>]

    let allResourcesDropDown = [<option selected="true" disabled> Resource to receive </option>]

    let keys = Object.keys(resourceHash)

    /////////// RESOURCE TO GIVE DISPLAY ///////////////////
    keys.forEach((resource) => {
      if (this.props.currentPlayer.portTypes.includes(resource) && 
        resourceHash[resource] >= 2) {
          dropDown.push(<option value={resource} > {resource} </option>)
      }
      else if (this.props.currentPlayer.portTypes.includes("three_to_one") && resourceHash[resource] >= 3) {
        dropDown.push(<option value={resource} > {resource} </option>)
      }
      else {
        if (resourceHash[resource] >= 4) {
          dropDown.push(<option value={resource} > {resource} </option>)
        }
      }
    })
    ////////// RESOURCE TO GET DISPLAY ///////////////////////
    keys.forEach((resource) => {
      allResourcesDropDown.push(<option value={resource} > {resource} </option>)
    })

    let backgroundColor = ""

    switch (this.props.currentPlayer.colour) {
      case "red":
        backgroundColor = "#f25146"
        break
      case "blue":
        backgroundColor = "#2774e8"
        break
      case "white":
        backgroundColor = "#f9f9f7"
        break
      case "yellow":
        backgroundColor = "#edde3b"
        break
    }

    let activePlayerStyle = {
      padding: 15,
      backgroundColor: backgroundColor
    }

    let devCards = this.props.currentPlayer.developmentCards.map((card) => {
      return (
        <div class="dev-card">
          <button value={card.type} onClick={this.playDevCard}> {card.type}</button>
        </div>
      )
    })

    return (
      <div style={activePlayerStyle} id="player-stats-block"> 
        <button id={rollDiceButtonId} onClick={this.props.rollDice}> Roll Dice </button>
        <button id={nextTurnButtonId} onClick={this.props.nextTurn}> Next Turn </button>
        <button id="development-card" onClick={this.props.getDevelopmentCard}> Buy Development Card </button>
        <h3> Active player </h3>
        <h1> {this.props.currentPlayer.name} </h1>
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
        <select onChange={this.onResourceToGiveSelect} id="resourceToGive"> 
          {dropDown} 
        </select> 
        <select onChange={this.onResourceToReceiveSelect} id="resourceToReceive"> 
          {allResourcesDropDown} 
        </select> 
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
    const resource = event.target.value
    if (resource) {
      this.props.tradeWithBank(this.state.resourceToTrade, resource)
      resourceToGive.options[0].selected=true
      resourceToReceive.options[0].selected=true
    }
  }

  playDevCard(event) {
    const type = event.target.value
    this.props.playDevCard(type)
  }

}

export default PlayerStatsComponent