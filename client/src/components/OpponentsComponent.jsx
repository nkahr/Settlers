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
     

    return (
      <div id="opponents-block"> 
        {opponentStatsComponents}
      </div>
    )
  }

}

export default OpponentsComponent