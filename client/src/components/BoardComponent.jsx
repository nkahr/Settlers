import React, { Component } from 'react'
import TileComponent from '../components/TileComponent'
import RoadComponent from '../components/RoadComponent'
import NodeComponent from '../components/NodeComponent'

class BoardComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const tileComponents = this.props.tiles.map((tile, index) => {
      return (
        <TileComponent 
          key={index} 
          index={index} 
          coordinates={tile.coordinates} 
          resource={tile.resource} 
          number={tile.number} 
          hasRobber={tile.hasRobber} 
          moveRobber={this.props.moveRobber} 
        />
      )
    })


    const roadComponents = this.props.roads.map((road, index) => {
      return (
        <RoadComponent 
          key={index} 
          index={index} 
          coordinates={road.coordinates} 
          colour={road.colour} 
          angle={road.angle} 
          colourRoads={this.props.colourRoads} 
          letPlayerBuildRoad={this.props.letPlayerBuildRoad} 
          currentPlayer={this.props.currentPlayer}
        />
      )
    })
    console.log("nodes", this.props.nodes)
    const nodeComponents = this.props.nodes.map((node, index) => {
      return (
        <NodeComponent 
          key={index} 
          colour={node.colour} 
          index={index} 
          coordinates={node.coordinates} 
          colourSettlements={this.props.colourSettlements}
          letPlayerBuildSettlement = {this.props.letPlayerBuildSettlement}
          radar={this.props.radar}
          currentPlayer={this.props.currentPlayer} 
        />
      )
    })

    return (
      <div> 
        {tileComponents}
        {roadComponents}
        {nodeComponents}
      </div>
    )
  }


}

export default BoardComponent