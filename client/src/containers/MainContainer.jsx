import React, { Component } from 'react'
import LoginComponent from '../components/LoginComponent'
import GameContainer from './GameContainer'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1: {name: "1"}, 
      player2: {name: "2"}, 
      player3: {name: "3"}, 
      player4: {name: "4"},
      gameOn: false
    }
    this.handlePlayer1 = this.handlePlayer1.bind(this)
    this.handlePlayer2 = this.handlePlayer2.bind(this)
    this.handlePlayer3 = this.handlePlayer3.bind(this)
    this.handlePlayer4 = this.handlePlayer4.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  render() {

    let component = ""

    if (!this.state.gameOn) {
      component = <LoginComponent 
      startGame={this.startGame} 
      player1name={this.state.player1.name} 
      player2name={this.state.player2.name} 
      player3name={this.state.player3.name} 
      player4name={this.state.player4.name} 
      handlePlayer1={this.handlePlayer1} 
      handlePlayer2={this.handlePlayer2} 
      handlePlayer3={this.handlePlayer3} 
      handlePlayer4={this.handlePlayer4} 
      handleLoginSubmit={this.handleLoginSubmit}/>
    }
    else {
      component = 
      <GameContainer 
      player1={this.state.player1} 
      player2={this.state.player2} 
      player3={this.state.player3} 
      player4={this.state.player4}
      />
    }
    return (
      <div>
      {component}
      </div>
    )
  }


  handlePlayer1(name) {
    this.setState({player1: {name: name}})
  }

  handlePlayer2(name) {
    this.setState({player2: {name: name}})
  }
  
  handlePlayer3(name) {
    this.setState({player3: {name: name}})
  }

  handlePlayer4(name) {
    this.setState({player4: {name: name}})
  }

  startGame() {
    this.setState({gameOn: true})
  }

}

export default MainContainer

// handlePlayer2={this.handlePlayer2}  handlePlayer3={this.handlePlayer3}  handlePlayer4={this.handlePlayer4} 