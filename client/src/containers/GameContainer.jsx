const io = require('socket.io-client')  

const socket = io()
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
    const newGame = new Game({
      player1: this.props.player1, 
      player2: this.props.player2, 
      player3: this.props.player3, 
      player4: this.props.player4
    })
    const bank = new Bank()

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      roadsArray: newGame.roadsArray,
      nodesArray: newGame.nodesArray,
      portsArray: newGame.portsArray,
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
    this.checkForBiggestArmyWinner = this.checkForBiggestArmyWinner.bind(this)
    this.tradeWithBank = this.tradeWithBank.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.getDevelopmentCard = this.getDevelopmentCard.bind(this)
    this.playDevCard = this.playDevCard.bind(this)
    this.updateDataFromSockets = this.updateDataFromSockets.bind(this)
    this.setStateAndBroadcast = this.setStateAndBroadcast.bind(this)
    this.playMonopoly = this.playMonopoly.bind(this)
  }

  // componentDidMount() {
  //   socket.on('receive data', (payload) => {   
  //     console.log("on receiving data")
  //     console.log("payload", payload)
  //     this.updateDataFromSockets(payload)
  //   })
  // }

  setStateAndBroadcast(newData) {
    this.setState(newData)
    socket.emit('game-event', newData)
    console.log("set state and broadcast (end)")
  }

  updateDataFromSockets(payload) {
  console.log("updateDataFromSockets")
  console.log("payload2", payload)
  this.setState(payload)
  console.log("updateDataFromSockets end")

  }

  render() {
    socket.on('game-event', (payload) => {   
      console.log("on receiving data")
      console.log("payload", payload)
      this.updateDataFromSockets(payload)
    })
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
      const ports = this.state.portsArray
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
            ports={ports}
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
            roads={roads} 
            nodes={nodes} 
            getLongestRoadCount={this.getLongestRoadCount}
            checkForLongestRoadWinner={this.checkForLongestRoadWinner}
            nextTurn={this.nextTurn}
            showTurnButton={this.state.showTurnButton}
            showRollDiceButton={this.state.showRollDiceButton}
            rollDice={this.rollDice}
            tradeWithBank={this.tradeWithBank}
            getDevelopmentCard={this.getDevelopmentCard}
            playDevCard={this.playDevCard}
            playMonopoly={this.playMonopoly}
          /> 
        </div>
    }
  
    return(
      <div id="game-container" onClick={this.handleClick}>
        {screen}
      </div>
    )
  }

  handleClick(event) {
    console.log("x",event.clientX)
    console.log("y",event.clientY)
  }
  
  shuffle(array) {
    for (let i = array.length; i; i--) {
      let rand = Math.floor(Math.random() * i);
      [array[i - 1], array[rand]] = [array[rand], array[i - 1]];
    }
  }

  moveRobber(newRobberIndex) {
    let players = this.state.players
    const current = this.state.robberIndex
    ///////// STEAL ONE RANDOM CARD FROM PLAYERS ON TILE ////////////////////
    let coloursOfPlayersOnThisTile = []
    this.state.tilesArray[newRobberIndex].surroundingNodes.forEach((node) => {
      if (node.colour !== undefined && node.colour !== this.state.currentPlayer.colour) {
        coloursOfPlayersOnThisTile.push(node.colour)
      }
    })
    if (coloursOfPlayersOnThisTile.length > 0) {
      let colourOfBlockedPlayer = ""
      let randPlayerIndex = undefined
      randPlayerIndex = Math.floor(Math.random() * coloursOfPlayersOnThisTile.length)
      colourOfBlockedPlayer = coloursOfPlayersOnThisTile[randPlayerIndex]
      players.forEach((player) => {
        if (player !== this.state.currentPlayer && player.colour === colourOfBlockedPlayer) {
          if (player.resourceCards.length > 0) {
            this.shuffle(player.resourceCards)
            const stolenCard = player.resourceCards[0]
            this.state.currentPlayer.resourceCards.push(stolenCard)
            player.resourceCards.splice(0,1)
          }
        }
      }) 
    }

    this.state.currentPlayer.knightPlayed = false
    this.setStateAndBroadcast({previousRobberIndex: current, robberIndex: newRobberIndex, sevenRolled: false, players: players})
  }

  colourRoads(clickedRoadIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedRoadsArray = this.state.roadsArray
    updatedRoadsArray[clickedRoadIndex].colour = colour
    updatedRoadsArray[clickedRoadIndex].builtYet = true
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.hasLongestRoad = this.checkForLongestRoadWinner(playerToUpdate)

    this.setStateAndBroadcast({roadsArray: updatedRoadsArray, currentPlayer: playerToUpdate})
  }

  colourSettlements(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasSettlement = true
    this.state.currentPlayer.settledNodes.push(updatedNodesArray[clickedNodeIndex])
    if(updatedNodesArray[clickedNodeIndex].port !== false && 
      !this.state.currentPlayer.portTypes.includes(updatedNodesArray[clickedNodeIndex].port)) {
      this.state.currentPlayer.portTypes.push(updatedNodesArray[clickedNodeIndex].port)
    }
    let playerToUpdate = this.state.currentPlayer
    this.setStateAndBroadcast({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate})
    console.log('clicked node', this.state.nodesArray[clickedNodeIndex])
  }

  winChecker() {
    let winner = false
    this.state.players.forEach((player) => {
      if (player.score >= 10) {
        winner = player.name
      }
    })
    return winner
  }

  rollDice() {
    let sevenRolled = false
    const numberRolled = dice.rollDice()
    if (numberRolled === 7) {
      sevenRolled = true
      this.state.players.forEach((player) => {
        if (player.resourceCards.length > 7) {
          this.state.game.giveHalfCardsAway(player)
        }
      })
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

    this.setStateAndBroadcast({players: this.state.players, showTurnButton: true, showRollDiceButton: false, sevenRolled: sevenRolled, numberRolled: numberRolled})
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

    newCurrentPlayer.numberRolled = "none"
    
    this.setStateAndBroadcast({currentPlayer: newCurrentPlayer, turn: turn, showTurnButton: false, showRollDiceButton: true})    
  }

  buildCity(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasCity = true
    updatedNodesArray[clickedNodeIndex].classOfNode = 'city'
    let playerToUpdate = this.state.currentPlayer
    this.setStateAndBroadcast({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate, classOfNode: 'city'})
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
        if (currentPlayer !== player && this.getLongestRoadCount(currentPlayer) <= this.getLongestRoadCount(player) 
          || this.getLongestRoadCount(currentPlayer) < 5) {
          returnStatement = false
        } 
        else if (currentPlayer !== player 
          && player.hasLongestRoad === true) {
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

  checkForBiggestArmyWinner(currentPlayer) {
    let returnStatement = true
    let playersBeingChecked = this.state.players
    if (!currentPlayer.hasBiggestArmy) {
      playersBeingChecked.forEach((player) => {
        if (currentPlayer !== player && currentPlayer.armySize <= player.armySize
          || currentPlayer.armySize < 3) {
          returnStatement = false
        }
        else if (currentPlayer !==  player
          && player.hasBiggestArmy === true) {
          player.hasBiggestArmy = false
          player.score -= 2
        }
      })
      if (returnStatement) {
        currentPlayer.score += 2
        currentPlayer.hasBiggestArmy = true
      }
    }
    this.setState({players: playersBeingChecked})
  }

  tradeWithBank(resourceToGive, resourceToReceive) {
    if (resourceToReceive === "Resource to receive") {
      return
    }

    let resourceAmount = 0
    this.state.currentPlayer.resourceCards.forEach((resource) => {
      if (resourceToGive === resource.type) {
        resourceAmount += 1
      }
    })

    if (this.state.currentPlayer.portTypes.includes(resourceToGive) 
      && resourceAmount >= 2) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < this.state.currentPlayer.resourceCards.length; j++) {
          if (this.state.currentPlayer.resourceCards[j].type === resourceToGive) {
            this.state.currentPlayer.resourceCards.splice(j, 1)
            break
          }
        }
      }
      this.state.game.giveResourceCardToPlayer(this.state.currentPlayer, resourceToReceive)
    }
    else if (this.state.currentPlayer.portTypes.includes("three_to_one")
      && resourceAmount >= 3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < this.state.currentPlayer.resourceCards.length; j++) {
          if (this.state.currentPlayer.resourceCards[j].type === resourceToGive) {
            this.state.currentPlayer.resourceCards.splice(j, 1)
            break
          }
        }
      }
      this.state.game.giveResourceCardToPlayer(this.state.currentPlayer, resourceToReceive)
    }
    else if (resourceAmount >= 4) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < this.state.currentPlayer.resourceCards.length; j++) {
          if (this.state.currentPlayer.resourceCards[j].type === resourceToGive) {
            this.state.currentPlayer.resourceCards.splice(j, 1)
            break
          }
        }
      }
      this.state.game.giveResourceCardToPlayer(this.state.currentPlayer, resourceToReceive)
    }
    // this.setState({currentPlayer: this.state.currentPlayer})

    this.setStateAndBroadcast({currentPlayer: this.state.currentPlayer})
  }

  getDevelopmentCard() {
    if (this.state.game.letPlayerBuyDevCard(this.state.currentPlayer)) {
      this.state.game.giveDevelopmentCardToPlayer(this.state.currentPlayer)
    }
    this.forceUpdate()
  }

  playDevCard(type) {
    for (let i = 0; i < this.state.currentPlayer.developmentCards.length; i++){
      if (this.state.currentPlayer.developmentCards[i].type === type) {
        this.state.currentPlayer.developmentCards.splice(i, 1)
        break
      }
    }
    if (type === "pointsCard") {
      let playerToUpdate = this.state.currentPlayer
      playerToUpdate.score += 1
      this.setStateAndBroadcast({currentPlayer: playerToUpdate})
    }
    if (type === "roadBuilding") {
      let playerToUpdate = this.state.currentPlayer
      playerToUpdate.freeRoadCount += 2
      this.setStateAndBroadcast({currentPlayer: playerToUpdate})
    }


    if (type === "knight") {
      let playerToUpdate = this.state.currentPlayer
      playerToUpdate.knightPlayed = true
      playerToUpdate.armySize += 1
      this.setStateAndBroadcast({currentPlayer: playerToUpdate})
      this.checkForBiggestArmyWinner(this.state.currentPlayer)
    }
  }

  playMonopoly(resourceType) {
    for (let i = 0; i < this.state.currentPlayer.developmentCards.length; i++){
      if (this.state.currentPlayer.developmentCards[i].type === "monopoly") {
        this.state.currentPlayer.developmentCards.splice(i, 1)
        break
      }
    }
    let playersToSteal = this.state.players
    let playerToUpdate = this.state.currentPlayer
    let totalCardsStolen = 0
    playersToSteal.forEach((player) => {
      if (player !== playerToUpdate && player.resourceCards.length > 0) {
        for (let i = (player.resourceCards.length - 1); i >= 0; i--) {
          if(player.resourceCards[i].type === resourceType) {
            player.resourceCards.splice(i, 1)
            this.state.game.giveResourceCardToPlayer(playerToUpdate, resourceType)
          }
        }
      }
    })
    this.setStateAndBroadcast({currentPlayer: playerToUpdate, players: playersToSteal})

  }

}

export default GameContainer