class Road {
  constructor(options) {
    this.coordinates = options["coordinates"], 
    this.colour = options["colour"]
    this.angle = options["angle"]
    this.builtYet = false
    this.index = options["index"]
  }
}

export default Road