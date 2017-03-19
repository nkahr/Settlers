import React, { Component } from 'react'
import TileComponent from '../components/TileComponent'
import Tiles from '../models/tiles'

class GameContainer extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    const tileClass = new Tiles()
    const tilesArray = tileClass.tilesArray
    const tileComponents = tilesArray.map((tile, index) => {
      return <TileComponent key={index} id={"tile"+index} coordinates={tile.coordinates} resource={tile.resource} number={tile.number} hasRobber={tile.hasRobber}></TileComponent>
    }) 
    return(
      <div id="game-container">
        {tileComponents}
      </div>
    )
  }
}

export default GameContainer