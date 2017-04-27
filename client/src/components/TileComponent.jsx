import React from 'react'

class TileComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
    this.handleRobberClick = this.handleRobberClick.bind(this)
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
      component = <p style={numbersCoordinatesStyle} 
      className='robber' 
      onClick={this.handleRobberClick}> R </p>
    } 
    else {
      if (this.props.resource !== 'desert') {
        component = <p style={numbersCoordinatesStyle} 
        className='tile-number' 
        onClick={this.handleRobberClick}>{this.props.number}</p>
      } else {
        component = <p style={numbersCoordinatesStyle} 
        className='tile-number' 
        onClick={this.handleRobberClick}></p>
      }
    }

    return (
      <div value={this.props.index}>
        <img src={require('file-loader!../public/img/hexagon_'+this.props.resource+'.png')} style={coordinatesStyle} className='tile'/>
        {component}
      </div>
    )
  }

  handleRobberClick() {
    if (this.props.currentPlayer.numberRolled === 7 || this.props.currentPlayer.knightPlayed === true) {
      const newRobberIndex = this.props.index 
      this.props.moveRobber(newRobberIndex)
    }
  }

}

export default TileComponent
