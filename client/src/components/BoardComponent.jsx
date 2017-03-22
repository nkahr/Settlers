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
          currentPlayer={this.props.currentPlayer}
        />
      )
    })


    const roadComponents = this.props.roads.map((road, index) => {
      return (
        <RoadComponent 
          key={index} 
          index={index} 
          road={road}
          coordinates={road.coordinates} 
          colour={road.colour}
          builtYet={road.builtYet} 
          angle={road.angle} 
          turn={this.props.turn}
          colourRoads={this.props.colourRoads} 
          letPlayerBuildRoad={this.props.letPlayerBuildRoad} 
          mapNextPossibleRoads={this.props.mapNextPossibleRoads}
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
          hasSettlement = {node.hasSettlement}
          hasCity = {node.hasCity}
          turn={this.props.turn}
          coordinates={node.coordinates} 
          allowConstruction={node.allowConstruction} 
          colourSettlements={this.props.colourSettlements}
          buildCity={this.props.buildCity}
          letPlayerBuildSettlement = {this.props.letPlayerBuildSettlement}
          letPlayerBuildCity = {this.props.letPlayerBuildCity}
          radar={this.props.radar}
          mapConstructionAround={this.props.mapConstructionAround}
          currentPlayer={this.props.currentPlayer}
          classOfNode={node.classOfNode}
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