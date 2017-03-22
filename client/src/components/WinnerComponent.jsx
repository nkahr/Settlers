import React, { Component } from 'react'

class WinnerComponent extends Component{
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id='winner-screen'> 
        <h1>Player {this.props.winner} won the game! Yay!</h1>
      </div>
    )
  }
}

export default WinnerComponent