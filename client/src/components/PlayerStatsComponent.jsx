import React, { Component } from 'react'

class PlayerStatsComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      resourceToTrade: undefined,
      resourceToReceive: undefined,
      firstResourceYOP: undefined,
      secondResourceYOP: undefined,
      monopolyResource: undefined
    }
    this.onResourceToGiveSelect = this.onResourceToGiveSelect.bind(this)
    this.onResourceToReceiveSelect = this.onResourceToReceiveSelect.bind(this)
    this.makeTradeWithBank = this.makeTradeWithBank.bind(this)
    this.playDevCard = this.playDevCard.bind(this)
    this.onMonopolySelect = this.onMonopolySelect.bind(this)
    this.onFirstResourceYOPSelect = this.onFirstResourceYOPSelect.bind(this)
    this.onSecondResourceYOPSelect = this.onSecondResourceYOPSelect.bind(this)
    this.onFinishYOPClick = this.onFinishYOPClick.bind(this)
    this.onFinishMonopolyClick = this.onFinishMonopolyClick.bind(this)
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

    let armySize = this.props.currentPlayer.armySize

    let longestRoad = this.props.currentPlayer.longestRoad

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

    let dropDown = [<option selected="true" key={-1} disabled> Resource to trade </option>]

    let allResourcesDropDown = [<option selected= "true" key={-1} disabled> Resource to receive </option>]

    let monopolyDropDown = [<option selected="true" key={-1} disabled> Monopoly </option>]

    let keys = Object.keys(resourceHash)

    /////////// RESOURCE TO TRADE DROPDOWN ///////////////////
    keys.forEach((resource, index) => {
      if (this.props.currentPlayer.portTypes.includes(resource) && 
        resourceHash[resource] >= 2) {
          dropDown.push(<option value={resource} key={index}> {resource} </option>)
      }
      else if (this.props.currentPlayer.portTypes.includes("three_to_one") && resourceHash[resource] >= 3) {
        dropDown.push(<option value={resource} key={index}> {resource} </option>)
      }
      else {
        if (resourceHash[resource] >= 4) {
          dropDown.push(<option value={resource} key={index}> {resource} </option>)
        }
      }
    })
    
    ////////// RESOURCE TO RECEIVE DROPDOWN ///////////////////////
    keys.forEach((resource, index) => {
      if (resource !== this.state.resourceToTrade) {
        allResourcesDropDown.push(<option value={resource} key={index}> {resource} </option>)
      }
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
        <div className="dev-card">
          <button value={card.type} onClick={this.playDevCard}> {card.type}</button>
        </div>
      )
    })

    /////////// MONOPOLY COMPONENT SETUP ///////////////////////////////////////
    let monopolySelection = ""

    if (this.props.currentPlayer.monopolyPlayed) {

      keys.forEach((resource, index) => {
          monopolyDropDown.push(<option value={resource} key={index}> {resource} </option>)
        })

      monopolySelection =
        <div className="dev-card">
          <select onChange={this.onMonopolySelect}>
            {monopolyDropDown}
          </select>
          <button onClick={this.onFinishMonopolyClick}> Play monopoly </button>
        </div>
    }

    /////////// YEAR OF PLENTY COMPONENT SETUP /////////////////////////////////
    let yearOfPlentySelection = ""

    if (this.props.currentPlayer.yearOfPlentyPlayed) {

      let firstYOPResourceDropDown = [<option selected="true" key={-1} disabled> First resource </option>]
      keys.forEach((resource, index) => {
        firstYOPResourceDropDown.push(<option value={resource} key={index}> {resource} </option>)
      })

      let secondYOPResourceDropDown = [<option selected="true" key={-1} disabled> Second resource </option>]
      keys.forEach((resource, index) => {
        secondYOPResourceDropDown.push(<option value={resource} key={index}> {resource} </option>)
      })

      yearOfPlentySelection = 
        <div>
          <select onChange={this.onFirstResourceYOPSelect} id="first-YOP-resource"> 
            {firstYOPResourceDropDown} 
          </select>
          <select onChange={this.onSecondResourceYOPSelect} id="second-YOP-resource"> 
            {secondYOPResourceDropDown} 
          </select> 
          <button onClick={this.onFinishYOPClick}> Get YOP resources </button>
        </div>
    }
      
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
        <p> Army size: {armySize} </p>
        <select onChange={this.onResourceToGiveSelect} id="resourceToGive"> 
          {dropDown} 
        </select> 
        <select onChange={this.onResourceToReceiveSelect} id="resourceToReceive"> 
          {allResourcesDropDown} 
        </select>
        <button onClick={this.makeTradeWithBank}> Trade </button>
        {devCards}
        {yearOfPlentySelection}
        {monopolySelection}
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
      this.setState({resourceToReceive: resource})
    }
  }

  makeTradeWithBank() {
    this.props.tradeWithBank(this.state.resourceToTrade, this.state.resourceToReceive)
    resourceToGive.options[0].selected=true
    resourceToReceive.options[0].selected=true
    this.setState({resourceToTrade: undefined, resourceToReceive: undefined})
  }

  playDevCard(event) {
    const type = event.target.value
    this.props.playDevCard(type)
  }

  ////////////////// TO PLAY MONOPOLY CARD /////////////////////////////
  onMonopolySelect(event) {
    const resource = event.target.value
    if (resource) {
      this.setState({monopolyResource: resource})
    }
  }

  onFinishMonopolyClick() {
    this.props.playMonopoly(this.state.monopolyResource)
    this.setState({monopolyResource: undefined})
  }

  ////////////////// TO PLAY YearOfPlenty YOP CARD /////////////////////
  onFirstResourceYOPSelect(event) {
    const resource = event.target.value
    if (resource) {
      this.setState({firstResourceYOP: resource})
    }
  }

  onSecondResourceYOPSelect(event) {
    const resource = event.target.value
    if (resource) {
      this.setState({secondResourceYOP: resource})
    }
  }

  onFinishYOPClick() {
    this.props.playYearOfPlenty(this.state.firstResourceYOP, this.state.secondResourceYOP)
    this.setState({firstResourceYOP: undefined, secondResourceYOP: undefined})
  }

}

export default PlayerStatsComponent