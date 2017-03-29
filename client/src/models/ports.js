import Port from './port'

class Ports {
  constructor(options) {
    this.portTypesArray = options["portTypesArray"]
    this.portsArray = []
    this.anglesArray = [30,-30,-30,-90,-150,-150,-210,-270,-270]

    const xInc = 0
    this.xArray = [380, 591, 771, 876, 771, 591, 380, 275, 275]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = [602, 602, 499, 318, 137, 34, 34, 215, 421]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })

    this.setup()
  }

  setup() {
    for (let i = 0; i < this.portTypesArray.length; i++) {
      const port = new Port({
        type: this.portTypesArray[i],
        coordinates: [ this.xArray[i], this.yArray[i]],
        angle: this.anglesArray[i]
      })
      this.portsArray.push(port)
    }
  }
}

export default Ports