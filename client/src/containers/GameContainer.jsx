import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Game from '../models/game'
import Dice from '../models/dice'
const dice = new Dice()

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game({player1: this.props.player1, 
      player2: this.props.player2, 
      player3: this.props.player3, 
      player4: this.props.player4})

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      roadsArray: newGame.roadsArray,
      nodesArray: newGame.nodesArray,
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined, 
      currentPlayer: newGame.players[0],
      players: newGame.players
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.colourRoads = this.colourRoads.bind(this)
    this.buildCity = this.buildCity.bind(this)
    this.colourSettlements = this.colourSettlements.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.winChecker = this.winChecker.bind(this)
  }

  render() {

    let winScreen = ""
    if (this.winChecker()) {
      winScreen = <h1> {this.winChecker()} wins </h1>
    }

    const tiles = this.state.tilesArray
    if (this.state.previousRobberIndex !== undefined) {
      tiles[this.state.previousRobberIndex].hasRobber = false
    }
    tiles[this.state.robberIndex].hasRobber = true

    const roads = this.state.roadsArray
    const nodes = this.state.nodesArray
  
    return(
      <div id="game-container" onClick={this.handleClick}>
        <OpponentsComponent 
          players={this.state.players}
          currentPlayer={this.state.currentPlayer}
        /> 
        <BoardComponent    
          tiles={tiles} 
          roads={roads} 
          nodes={nodes} 
          moveRobber={this.moveRobber} 
          colourRoads = {this.colourRoads} 
          colourSettlements = {this.colourSettlements}
          buildCity = {this.buildCity}
          letPlayerBuildRoad={this.state.game.letPlayerBuildRoad} 
          letPlayerBuildSettlement={this.state.game.letPlayerBuildSettlement}
          letPlayerBuildCity={this.state.game.letPlayerBuildCity}
          radar={this.state.game.radar.bind(this.state.game)}
          mapConstructionAround={this.state.game.mapConstructionAround.bind(this.state.game)}
          mapNextPossibleRoads ={this.state.game.mapNextPossibleRoads.bind(this.state.game)}
          currentPlayer={this.state.currentPlayer}/> 
        <PlayerStatsComponent 
          currentPlayer={this.state.currentPlayer} 
          nextTurn={this.nextTurn}
          rollDice={this.rollDice}/> 
        {winScreen} 
      </div>
    )
  }

  moveRobber(newRobberIndex) {
    const current = this.state.robberIndex
    this.setState({previousRobberIndex: current, robberIndex: newRobberIndex})
  }

  colourRoads(clickedRoadIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedRoadsArray = this.state.roadsArray
    updatedRoadsArray[clickedRoadIndex].colour = colour
    updatedRoadsArray[clickedRoadIndex].builtYet = true
    let playerToUpdate = this.state.currentPlayer
    this.setState({roadsArray: updatedRoadsArray, currentPlayer: playerToUpdate})
  }

  winChecker() {
    let winner = false
    this.state.players.forEach((player) => {
      console.log("player", player.score)
      if (player.score >= 10) {
        winner = player.name
      }
    })
    return winner
  }

  nextTurn() {
    if (this.state.currentPlayer === this.state.players[0]) {
      this.setState({currentPlayer: this.state.players[1]})
    }
    if (this.state.currentPlayer === this.state.players[1]) {
      this.setState({currentPlayer: this.state.players[2]})
    }
    if (this.state.currentPlayer === this.state.players[2]) {
      this.setState({currentPlayer: this.state.players[3]})
    }
    if (this.state.currentPlayer === this.state.players[3]) {
      this.setState({currentPlayer: this.state.players[0]})
    }
  }

  handleClick(event) {
    console.log("x",event.clientX)
    console.log("y",event.clientY)
  }

  colourSettlements(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasSettlement = true
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate})
  }

  buildCity(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasCity = true
    updatedNodesArray[clickedNodeIndex].classOfNode = 'city'
    // updatedNodesArray[clickedNodeIndex].hasSettlement = false
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate, classOfNode: 'city'})
  }

  rollDice() {
    const numberRolled = dice.rollDice()
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.numberRolled = numberRolled

    this.state.currentPlayer.conqueredTiles.forEach((tile) => {
      if (tile.number === numberRolled && tile.hasRobber === false) {
        const resource = tile.resource
        this.state.game.giveResourceCardToPlayer(playerToUpdate, resource)
      }
    })
    this.setState({currentPlayer: playerToUpdate})
  }


}

export default GameContainer