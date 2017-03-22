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
    console.log('index', clickedRoadIndex)
    console.log('road index', this.props.currentPlayer.roadsAllowed[0])
    if (!this.props.currentPlayer.roadsAllowed.includes(clickedRoadIndex)) {
      return
    }
    if (!this.props.builtYet && this.props.letPlayerBuildRoad(this.props.currentPlayer)) {
      // this.props.currentPlayer.findLongestRoads()
      this.props.colourRoads(clickedRoadIndex)
      this.props.mapNextPossibleRoads(this.props.currentPlayer, this.props.index)
      this.props.currentPlayer.roadsBuilt.push(this.props.road)
    }
  }

}

export default RoadComponent