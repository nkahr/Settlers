class Player {
  constructor(options) {
    this.name = options["name"]
    this.colour = options["colour"]
    this.numberRolled = "none"
    this.resourceCards = []
    this.developmentCards = []
    this.conqueredTiles = []
    this.roadsAvailable = 15
    this.settlementsAvailable = 5
    this.citiesAvailable = 4
    this.roadsBuilt = []
    this.score = 0
    this.freeSettlementCount = 2
    this.freeRoadCount = 2
    this.roadsAllowed = []
    this.longestRoads = []
    this.hasLongestRoad = false
    this.settledNodes = []
    this.portTypes = []
    this.knightPlayed = false
    this.yearOfPlentyPlayed = false
    this.monopolyPlayed = false
    this.roadBuildingPlayed = false
    this.armySize = 0
    this.hasBiggestArmy = false
    this.longestRoad = 0
  }

  addNextRoad(arrayOfRoads, lastNode, allRoads, allNodes) {
    const lastRoad = arrayOfRoads[arrayOfRoads.length - 1]
    arrayOfRoads = arrayOfRoads.slice()
      let surroundingRoadsOwned = []
      lastNode.surroundingRoads.forEach((surroundingRoadIndex) => {
        const surroundingRoad = allRoads[surroundingRoadIndex]
        if (surroundingRoad.colour === this.colour) {
          surroundingRoadsOwned.push(surroundingRoad)
        }
      })
    if (surroundingRoadsOwned.length === 1) {
      this.longestRoads.push(arrayOfRoads)
    } else {
      surroundingRoadsOwned.forEach((surrRoad) => {
        if (surrRoad !== lastRoad) {
          if (!arrayOfRoads.includes(surrRoad)) {
            ///////////// CLONE ARRAY FOR CASE OF ROAD SPLIT ////////////
            let clonedArrayOfRoads = arrayOfRoads.slice()
            clonedArrayOfRoads.push(surrRoad)
            const nodeIndicesSurroundingNewRoad = surrRoad.surroundingNodes
            let nodesSurroundingNewRoad = []
            nodeIndicesSurroundingNewRoad.forEach((nodeIndex) => {
              nodesSurroundingNewRoad.push(allNodes[nodeIndex])
            })
            nodesSurroundingNewRoad.forEach((node) => {
              if (node !== lastNode) {
                this.addNextRoad(clonedArrayOfRoads, node, allRoads, allNodes)
              }
            })
          }
          else {
            this.longestRoads.push(arrayOfRoads)
          }
        }
      })
    }
  }

  findLongestRoads(allRoads, allNodes) {
    this.roadsBuilt.forEach((road) => {
      road.surroundingNodes.forEach((nodeIndex) => {
        const node = allNodes[nodeIndex]
        let surroundingRoadsOwned = []
        node.surroundingRoads.forEach((surroundingRoadIndex) => {
          const surroundingRoad = allRoads[surroundingRoadIndex]
          if (surroundingRoad.colour === this.colour) {
            surroundingRoadsOwned.push(surroundingRoad)
          }
        })
        ///////////// CHECK FOR THE STARTING ROAD //////////////////
        if (surroundingRoadsOwned.length >= 1) {
          let arrayOfRoads = []
          arrayOfRoads.push(road)
          const nodeIndices = road.surroundingNodes
          let nodes = []
          nodeIndices.forEach((nodeIndex) => {
            nodes.push(allNodes[nodeIndex])
          })
          nodes.forEach((nodeInstance) => {
            if (nodeInstance !== node) {
              this.addNextRoad(arrayOfRoads, nodeInstance, allRoads, allNodes)
            }
          })
        }
      })
    })
  }

  getLongestRoadCount() {
    let longestRoad = 0
    this.longestRoads.forEach((road) => {
      if (road.length > longestRoad) {
        longestRoad = road.length
      }
    })
    this.longestRoad = longestRoad
  }

  buildRoad(roadIndex, arrayOfRoads, arrayOfNodes) {
    arrayOfRoads[roadIndex].colour = this.colour
    arrayOfRoads[roadIndex].builtYet = true
    this.findLongestRoads(arrayOfRoads, arrayOfNodes)
    this.getLongestRoadCount()
  }

  buildSettlement(nodeIndex, nodesArray) {
    nodesArray[nodeIndex].colour = this.colour
    nodesArray[nodeIndex].hasSettlement = true
    this.settledNodes.push(nodesArray[nodeIndex])
    if(nodesArray[nodeIndex].port !== false && 
      !this.portTypes.includes(nodesArray[nodeIndex].port)) {
      this.portTypes.push(nodesArray[nodeIndex].port)
    }
  }

  buildCity(nodeIndex, nodesArray) {
    nodesArray[nodeIndex].colour = this.colour
    nodesArray[nodeIndex].hasCity = true
    nodesArray[nodeIndex].classOfNode = 'city'
  }

}

export default Player