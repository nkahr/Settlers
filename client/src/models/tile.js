class Tile {
  constructor(options) {
    this.number = options["number"]
    this.resource = options["resource"]
    this.coordinates = options["coordinates"]
    this.hasRobber = options["hasRobber"]
    this.surroundingNodes = []
  }
}

export default Tile