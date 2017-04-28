import React, {Component} from 'react'

class OpponentStatsComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let backgroundColor = ""

    switch (this.props.player.colour) {
      case "red":
        backgroundColor = "#f25146"
        break
      case "blue":
        backgroundColor = "#2774e8"
        break
      case "white":
        backgroundColor = "#f9f9f7"
        break
      case "yellow":
        backgroundColor = "#edde3b"
        break
    }

    let backgroundStyle = {
      backgroundColor: backgroundColor,
      padding: 10,
      fontSize: 14
    }

    return (
      <div style={backgroundStyle}>
        <h3> {this.props.player.name} </h3>
        <p> Score: {this.props.player.score} </p>
        <p> Res Cards: {this.props.player.resourceCards.length} Dev Cards: {this.props.player.developmentCards.length} </p>
        <p> Longest road: {this.props.player.longestRoad} Army size: {this.props.player.armySize}</p>
      </div>
    ) 

  }
}

export default OpponentStatsComponent