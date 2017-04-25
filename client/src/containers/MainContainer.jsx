const io = require('socket.io-client')  

const socket = io()

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

    socket.on('login-event', (payload) => {   
      console.log("on receiving login data")
      console.log("payload", payload)
      this.updateDataFromSockets(payload)
    })

    this.handlePlayer1 = this.handlePlayer1.bind(this)
    this.handlePlayer2 = this.handlePlayer2.bind(this)
    this.handlePlayer3 = this.handlePlayer3.bind(this)
    this.handlePlayer4 = this.handlePlayer4.bind(this)
    this.startGame = this.startGame.bind(this)
    this.updateDataFromSockets = this.updateDataFromSockets.bind(this)
    this.setStateAndBroadcast = this.setStateAndBroadcast.bind(this)
  }


  setStateAndBroadcast(newData) {
    this.setState(newData)
    // const test = JSON.stringify(newData)
    socket.emit('login-event', newData)
    console.log("set state and broadcast (end)")
  }

  updateDataFromSockets(payload) {
  console.log("updateDataFromSockets")
  this.setState(payload)
  console.log("updateDataFromSockets end")
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
    this.setStateAndBroadcast({player1: {name: name}})
  }

  handlePlayer2(name) {
    this.setStateAndBroadcast({player2: {name: name}})
  }
  
  handlePlayer3(name) {
    this.setStateAndBroadcast({player3: {name: name}})
  }

  handlePlayer4(name) {
    this.setStateAndBroadcast({player4: {name: name}})
  }

  startGame() {
    this.setStateAndBroadcast({gameOn: true})
  }

}

export default MainContainer

// handlePlayer2={this.handlePlayer2}  handlePlayer3={this.handlePlayer3}  handlePlayer4={this.handlePlayer4} 