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
      turn: newGame.turn, 
      showTurnButton: true, 
      showRollDiceButton: false,
      sevenRolled: false,
      numberRolled: undefined
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.winChecker = this.winChecker.bind(this)
    this.getLongestRoadCount = this.getLongestRoadCount.bind(this)
    this.checkForBiggestArmyWinner = this.checkForBiggestArmyWinner.bind(this)
    this.tradeWithBank = this.tradeWithBank.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.getDevelopmentCard = this.getDevelopmentCard.bind(this)
    this.playDevCard = this.playDevCard.bind(this)
    this.updateDataFromSockets = this.updateDataFromSockets.bind(this)
    this.setStateAndBroadcast = this.setStateAndBroadcast.bind(this)
    this.playMonopoly = this.playMonopoly.bind(this)
    this.playYearOfPlenty = this.playYearOfPlenty.bind(this)
    this.handleRoadClick = this.handleRoadClick.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
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


      screen = 
        <div>
          <OpponentsComponent 
            players={this.state.players}
            currentPlayer={this.state.currentPlayer}
            numberRolled={this.state.numberRolled}
          /> 

          <BoardComponent    
            tiles={tiles} 
            roads={this.state.roadsArray} 
            nodes={this.state.nodesArray} 
            ports={this.state.portsArray}
            moveRobber={this.moveRobber} 
            handleRoadClick = {this.handleRoadClick}
            handleNodeClick = {this.handleNodeClick}
            currentPlayer={this.state.currentPlayer}
          /> 
          
          <PlayerStatsComponent 
            currentPlayer={this.state.currentPlayer} 
            turn={this.state.turn}
            nextTurn={this.nextTurn}
            showTurnButton={this.state.showTurnButton}
            showRollDiceButton={this.state.showRollDiceButton}
            rollDice={this.rollDice}
            tradeWithBank={this.tradeWithBank}
            getDevelopmentCard={this.getDevelopmentCard}
            playDevCard={this.playDevCard}
            playMonopoly={this.playMonopoly}
            playYearOfPlenty={this.playYearOfPlenty}
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

  handleRoadClick(road) {
    const turn = this.state.turn
    if (turn < 4 && this.state.currentPlayer.roadsAvailable === 14) {
      return
    }
    if (turn > 3 && turn < 8 && this.state.currentPlayer.roadsAvailable === 13) {
      return
    }
    if (!this.state.currentPlayer.roadsAllowed.includes(road.index)) {
      return
    }
    if (!this.state.game.rolled && this.state.turn >= 8) {
      return
    }
    if (this.state.sevenRolled) {
      return
    }

    if (!road.builtYet && this.state.game.letPlayerBuildRoad(this.state.currentPlayer)) {
      this.state.currentPlayer.roadsBuilt.push(road)
      this.state.currentPlayer.buildRoad(road.index, this.state.roadsArray, this.state.nodesArray)
      this.state.game.checkForLongestRoadWinner(this.state.currentPlayer)
      this.state.game.mapNextPossibleRoads(this.state.currentPlayer, road.index)
      this.setStateAndBroadcast({roadsArray: this.state.roadsArray, currentPlayer: this.state.currentPlayer, players: this.state.players})
    }
  }

  handleNodeClick(node) {
    if (this.state.turn < 4 && this.state.currentPlayer.settlementsAvailable === 4) {
      return
    }
    if (this.state.turn > 3 && this.state.turn < 8 && this.state.currentPlayer.settlementsAvailable === 3) {
      return
    }
    if (!this.state.game.rolled && this.state.turn >= 8) {
      return
    }
    if (this.state.sevenRolled) {
      return
    }

    ///////////// CHECKING FOR SURROUNDING ROADS OF CURRENT PLAYER ///////////////////////
    if (this.state.turn >= 8) {
      let matchingRoads = []
      node.surroundingRoads.forEach((roadIndex) => {
        const road = this.state.roadsArray[roadIndex]
        if (road.colour === this.state.currentPlayer.colour) {
          matchingRoads.push(road)
        }
      })
      if (matchingRoads.length === 0) {
        return
      } 
    }
    
    const clickedNodeIndex = node.index
    if (!node.allowConstruction) {
      return 
    }

    if (!node.hasSettlement && !node.hasCity) {
      if (this.state.game.letPlayerBuildSettlement(this.state.currentPlayer)) {
        this.state.currentPlayer.buildSettlement(node.index, this.state.nodesArray)
        this.state.game.radar(this.state.currentPlayer, node.index, this.state.turn)
        this.state.game.mapConstructionAround(this.state.currentPlayer, node.index)
      }
    } else if (node.hasSettlement && !node.hasCity) {
      if (this.state.game.letPlayerBuildCity(this.state.currentPlayer)) {
        this.state.currentPlayer.buildCity(node.index, this.state.nodesArray)
        this.state.game.radar(this.state.currentPlayer, node.index, this.state.turn)
      }
    } 

    this.setStateAndBroadcast({currentPlayer: this.state.currentPlayer, nodesArray: this.state.nodesArray})
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
    if (this.state.currentPlayer.knightPlayed) {
      return
    }

    let game = this.state.game
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
    game.rolled = true
    this.setStateAndBroadcast({players: this.state.players, showTurnButton: true, showRollDiceButton: false, sevenRolled: sevenRolled, numberRolled: numberRolled, game: game})
  }

  nextTurn() {
    if (this.state.currentPlayer.knightPlayed
      || this.state.currentPlayer.monopolyPlayed
      || this.state.currentPlayer.yearOfPlentyPlayed) {
      return
    }
    if (this.state.sevenRolled) {
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
    newCurrentPlayer.monopolyPlayed = false
    newCurrentPlayer.knightPlayed = false
    newCurrentPlayer.yearOfPlentyPlayed = false
    newCurrentPlayer.roadBuildingPlayed = false

    if (turn >= 8) {
      newCurrentPlayer.freeRoadCount = 0
    }
    
    let game = this.state.game
    game.rolled = false
    game.developmentCardAllowed = true

    this.state.game.updateTurn(turn)
    
    this.setStateAndBroadcast({currentPlayer: newCurrentPlayer, turn: turn, showTurnButton: false, showRollDiceButton: true, game: game})    
  }

  getLongestRoadCount(player) {
    let longestRoad = 0
    player.longestRoads.forEach((road) => {
      if (road.length > longestRoad) {
        longestRoad = road.length
      }
    })
    player.longestRoad = longestRoad
    this.setStateAndBroadcast({currentPlayer: player})
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
    this.setStateAndBroadcast({players: playersBeingChecked})
  }

  tradeWithBank(resourceToGive, resourceToReceive) {
    if (resourceToReceive === "Resource to receive"
      || this.state.turn < 8
      || !this.state.game.rolled
      || this.state.sevenRolled) {
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
    this.setStateAndBroadcast({currentPlayer: this.state.currentPlayer})
  }

  getDevelopmentCard() {
    if (this.state.sevenRolled) {
      return
    }
    if (this.state.game.letPlayerBuyDevCard(this.state.currentPlayer)) {
      this.state.game.giveDevelopmentCardToPlayer(this.state.currentPlayer, this.state.turn)
    }
    this.forceUpdate()
  }

  playDevCard(type) {
    if (this.state.sevenRolled) {
      return
    }
    let playAllowed = false
    for (let i = 0; i < this.state.currentPlayer.developmentCards.length; i++){
      ////////// CHECK WHETHER DEV CARD WAS BOUGHT IN PREVIOUS ROUNDS ////////////////////
      if (this.state.currentPlayer.developmentCards[i].type === type 
        && this.state.currentPlayer.developmentCards[i].buyingTurn < this.state.turn
        || this.state.currentPlayer.developmentCards[i].type === type
        && type === "pointsCard") {
        ////////// CHECK WHETHER DICE WAS ROLLED OR CARD IS KNIGHT OR CARD IS POINTSCARD ////////////////////
        if (type === "knight" &&  this.state.game.developmentCardAllowed 
          || this.state.game.rolled === true &&  this.state.game.developmentCardAllowed
          || type === "pointsCard") {
          this.state.currentPlayer.developmentCards.splice(i, 1)
          playAllowed = true
          break
        }
      }
    }
    if (playAllowed) {
      let playerToUpdate = this.state.currentPlayer
      let gameToUpdate = this.state.game
      if (type === "pointsCard") {
        playerToUpdate.score += 1
        this.setStateAndBroadcast({currentPlayer: playerToUpdate})
      }
      if (type === "roadBuilding") {
        playerToUpdate.freeRoadCount += 2
        playerToUpdate.roadBuildingPlayed = true
        gameToUpdate.developmentCardAllowed = false
        this.setStateAndBroadcast({currentPlayer: playerToUpdate, game: gameToUpdate})
      }
      if (type === "knight") {
        playerToUpdate.knightPlayed = true
        playerToUpdate.armySize += 1
        gameToUpdate.developmentCardAllowed = false
        this.setStateAndBroadcast({currentPlayer: playerToUpdate, game: gameToUpdate})
        this.checkForBiggestArmyWinner(this.state.currentPlayer)
      }
      if (type === "yearOfPlenty") {
        playerToUpdate.yearOfPlentyPlayed = true
        gameToUpdate.developmentCardAllowed = false
        this.setStateAndBroadcast({currentPlayer: playerToUpdate, game: gameToUpdate})
      }
      if (type === "monopoly") {
        playerToUpdate.monopolyPlayed = true
        gameToUpdate.developmentCardAllowed = false
        this.setStateAndBroadcast({currentPlayer: playerToUpdate, game: gameToUpdate})
      }
    }
  }

  playMonopoly(resourceType) {
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
    playerToUpdate.monopolyPlayed = false
    this.setStateAndBroadcast({currentPlayer: playerToUpdate, players: playersToSteal})
  }

  playYearOfPlenty(firstResource, secondResource) {
    let playerToUpdate = this.state.currentPlayer
    this.state.game.giveResourceCardToPlayer(playerToUpdate, firstResource)
    this.state.game.giveResourceCardToPlayer(playerToUpdate, secondResource)
    playerToUpdate.yearOfPlentyPlayed = false
    this.setStateAndBroadcast({currentPlayer: playerToUpdate})
  }

}

export default GameContainer