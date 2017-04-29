import React, { Component } from 'react'

class NodeComponent extends Component {
  constructor(props) {
    super(props)
    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  render() {
    let nodeStyle = {
      left: this.props.node.coordinates[0],
      top: this.props.node.coordinates[1], 
      backgroundColor: this.props.node.colour
    }

    return (
      <div onClick={this.handleNodeClick}>
        <p style={nodeStyle} className={this.props.node.classOfNode}></p>
      </div>
    )
  }

  handleNodeClick() {
    this.props.handleNodeClick(this.props.node)
  }

}

export default NodeComponent