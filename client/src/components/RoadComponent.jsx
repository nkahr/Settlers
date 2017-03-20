import React, { Component } from 'react'

class RoadComponent extends Component {
  constructor(props) {
    super(props)
    this.handleRoadClick = this.handleRoadClick.bind(this)
  }

  render() {
    let roadStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1], 
      backgroundColor: this.props.colour,
      transform: 'rotate('+this.props.angle+'deg)'
    }

    return (
      <div onClick={this.handleRoadClick}>
        <p style={roadStyle} className='road'></p>
      </div>
    )
  }

  handleRoadClick() {
    const clickedRoadIndex = this.props.index 
    if (this.props.letPlayerBuildRoad(this.props.currentPlayer)) {
      this.props.colourRoads(clickedRoadIndex)
    }
  }

}

export default RoadComponent