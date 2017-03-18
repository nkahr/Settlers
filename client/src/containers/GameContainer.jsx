import React, { Component } from 'react'
import Tile from '../components/Tile'

class GameContainer extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return(
      <div id="game-container">
        <Tile colour="black"></Tile>
      </div>
    )
  }
}

export default GameContainer