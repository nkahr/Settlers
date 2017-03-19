import Tile from './tile'

class Tiles {
  constructor() {
    this.tilesArray = []
    this.resourcesArray = ["sheep", "sheep", "sheep", "sheep", "rock", "rock", "rock", "crop", "crop", "crop", "crop", "clay", "clay", "clay", "wood", "wood", "wood", "wood", "desert"]
    this.numbersArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11]
    this.xArray = [350, 470, 590, 650, 710, 650, 590, 470, 350, 290, 230, 290, 410, 530, 590, 530, 410, 350, 470]
    this.yArray = [440 + 25, 440 + 25, 440 + 25, 336.5 + 25, 233.5 + 25, 130.5 + 25, 27.5 + 25, 27.5 + 25, 27.5 + 25, 130.5 + 25, 233.5 + 25, 336.5 + 25, 336.5 + 25, 336.5 + 25, 233.5 + 25, 130.5 + 25, 130.5 + 25, 233.5 + 25, 233.5 + 25]
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