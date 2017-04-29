import React, { Component } from 'react'
import TileComponent from '../components/TileComponent'
import RoadComponent from '../components/RoadComponent'
import NodeComponent from '../components/NodeComponent'
import PortComponent from '../components/PortComponent'

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
          surroundingNodes={tile.surroundingNodes}
          coordinates={tile.coordinates} 
          resource={tile.resource} 
          number={tile.number} 
          hasRobber={tile.hasRobber} 
          moveRobber={this.props.moveRobber} 
          currentPlayer={this.props.currentPlayer}
        />
      )
    })

    const roadComponents = this.props.roads.map((road, index) => {
      return (
        <RoadComponent 
          key={index} 
          road={road}
          handleRoadClick = {this.props.handleRoadClick}
        />
      )
    })


    const nodeComponents = this.props.nodes.map((node, index) => {
      return (
        <NodeComponent 
          key={index} 
          node={node}
          handleNodeClick = {this.props.handleNodeClick}
        />
      )
    })

    const portComponents = this.props.ports.map((port, index) => {
      return (
        <PortComponent 
          key={index} 
          index={index}
          coordinates={port.coordinates} 
          type={port.type}
          angle={port.angle}
        />
      )
    })

    return (
      <div> 
        {portComponents}
        {tileComponents}
        {roadComponents}
        {nodeComponents}
      </div>
    )
  }

}

export default BoardComponent