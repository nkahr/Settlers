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
    this.built = []
    this.score = 0
    this.developmentCardsBought = []
    this.developmentCardsPlayed = []
    this.freeSettlementCount = 2
    this.freeRoadCount = 2
    this.roadsAllowed = []
  }

}

export default Player