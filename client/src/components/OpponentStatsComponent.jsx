import React, {Component} from 'react'

class OpponentStatsComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3> {this.props.player.name} </h3>
        <p> Score: {this.props.player.score} </p>
        <p> Number of Resource Cards: {this.props.player.resourceCards.length} </p>
      </div>
    ) 

  }
}

export default OpponentStatsComponent