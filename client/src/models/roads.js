import Road from './road'

class Roads {
  constructor() {
    this.roadsArray = []

    const xInc = 70
    this.xArray = 
      [
      345, 465, 585, 705, 
      285, 405, 525, 645, 765,
      225, 345, 465, 585, 705, 825,
      285, 405, 525, 645, 765,
      345, 465, 585, 705,

      375, 495, 615, 
      315, 435, 555, 675,
      255, 375, 495, 615, 735,
      315, 435, 555, 675, 795,
      375, 495, 615, 735,
      435, 555, 675,

      434, 554, 674,
      374, 494, 614, 734,
      314, 434, 554, 674, 794,
      254, 374, 494, 614, 734,
      314, 434, 554, 674,
      374, 494, 614
      ]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = 
      [
      500, 500, 500, 500, 
      396.5, 396.5, 396.5, 396.5, 396.5,
      293.5, 293.5, 293.5, 293.5, 293.5, 293.5,
      190.5, 190.5, 190.5, 190.5, 190.5,
      87.5, 87.5, 87.5, 87.5,

      550, 550, 550,
      446.5, 446.5, 446.5, 446.5,
      343.5, 343.5, 343.5, 343.5, 343.5,
      240.5, 240.5, 240.5, 240.5, 240.5,
      137.5, 137.5, 137.5, 137.5,
      34.5, 34.5, 34.5,

      550, 550, 550,
      447, 447, 447, 447,
      343.5, 343.5, 343.5, 343.5, 343.5,
      240.5, 240.5, 240.5, 240.5, 240.5,
      137.5, 137.5, 137.5, 137.5,
      34.5, 34.5, 34.5
      ]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })
    this.setup()
  }

  setup() {
    for (let i = 0; i < 24; i++) {
      const road = new Road({
        coordinates: [ this.xArray[i], this.yArray[i]],
        angle: 0,
        index: i
      })
      this.roadsArray.push(road)
    }
    for (let i = 24; i < 48; i++) {
      const road = new Road({
        coordinates: [ this.xArray[i], this.yArray[i]],
        angle: -60,
        index: i
      })
      this.roadsArray.push(road)
    }
    for (let i = 48; i < 72; i++) {
      const road = new Road({
        coordinates: [ this.xArray[i], this.yArray[i]],
        angle: 60,
        index: i
      })
      this.roadsArray.push(road)
    }
  }
}

export default Roads