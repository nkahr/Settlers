import React, { Component } from 'react'

class RoadComponent extends Component {
  constructor(props) {
    super(props)
    this.handleRoadClick = this.handleRoadClick.bind(this)
  }

  render() {
    let coordinatesStyle = {
      left: this.props.road.coordinates[0],
      top: this.props.road.coordinates[1], 
      backgroundColor: this.props.road.colour
    }
    
    return (
      <div onClick={this.handleRoadClick}>
        <p style={coordinatesStyle} className='road'></p>
      </div>
    )
  }

  handleRoadClick() {
    this.props.colourRoads(this.props.road)
  }

}

export default RoadComponent