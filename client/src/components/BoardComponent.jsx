import React, { Component } from 'react'
import TileComponent from '../components/TileComponent'
import RoadComponent from '../components/RoadComponent'

class BoardComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const tileComponents = this.props.tiles.map((tile, index) => {
      return <TileComponent key={index} index={index} coordinates={tile.coordinates} resource={tile.resource} number={tile.number} hasRobber={tile.hasRobber} moveRobber={this.props.moveRobber}></TileComponent>
    })

    return (
      <div> 
        {tileComponents}
        <RoadComponent coordinates={[100,200]}></RoadComponent>
      </div>
    )
  }


}

export default BoardComponent