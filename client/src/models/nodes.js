import Node from './node'

class Nodes {
  constructor() {
    this.nodesArray = []
    this.xArray = []
    this.yArray = []
    this.setup()
  }

  setup() {
    const xInc = 0
    this.xArray = [
      345
    ]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = [
      500
    ]
    this.yArray = this.yArray.map((item) => {
      return item + yInc
    })

    for (let i = 0; i < this.xArray.length; i++) {
      const node = new Node({
        coordinates: [ this.xArray[i], this.yArray[i]]
      })
      this.nodesArray.push(node)
    }
  }

}

export default Nodes