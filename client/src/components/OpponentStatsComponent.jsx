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
      padding: 10
    }

    return (
      <div style={backgroundStyle}>
        <h3> {this.props.player.name} </h3>
        <p> Score: {this.props.player.score} </p>
        <p> Resource Cards: {this.props.player.resourceCards.length} </p>
      </div>
    ) 

  }
}

export default OpponentStatsComponent