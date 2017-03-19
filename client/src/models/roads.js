import Road from './road'

class Roads {
  constructor() {
    this.roadsArray = []

    const xInc = 0
    this.xArray = [350, 470, 590, 650, 710, 650, 590, 470, 350, 290, 230, 290, 410, 530, 590, 530, 410, 350, 470]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = [465, 465, 465, 361.5, 258.5, 155.5, 52.5, 52.5, 52.5, 155.5, 258.5, 361.5, 361.5, 361.5, 258.5, 155.5, 155.5, 258.5, 258.5]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })
    
    this.setup()
  }

  setup() {
    for (let i = 0; i < this.xArray.length; i++) {
      const road = new Road({
        coordinates: [ this.xArray[i], this.yArray[i]],
        colour: "white"
      })
      this.roadsArray.push(road)
    }
  }
}

export default Roads