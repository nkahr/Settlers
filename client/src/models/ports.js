import Port from './port'

class Ports {
  constructor(options) {
    this.portTypesArray = options["portTypesArray"]
    this.portsArray = []
    this.anglesArray = [30,-30,-30,-90,-150,-150,-210,-270,-270]

    const xInc = 20
    this.xArray = [392, 579, 759, 853, 759, 579, 392, 298, 298]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = -20
    this.yArray = [589, 589, 486, 325, 164, 61, 61, 221, 428]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })

    this.setup()
  }

  setup() {
    for (let i = 0; i < this.portTypesArray.length; i++) {
      const port = new Port({
        type: this.portTypesArray[i],
        coordinates: [ this.xArray[i], this.yArray[i] ],
        angle: this.anglesArray[i]
      })
      this.portsArray.push(port)
    }
  }
}

export default Ports