class Player {
  constructor(options) {
    this.name = options["name"]
    this.colour = options["colour"]
    this.numberRolled = "none"
    this.resourceCards = []
    this.conqueredTiles = []
    this.roadsAvailable = 15
    this.settlementsAvailable = 5
    this.citiesAvailable = 4
    this.roadsBuilt = []
    this.score = 0
    this.developmentCardsBought = []
    this.developmentCardsPlayed = []
    this.freeSettlementCount = 2
    this.freeRoadCount = 2
    this.roadsAllowed = []
    this.longestRoads = []
    this.hasLongestRoad = false
  }


  addNextRoad(arrayOfRoads, lastNode) {
    const lastRoad = arrayOfRoads[arrayOfRoads.length - 1]
    arrayOfRoads = arrayOfRoads.slice()
      let surroundingRoadsOwned = []
      lastNode.surroundingRoads.forEach((surroundingRoad) => {
        if (surroundingRoad.colour === this.colour) {
          surroundingRoadsOwned.push(surroundingRoad)
        }
      })
    if (surroundingRoadsOwned.length === 1) {
      this.longestRoads.push(arrayOfRoads)
    } else {
      surroundingRoadsOwned.forEach((surrRoad) => {
        if (surrRoad !== lastRoad) {
          ///////////// CLONE ARRAY FOR CASE OF ROAD SPLIT ////////////
          let clonedArrayOfRoads = arrayOfRoads.slice()
          clonedArrayOfRoads.push(surrRoad)
          const nodesSurroundingNewRoad = surrRoad.surroundingNodes
          nodesSurroundingNewRoad.forEach((node) => {
            if (node !== lastNode) {
              this.addNextRoad(clonedArrayOfRoads, node)
            }
          })
        }
      })
    }
  }

  findLongestRoads() {
    this.roadsBuilt.forEach((road) => {
      road.surroundingNodes.forEach((node) => {
        let surroundingRoadsOwned = []
        node.surroundingRoads.forEach((surroundingRoad) => {
          if (surroundingRoad.colour === this.colour) {
            surroundingRoadsOwned.push(surroundingRoad)
          }
        })
        ///////////// CHECK FOR THE STARTING ROAD //////////////////
        if (surroundingRoadsOwned.length === 1) {
          let arrayOfRoads = []
          arrayOfRoads.push(road)
          const nodes = road.surroundingNodes
          nodes.forEach((nodeInstance) => {
            if (nodeInstance !== node) {
              this.addNextRoad(arrayOfRoads, nodeInstance)
            }
          })
        }
      })
    })
  }



}

export default Player