import React, { Component } from 'react'

class PortComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let portColour = "#FFFBD0"
    if (this.props.type === "wood") {
      portColour = "#457710"
    }
    if (this.props.type === "clay") {
      portColour = "#916416"
    }
    if (this.props.type === "rock") {
      portColour = "#939181"
    }
    if (this.props.type === "sheep") {
      portColour = "#A9EC61"
    }
    if (this.props.type === "crop") {
      portColour = "#F8CE08"
    }
    let portStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1],
      transform: 'rotate('+this.props.angle+'deg)',
      backgroundColor: portColour
    }

    return (
      <div value={this.props.index}>
        <p style={portStyle} className='port'></p>
      </div>
    )
  }

}

export default PortComponent