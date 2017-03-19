import React, { Component } from 'react'

class RoadComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let coordinatesStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1]
    }
    
    return (
      <div>
        <p style={coordinatesStyle} className='road'></p>
      </div>
    )
  }

}

export default RoadComponent