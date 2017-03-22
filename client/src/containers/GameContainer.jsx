import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import WinnerComponent from '../components/WinnerComponent'
import Game from '../models/game'
import Bank from '../models/bank'
import Dice from '../models/dice'
const dice = new Dice()

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game({player1: this.props.player1, 
      player2: this.props.player2, 
      player3: this.props.player3, 
      player4: this.props.player4})
    const bank = new Bank()

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      roadsArray: newGame.roadsArray,
      nodesArray: newGame.nodesArray,
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined, 
      currentPlayer: newGame.players[0],
      players: newGame.players, 
      turn: 0, 
      showTurnButton: true, 
      showRollDiceButton: false,
      sevenRolled: false,
      numberRolled: undefined
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.colourRoads = this.colourRoads.bind(this)
    this.buildCity = this.buildCity.bind(this)
    this.colourSettlements = this.colourSettlements.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.winChecker = this.winChecker.bind(this)
    this.getLongestRoadCount = this.getLongestRoadCount.bind(this)
    this.checkForLongestRoadWinner = this.checkForLongestRoadWinner.bind(this)
    this.tradeWithBank = this.tradeWithBank.bind(this)
  }

  render() {
    let screen = ""
    ////////////// WINNER SCREEN /////////////////////
    if (this.winChecker()) {
      screen = <WinnerComponent winner={this.winChecker()}/>
    }
    ///////////// GAME SCREEN /////////////////////////
    else {
      const tiles = this.state.tilesArray
      if (this.state.previousRobberIndex !== undefined) {
        tiles[this.state.previousRobberIndex].hasRobber = false
      }
      tiles[this.state.robberIndex].hasRobber = true

      const roads = this.state.roadsArray
      const nodes = this.state.nodesArray
      screen = 
        <div>
          <OpponentsComponent 
            players={this.state.players}
            currentPlayer={this.state.currentPlayer}
            numberRolled={this.state.numberRolled}
          /> 
          <BoardComponent    
            tiles={tiles} 
            roads={roads} 
            nodes={nodes} 
            moveRobber={this.moveRobber} 
            colourRoads = {this.colourRoads} 
            colourSettlements = {this.colourSettlements}
            buildCity = {this.buildCity}
            letPlayerBuildRoad={this.state.game.letPlayerBuildRoad} 
            letPlayerBuildSettlement={this.state.game.letPlayerBuildSettlement}
            letPlayerBuildCity={this.state.game.letPlayerBuildCity}
            radar={this.state.game.radar.bind(this.state.game)}
            mapConstructionAround={this.state.game.mapConstructionAround.bind(this.state.game)}
            mapNextPossibleRoads ={this.state.game.mapNextPossibleRoads.bind(this.state.game)}
            turn={this.state.turn}
            currentPlayer={this.state.currentPlayer}
          /> 
          <PlayerStatsComponent 
            currentPlayer={this.state.currentPlayer} 
            turn={this.state.turn}
            getLongestRoadCount={this.getLongestRoadCount}
            checkForLongestRoadWinner={this.checkForLongestRoadWinner}
            nextTurn={this.nextTurn}
            showTurnButton={this.state.showTurnButton}
            showRollDiceButton={this.state.showRollDiceButton}
            rollDice={this.rollDice}
            tradeWithBank={this.tradeWithBank}
          /> 
        </div>
    }
  
    return(
      <div id="game-container" onClick={this.handleClick}>
        {screen}
      </div>
    )
  }

  moveRobber(newRobberIndex) {
    const current = this.state.robberIndex
    this.setState({previousRobberIndex: current, robberIndex: newRobberIndex, sevenRolled: false})
  }

  colourRoads(clickedRoadIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedRoadsArray = this.state.roadsArray
    updatedRoadsArray[clickedRoadIndex].colour = colour
    updatedRoadsArray[clickedRoadIndex].builtYet = true
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.hasLongestRoad = this.checkForLongestRoadWinner(playerToUpdate)

    this.setState({roadsArray: updatedRoadsArray, currentPlayer: playerToUpdate})
  }

  winChecker() {
    let winner = false
    this.state.players.forEach((player) => {
      console.log("player", player.score)
      if (player.score >= 10) {
        winner = player.name
      }
    })
    return winner
  }

  nextTurn() {
    if (this.state.sevenRolled === true) {
      return
    }

    if (this.state.turn < 4 && (this.state.currentPlayer.settlementsAvailable === 5 || this.state.currentPlayer.roadsAvailable === 15)) {
      return 
    }

    if ((this.state.turn > 3 && this.state.turn < 8) && (this.state.currentPlayer.settlementsAvailable === 4 || this.state.currentPlayer.roadsAvailable === 14)) {
      return 
    }

    const turn = this.state.turn + 1
    let newCurrentPlayer

    if (turn > 4 && turn < 8) {
      if (this.state.currentPlayer === this.state.players[3]) {
        newCurrentPlayer = this.state.players[2]
      }
      if (this.state.currentPlayer === this.state.players[2]) {
        newCurrentPlayer = this.state.players[1]
      }
      if (this.state.currentPlayer === this.state.players[1]) {
        newCurrentPlayer = this.state.players[0]
      }
    } else if (turn == 4) {
      newCurrentPlayer = this.state.players[3]
    } else if (turn == 8) {
      newCurrentPlayer = this.state.players[0]
    } else {
      if (this.state.currentPlayer === this.state.players[0]) {
        newCurrentPlayer = this.state.players[1]
      }
      if (this.state.currentPlayer === this.state.players[1]) {
        newCurrentPlayer = this.state.players[2]
      }
      if (this.state.currentPlayer === this.state.players[2]) {
        newCurrentPlayer = this.state.players[3]
      }
      if (this.state.currentPlayer === this.state.players[3]) {
        newCurrentPlayer = this.state.players[0]
      }
    }
    this.setState({currentPlayer: newCurrentPlayer, turn: turn, showTurnButton: false, showRollDiceButton: true})
    
  }

  handleClick(event) {
    console.log("x",event.clientX)
    console.log("y",event.clientY)
  }

  colourSettlements(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasSettlement = true
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate})
  }

  buildCity(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasCity = true
    updatedNodesArray[clickedNodeIndex].classOfNode = 'city'
    // updatedNodesArray[clickedNodeIndex].hasSettlement = false
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate, classOfNode: 'city'})
  }

  getLongestRoadCount(player) {
    let longestRoad = 0
    player.longestRoads.forEach((road) => {
      if (road.length > longestRoad) {
        longestRoad = road.length
      }
    })
    return longestRoad
  }

  checkForLongestRoadWinner(currentPlayer) {
    let returnStatement = true
    if (!currentPlayer.hasLongestRoad) {
      this.state.players.forEach((player) => {
        if (currentPlayer !== player && this.getLongestRoadCount(currentPlayer) <= this.getLongestRoadCount(player) || this.getLongestRoadCount(currentPlayer) < 5) {
          returnStatement = false
        } else if (currentPlayer !== player && player.hasLongestRoad == true) {
          player.hasLongestRoad = false
          player.score -= 2
        }
      })
      if (returnStatement) {
        currentPlayer.score += 2
      }
      return returnStatement
    }
    return returnStatement
  }

  rollDice() {
    let sevenRolled = false
    const numberRolled = dice.rollDice()
    if (numberRolled === 7) {
      sevenRolled = true
    }
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.numberRolled = numberRolled
    this.state.players.forEach((player) => {
       player.conqueredTiles.forEach((tile) => {
        if (tile.number === numberRolled && tile.hasRobber === false) {
          const resource = tile.resource
          this.state.game.giveResourceCardToPlayer(player, resource)
        }
      })
    })
    this.setState({currentPlayer: playerToUpdate, showTurnButton: true, showRollDiceButton: false, sevenRolled: sevenRolled, numberRolled: numberRolled})
  }

  tradeWithBank(resourceToGive, resourceToReceive) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < this.state.currentPlayer.resourceCards.length; j++) {
        if (this.state.currentPlayer.resourceCards[j].type === resourceToGive) {
          this.state.currentPlayer.resourceCards.splice(j, 1)
          break
        }
      }
    }
    console.log("resources", this.state.currentPlayer.resourceCards)
    this.state.game.giveResourceCardToPlayer(this.state.currentPlayer, resourceToReceive)
    this.setState({currentPlayer: this.state.currentPlayer})
  }


}

export default GameContainer