import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Game from '../models/game'
import Road from '../models/road'
import Dice from '../models/dice'
const dice = new Dice()

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game()
    // const tileClass = newGame.tilesArray

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined, 
      currentPlayer: newGame.players[0], 
      road: new Road({coordinates: [100,200]})
    }

    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.colourRoads = this.colourRoads.bind(this)
  }

  componentDidMount() {
    this.state.game.giveResourceCardToPlayer(this.state.game.players[0], "wood")
    this.state.game.giveResourceCardToPlayer(this.state.game.players[0], "clay")
  }

  render() {
    // const road = new Road({coordinates: [100,200]})

    const tiles = this.state.tilesArray
    if (this.state.previousRobberIndex) {
      tiles[this.state.previousRobberIndex].hasRobber = false
    }
    tiles[this.state.robberIndex].hasRobber = true
  
    return(
      <div id="game-container">
        <OpponentsComponent /> 
        <BoardComponent tiles={tiles} moveRobber={this.moveRobber} road={this.state.road} colourRoads = {this.colourRoads}/> 
        <PlayerStatsComponent currentPlayer={this.state.currentPlayer} rollDice={this.rollDice}/> 
      </div>
    )
  }

  moveRobber(newRobberIndex) {
    const current = this.state.robberIndex
    this.setState({previousRobberIndex: current, robberIndex: newRobberIndex})
  }

  colourRoads(road) {
    const colour = this.state.currentPlayer.colour
    const previousRoad = this.state.road
    previousRoad.colour = colour
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.roadsAvailable -= 1
    this.setState({road: previousRoad, currentPlayer: playerToUpdate})
  }

  rollDice() {
    const numberRolled = dice.rollDice()
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.numberRolled = numberRolled
    this.setState({currentPlayer: playerToUpdate})
  }
}

export default GameContainer