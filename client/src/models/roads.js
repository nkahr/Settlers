import Road from './road'

class Roads {
  constructor() {
    this.roadsArray = []

    const xInc = 0
    this.xArray = 
      [345, 465, 585, 705, 
      285, 405, 525, 645, 765,
      225, 345, 465, 585, 705, 825,
      285, 405, 525, 645, 765,
      345, 465, 585, 705]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = 
      [500, 500, 500, 500, 
      396.5, 396.5, 396.5, 396.5, 396.5,
      293.5, 293.5, 293.5, 293.5, 293.5, 293.5,
      190.5,  190.5, 190.5, 190.5, 190.5,
      87.5, 87.5, 87.5, 87.5]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })
    // vertical 24 
    this.setup()
  }

  setup() {
    for (let i = 0; i < this.xArray.length; i++) {
      const road = new Road({
        coordinates: [ this.xArray[i], this.yArray[i]],
      })
      this.roadsArray.push(road)
    }
  }
}

export default Roads