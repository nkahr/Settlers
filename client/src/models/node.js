class Node {
  constructor(options) {
    this.coordinates = options["coordinates"]
    this.surroundingTiles = []
    this.colour = undefined
  }
}

export default Node