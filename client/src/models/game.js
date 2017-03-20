import Player from './player'
import Tiles from './tiles'
import Roads from './roads'
import Bank from './bank'

class Game {

  constructor(options) {
    this.bank = new Bank()
    this.players = []
    this.tilesArray = []
    this.roadsArray = []
    this.initialRobberIndex = undefined
    this.setup()
  }

  setup() {
    const player1 = new Player({name: "John", colour: "blue"})
    this.players.push(player1)
    const tiles = new Tiles()
    this.tilesArray = tiles.tilesArray
    this.initialRobberIndex = tiles.indexOfDesert
    const roads = new Roads()
    this.roadsArray = roads.roadsArray

    ///just for testing purposes 
    const wood = this.bank.generateResourceCard("wood")
    const wood1 = this.bank.generateResourceCard("wood")
    const wood2 = this.bank.generateResourceCard("wood")
    const wood3 = this.bank.generateResourceCard("wood")
    const clay = this.bank.generateResourceCard("clay")
    const clay1 = this.bank.generateResourceCard("clay")
    const clay2 = this.bank.generateResourceCard("clay")
    const clay3 = this.bank.generateResourceCard("clay")
    player1.resourceCards.push(wood)
    player1.resourceCards.push(wood1)
    player1.resourceCards.push(wood2)
    player1.resourceCards.push(wood3)
    player1.resourceCards.push(clay)
    player1.resourceCards.push(clay1)
    player1.resourceCards.push(clay2)
    player1.resourceCards.push(clay3)
    ////////////////////////////
  }

  giveResourceCardToPlayer(player, type) {
    const newResCard = this.bank.generateResourceCard(type)
    player.resourceCards.push(newResCard)
    console.log('card', newResCard)
  }

  letPlayerBuildRoad(player) {
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