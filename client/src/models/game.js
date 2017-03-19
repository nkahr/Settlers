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


    ///just for testing purposes 
    const wood = this.bank.generateResourceCard("wood")
    const clay = this.bank.generateResourceCard("clay")
    player1.resourceCards.push(wood)
    player1.resourceCards.push(clay)
    ////////////////////////////
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
    // this doesn't always work - if the first splice changes the indices, the second splice may delete the wrong card!!
    // FIXED BY ADDING IF GUARD CHECKING HIGHER INDEX
    if (woodIndex !== undefined && clayIndex !== undefined) {
      if (clayIndex > woodIndex) {
        player.resourceCards.splice(clayIndex, 1)
        player.resourceCards.splice(woodIndex, 1)
        return true
      } else {
        player.resourceCards.splice(woodIndex, 1)
        player.resourceCards.splice(clayIndex, 1)
        return true
      }
      
    }
    return false
  }

}


export default Game