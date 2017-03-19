import React, { Component } from 'react'
// import TileComponent from '../components/TileComponent'
import BoardComponent from '../components/BoardComponent'
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
        <BoardComponent tiles={this.state.tilesArray} /> 
      </div>
    )
  }
}

export default GameContainer