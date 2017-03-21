import React, { Component } from 'react'

class NodeComponent extends Component {
  constructor(props) {
    super(props)
    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  render() {
    let nodeStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1], 
      backgroundColor: this.props.colour
    }

    return (
      <div onClick={this.handleNodeClick}>
        <p style={nodeStyle} className={this.props.classOfNode}></p>
      </div>
    )
  }

  handleNodeClick() {
    const clickedNodeIndex = this.props.index
    if (!this.props.allowConstruction) {
      return 
    }
    if (!this.props.hasSettlement && !this.props.hasCity) {
      if (this.props.letPlayerBuildSettlement(this.props.currentPlayer)) {
        this.props.colourSettlements(this.props.index)
        this.props.radar(this.props.currentPlayer, this.props.index)
        this.props.mapConstructionAround(this.props.currentPlayer, this.props.index)
      }
    }
    if (this.props.hasSettlement && !this.props.hasCity) {
      if (this.props.letPlayerBuildCity(this.props.currentPlayer)) {
        this.props.buildCity(this.props.index)
        this.props.radar(this.props.currentPlayer, this.props.index)
      }
    } 
  }

}

export default NodeComponent