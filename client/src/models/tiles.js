import Tile from './tile'

class Tiles {
  constructor() {
    this.tilesArray = []
    this.setup()
  }

  setup() {
    const tile = new Tile({
      resource: "black", 
      number: 9, 
      coordinates: [500, 500]
    })
    this.tilesArray.push(tile)
  }
}

export default Tiles