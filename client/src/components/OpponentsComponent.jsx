import React, { Component } from 'react'
import OpponentStatsComponent from './OpponentStatsComponent'

class OpponentsComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {

    const opponentStatsComponents = []

    this.props.players.forEach((player, index) => {
      if (player !== this.props.currentPlayer) {
        opponentStatsComponents.push(<OpponentStatsComponent key={index} player={player}/>)
      }
    })

    let numberRolledStyle = {
      padding: 10
    }

    let numberRolled = 
      <div style={numberRolledStyle} key='rolled_number'>
        <h4>Number rolled: </h4>
        <h2>{this.props.numberRolled} </h2>
      </div>

    opponentStatsComponents.push(numberRolled)

    return (
      <div id="opponents-block"> 
        {opponentStatsComponents}
      </div>
    )
  }

}

export default OpponentsComponent