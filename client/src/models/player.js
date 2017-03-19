class Player {
  constructor(options) {
    this.name = options["name"]
    this.colour = options["colour"]
    this.resourceCards = []
    this.roadsAvailable = 15
    this.settlementsAvailable = 5
    this.citiesAvailable = 4
    this.built = []
    this.score = 0
    this.developmentCardsBought = []
    this.developmentCardsPlayed = []
  }

}

export default Player