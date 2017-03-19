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

    const roadComponents = this.props.roads.map((road, index) => {
      return <RoadComponent key={index} index={index} coordinates={road.coordinates} colour={road.colour} colourRoads={this.props.colourRoads} game={this.props.game} currentPlayer={this.props.currentPlayer}></RoadComponent>
    })

    return (
      <div> 
        {tileComponents}
        {roadComponents}
      </div>
    )
  }


}

export default BoardComponent