import React from 'react'

class TileComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    let coordinatesStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1]
    }
    let numbersCoordinatesStyle = {
      left: this.props.coordinates[0] + 40,
      top: this.props.coordinates[1] + 39
    }
    return (
      <div>
        <img src={require('file-loader!../public/img/hexagon_'+this.props.resource+'.png')} style={coordinatesStyle} id='tile'/>
        <p style={numbersCoordinatesStyle} id='tile_number'>{this.props.number}</p>
      </div>
    )

  }
}

export default TileComponent
