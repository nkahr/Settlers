import Tile from './tile'

class Tiles {
  constructor() {
    this.tilesArray = []
    this.resourcesArray = ["sheep", "sheep", "sheep", "sheep", "rock", "rock", "rock", "crop", "crop", "crop", "crop", "clay", "clay", "clay", "wood", "wood", "wood", "wood", "desert"]
    this.numbersArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11]
    this.xArray = [250 + 100, 363 + 100, 476 + 100, 532 + 100, 588 + 100, 532 + 100, 476 + 100, 363 + 100, 250 + 100, 194 + 100, 138 + 100, 194 + 100, 307 + 100, 420 + 100, 476 + 100, 420 + 100, 307 + 100, 250 + 100, 363 + 100]
    this.yArray = [500 -60, 500 -60, 500 -60, 403 -60, 306 -60, 209 -60, 112 -60, 112 -60, 112 -60, 209 -60, 306 -60, 403 -60, 403 -60, 403 -60, 306 -60, 209 -60, 209 -60, 306 -60, 306 -60]
    this.shuffle(this.resourcesArray)
    this.setup()
  }

  shuffle(array) {
    for (let i = array.length; i; i--) {
      let rand = Math.floor(Math.random() * i);
      [array[i - 1], array[rand]] = [array[rand], array[i - 1]];
    }
  }

  setup() {
    let indexOfDesert = this.resourcesArray.indexOf("desert")
    console.log('desert index', indexOfDesert)
    this.numbersArray.splice(indexOfDesert, 0, 0)
    for (let i = 0; i < this.resourcesArray.length; i++) {
      const tile = new Tile({
        number: this.numbersArray[i],
        resource: this.resourcesArray[i],
        coordinates: [ this.xArray[i], this.yArray[i]]
      })
      this.tilesArray.push(tile)
    }
    console.log('tiles', this.tilesArray)
  }
}

export default Tiles