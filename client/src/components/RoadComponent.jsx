import React, { Component } from 'react'

class RoadComponent extends Component {
  constructor(props) {
    super(props)
    this.handleRoadClick = this.handleRoadClick.bind(this)
  }

  render() {
    let roadStyle = {
      left: this.props.road.coordinates[0],
      top: this.props.road.coordinates[1], 
      backgroundColor: this.props.road.colour,
      transform: 'rotate('+this.props.road.angle+'deg)'
    }

    return (
      <div onClick={this.handleRoadClick}>
        <p style={roadStyle} className='road'></p>
      </div>
    )
  }

  handleRoadClick() {
    this.props.handleRoadClick(this.props.road);
  }

}

export default RoadComponent