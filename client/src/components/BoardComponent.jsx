import React, { Component } from 'react'
import TileComponent from '../components/TileComponent'

class BoardComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const tileComponents = this.props.tiles.map((tile, index) => {
      return <TileComponent key={index} id={"tile"+index} coordinates={tile.coordinates} resource={tile.resource} number={tile.number} hasRobber={tile.hasRobber}></TileComponent>
    })

    return (
      <div> 
        {tileComponents}
      </div>
    )
  }
}

export default BoardComponent