import Tile from './tile'

class Tiles {
  constructor() {
    this.indexOfDesert
    this.tilesArray = []
    this.resourcesArray = ["sheep", "sheep", "sheep", "sheep", "rock", "rock", "rock", "crop", "crop", "crop", "crop", "clay", "clay", "clay", "wood", "wood", "wood", "wood", "desert"]

    this.numbersArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11]

    const xInc = 70
    this.xArray = [350, 470, 590, 650, 710, 650, 590, 470, 350, 290, 230, 290, 410, 530, 590, 530, 410, 350, 470]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = [465, 465, 465, 361.5, 258.5, 155.5, 52.5, 52.5, 52.5, 155.5, 258.5, 361.5, 361.5, 361.5, 258.5, 155.5, 155.5, 258.5, 258.5]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })

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
    this.numbersArray.splice(indexOfDesert, 0, 0)
    for (let i = 0; i < this.resourcesArray.length; i++) {
      const tile = new Tile({
        number: this.numbersArray[i],
        resource: this.resourcesArray[i],
        coordinates: [ this.xArray[i], this.yArray[i]], 
        hasRobber: false
      })
      this.tilesArray.push(tile)
    }
    this.tilesArray[indexOfDesert].hasRobber = true
    this.indexOfDesert = indexOfDesert
  }
}

export default Tiles