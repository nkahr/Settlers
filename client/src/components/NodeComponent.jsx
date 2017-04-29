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
    this.props.handleNodeClick(this.props.node)
  }

}

export default NodeComponent