import Player from './player'
import Tiles from './tiles'
import Bank from './bank'

class Game {

  constructor(options) {
    this.bank = new Bank()
    this.players = []
    this.tilesArray = []
    this.initialRobberIndex = undefined
    this.setup()
  }

  setup() {
    const player1 = new Player({name: "John", colour: "blue"})
    this.players.push(player1)
    const tiles = new Tiles()
    this.tilesArray = tiles.tilesArray
    this.initialRobberIndex = tiles.indexOfDesert
  }

  giveResourceCardToPlayer(player, type) {
    const newResCard = this.bank.generateResourceCard(type)
    player.resourceCards.push(newResCard)
    console.log('card', newResCard)
  }

  letPlayerBuildRoad(player, position) {
    let woodIndex = undefined
    let clayIndex = undefined
    for (let i = 0; i < player.resourceCards.length; i++) {
      if (player.resourceCards[i].type === "wood") {
        woodIndex = i
      }
      if(player.resourceCards[i].type === "clay") {
        clayIndex = i
      }
    }
    if (woodIndex && clayIndex) {
      resourceCards.splice(woodIndex, 1)
      resourceCards.splice(clayIndex, 1)
      return true
    }
    return false
  }

}

// giveResourceCardToPlayer(this.players[0], "wood")

export default Game