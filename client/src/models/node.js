class Node {
  constructor(options) {
    this.index = options["index"]
    this.coordinates = options["coordinates"]
    this.port = options["port"]
    this.colour = undefined
    this.classOfNode = 'node'
    this.hasSettlement = false
    this.hasCity = false
    this.allowConstruction = true
    this.surroundingRoads = []
  }
}

export default Node