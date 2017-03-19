import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Game from '../models/game'

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game()
    // const tileClass = newGame.tilesArray

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined
    }

    this.moveRobber = this.moveRobber.bind(this)
  }

  componentDidMount() {
    this.state.game.giveResourceCardToPlayer(this.state.game.players[0], "wood")
    this.state.game.giveResourceCardToPlayer(this.state.game.players[0], "clay")
  }

  render() {

    const tiles = this.state.tilesArray
    if (this.state.previousRobberIndex) {
      tiles[this.state.previousRobberIndex].hasRobber = false
    }
    tiles[this.state.robberIndex].hasRobber = true
  
    return(
      <div id="game-container">
        <OpponentsComponent /> 
        <BoardComponent tiles={tiles} moveRobber={this.moveRobber}/> 
        <PlayerStatsComponent /> 
      </div>
    )
  }

  moveRobber(newRobberIndex) {
    const current = this.state.robberIndex
    this.setState({previousRobberIndex: current, robberIndex: newRobberIndex})
  }
}

export default GameContainer