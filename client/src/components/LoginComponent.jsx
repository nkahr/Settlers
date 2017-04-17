import React, {Component} from 'react'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.handlePlayer1 = this.handlePlayer1.bind(this)
    this.handlePlayer2 = this.handlePlayer2.bind(this)
    this.handlePlayer3 = this.handlePlayer3.bind(this)
    this.handlePlayer4 = this.handlePlayer4.bind(this)
  }

  render() {
    return (
      <div id="welcome-screen">
        <h1>Welcome to Squatter Island</h1>
        <h2>Enter players' names</h2>
        <form>
          Blue: <input className="welcome-input" type="text" value={this.props.player1name} name="player1" onChange={this.handlePlayer1}/>
          <br/>
          Red: <input className="welcome-input" type="text" value={this.props.player2name} name="player2" onChange={this.handlePlayer2}/>
          <br/>
          White: <input className="welcome-input" type="text" value={this.props.player3name} name="player3" onChange={this.handlePlayer3}/>
          <br/>
          Yellow: <input className="welcome-input" type="text" value={this.props.player4name} name="player4" onChange={this.handlePlayer4}/>
          <br/>
        </form>
        <button onClick={this.props.startGame}> Start Game </button>
      </div>
    ) 
  }

  handlePlayer1(event) {
    const name = event.target.value
    this.props.handlePlayer1(name)
  }
  handlePlayer2(event) {
    const name = event.target.value
    this.props.handlePlayer2(name)
  }
  handlePlayer3(event) {
    const name = event.target.value
    this.props.handlePlayer3(name)
  }
  handlePlayer4(event) {
    const name = event.target.value
    this.props.handlePlayer4(name)
  }
}

export default LoginComponent