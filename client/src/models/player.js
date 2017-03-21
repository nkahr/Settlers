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
  }


  addNextRoad(arrayOfRoads, lastNode) {
    const lastRoad = arrayOfRoads[arrayOfRoads.length - 1]
    arrayOfRoads = arrayOfRoads.slice()
      // console.log("last node", lastNode)
      let surroundingRoadsOwned = []
      lastNode.surroundingRoads.forEach((surroundingRoad) => {
        if (surroundingRoad.colour === this.colour) {
          surroundingRoadsOwned.push(surroundingRoad)
        }
      })
    // console.log("add next road")
    if (surroundingRoadsOwned.length === 1) {
      this.longestRoads.push(arrayOfRoads)
    } else {
      console.log("surrounding roads owned", surroundingRoadsOwned)
      surroundingRoadsOwned.forEach((surrRoad) => {
        console.log("surrRoad", surrRoad)
        console.log("array of roads", arrayOfRoads)
        if (surrRoad !== lastRoad) {
          arrayOfRoads.push(surrRoad)
          const nodesSurroundingNewRoad = surrRoad.surroundingNodes
          nodesSurroundingNewRoad.forEach((node) => {
            // console.log("node !== lastNode", node !== lastNode)
            if (node !== lastNode) {
              this.addNextRoad(arrayOfRoads, node)
            }
          })
        }
      })
    }
  }

  findLongestRoads() {
    // console.log("find longest roads")
    this.roadsBuilt.forEach((road) => {
      road.surroundingNodes.forEach((node) => {
        // console.log("node", node)

        let surroundingRoadsOwned = []
        node.surroundingRoads.forEach((surroundingRoad) => {
          if (surroundingRoad.colour === this.colour) {
            surroundingRoadsOwned.push(surroundingRoad)
          }
        })

        if (surroundingRoadsOwned.length === 1) {
          let arrayOfRoads = []
          arrayOfRoads.push(road)
          const nodes = road.surroundingNodes
          nodes.forEach((nodeInstance) => {
            if (nodeInstance !== node) {
              // console.log("this", this)
              this.addNextRoad(arrayOfRoads, nodeInstance)

            }
          })
        }
      })
    })
  }



}

export default Player