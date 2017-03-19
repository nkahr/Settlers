import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Tiles from '../models/tiles'

class GameContainer extends Component {
  constructor(props){
    super(props)
    const tileClass = new Tiles()

    this.state={
      tilesArray: tileClass.tilesArray, 
      robberIndex: tileClass.indexOfDesert, 
      previousRobberIndex: undefined
    }

    this.moveRobber = this.moveRobber.bind(this)
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