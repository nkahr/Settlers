import Player from './player'
import Tiles from './tiles'
import Roads from './roads'
import Bank from './bank'
import Nodes from './nodes'

class Game {

  constructor(options) {
    this.bank = new Bank()
    this.players = []
    this.tilesArray = []
    this.roadsArray = []
    this.initialRobberIndex = undefined
    this.nodesArray = []
    this.setup()
  }

  setup() {
    const player1 = new Player({name: "Craig", colour: "blue"})
    this.players.push(player1)
    const player2 = new Player({name: "Matthew", colour: "red"})
    this.players.push(player2)
    const player3 = new Player({name: "Beth", colour: "white"})
    this.players.push(player3)
    const player4 = new Player({name: "Simon", colour: "yellow"})
    this.players.push(player4)

    const tiles = new Tiles()
    this.tilesArray = tiles.tilesArray
    this.initialRobberIndex = tiles.indexOfDesert
    const roads = new Roads()
    this.roadsArray = roads.roadsArray
    const nodes = new Nodes()
    this.nodesArray = nodes.nodesArray

    ///just for testing purposes 
    const wood = this.bank.generateResourceCard("wood")
    const wood1 = this.bank.generateResourceCard("wood")
    const wood2 = this.bank.generateResourceCard("wood")
    const wood3 = this.bank.generateResourceCard("wood")
    const clay = this.bank.generateResourceCard("clay")
    const crop = this.bank.generateResourceCard("crop")
    const sheep = this.bank.generateResourceCard("sheep")
    const clay1 = this.bank.generateResourceCard("clay")
    const clay2 = this.bank.generateResourceCard("clay")
    const clay3 = this.bank.generateResourceCard("clay")
    player1.resourceCards.push(wood)
    player1.resourceCards.push(wood1)
    player1.resourceCards.push(wood2)
    player1.resourceCards.push(wood3)
    player1.resourceCards.push(clay)
    player1.resourceCards.push(sheep)
    player1.resourceCards.push(crop)
    player1.resourceCards.push(clay1)
    player1.resourceCards.push(clay2)
    player1.resourceCards.push(clay3)

    const wood5 = this.bank.generateResourceCard("wood")
    const clay5 = this.bank.generateResourceCard("clay")
    player2.resourceCards.push(wood5)
    player2.resourceCards.push(clay5)

    ////////////////////////////
  }

  giveResourceCardToPlayer(player, type) {
    const newResCard = this.bank.generateResourceCard(type)
    player.resourceCards.push(newResCard)
    console.log('card', newResCard)
  }

  letPlayerBuildRoad(player) {
    if (player.roadsAvailable === 0) {
      return false
    }
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
      player.roadsAvailable -= 1
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

  letPlayerBuildSettlement(player) {
    if (player.settlementsAvailable === 0) {
      return false
    }
    let woodIndex = undefined
    let clayIndex = undefined
    let cropIndex = undefined
    let sheepIndex = undefined
    let indices = []
    for (let i = 0; i < player.resourceCards.length; i++) {
      if (player.resourceCards[i].type === "wood") {
        woodIndex = i
      }
      if(player.resourceCards[i].type === "clay") {
        clayIndex = i
      }
      if(player.resourceCards[i].type === "crop") {
        cropIndex = i
      }
      if(player.resourceCards[i].type === "sheep") {
        sheepIndex = i
      }
    }
    indices.push(...[woodIndex, clayIndex, cropIndex, sheepIndex])
    indices = indices.filter((index) => { 
      return index != undefined 
    })

    if (indices.length === 4) {
      indices.sort((a, b) => {
        return b - a
      })

      indices.forEach((index) => {
        player.resourceCards.splice(index, 1)
      })

      player.settlementsAvailable -= 1

      return true
    }
    return false
  }

  letPlayerBuildCity(player) {
    if (player.citiesAvailable === 0) {
      return false
    }
    let cropCount = 0
    let rockCount = 0
    let indices = []
    for (let i = 0; i < player.resourceCards.length; i++) {
      if (player.resourceCards[i].type === "rock") {
        rockCount += 1
        if (rockCount <= 3) {
          indices.push(i)
        }
      }
      if(player.resourceCards[i].type === "crop") {
        cropCount += 1
        if (cropCount <= 2) {
          indices.push(i)
        }
      }
    }
    if (rockCount >= 3 && cropCount >= 2) {
      indices.sort((a, b) => {
        return b - a
      })
      indices.forEach((index) => {
        player.resourceCards.splice(index, 1)
      })
      player.citiesAvailable -= 1
      player.settlementsAvailable += 1
      return true
    }
    return false
  }

  radar(player, index) {
    const node = this.nodesArray[index]
    const nodeCoordinates = node.coordinates
    this.tilesArray.forEach((tile) => {
      const tileCoordinates = tile.coordinates
      if (Math.abs(nodeCoordinates[0] - (tileCoordinates[0] + 60)) < 100 && Math.abs(nodeCoordinates[1] - (tileCoordinates[1] + 69) ) < 100) {
        player.conqueredTiles.push(tile)
      }
    })
  }

}


export default Game