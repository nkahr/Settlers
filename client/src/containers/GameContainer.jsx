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
      robberIndex: tileClass.indexOfDesert
    }
  }

  render() {

 
    return(
      <div id="game-container">
        <OpponentsComponent /> 
        <BoardComponent tiles={this.state.tilesArray} /> 
        <PlayerStatsComponent /> 
      </div>
    )
  }
}

export default GameContainer