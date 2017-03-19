import Tile from './tile'

class Tiles {
  constructor() {
    this.tilesArray = []
    this.resourcesArray = ["sheep", "sheep", "sheep", "sheep", "rock", "rock", "rock", "crop", "crop", "crop", "crop", "clay", "clay", "clay", "wood", "wood", "wood", "wood", "desert"]
    this.numbersArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11]
    this.xArray = [250, 363, 476, 532, 588, 532, 476, 363, 250, 194, 138, 194, 307, 420, 476, 420, 307, 250, 363]
    this.yArray = [500, 500, 500, 403, 306, 209, 112, 112, 112, 209, 306, 403, 403, 403, 306, 209, 209, 306, 306]
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
    for (let i = 0; i < this.resourcesArray.length; i++) {
      const tile = new Tile({
        resource: this.resourcesArray[i],
        number: this.numbersArray[i],
        coordinates: [ this.xArray[i], this.yArray[i]]
      })
      this.tilesArray.push(tile)
    }
  }
}

export default Tiles