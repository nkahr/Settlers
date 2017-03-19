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

    let component = ""

    if (this.props.hasRobber) {
      component = <p style={numbersCoordinatesStyle} className='robber'> R </p>
    } else {
      if (this.props.resource !== 'desert') {
        component = <p style={numbersCoordinatesStyle} className='tile-number'>{this.props.number}</p>
      }
    }

    // const tileNumberClassName = this.props.hasRobber ?  'robber' : 'tile_number'
    return (
      <div>
        <img src={require('file-loader!../public/img/hexagon_'+this.props.resource+'.png')} style={coordinatesStyle} className='tile'/>
        {component}
      </div>
    )

  }
}

export default TileComponent
