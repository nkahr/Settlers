import Node from './node'

class Nodes {
  constructor() {
    this.nodesArray = []
    this.xArray = []
    this.yArray = []
    this.setup()
  }

  setup() {
    const xInc = 50
    this.xArray = [
      397, 517, 637,
      338, 458, 578, 698,
      338, 458, 578, 698,
      277, 397, 517, 637, 757,
      277, 397, 517, 637, 757,
      218, 338, 458, 578, 698, 818,
      218, 338, 458, 578, 698, 818,
      277, 397, 517, 637, 757,
      277, 397, 517, 637, 757,
      338, 458, 578, 698,
      338, 458, 578, 698,
      397, 517, 637
    ]
    this.xArray = this.xArray.map((item) => {
      return item + xInc
    })

    const yInc = 0
    this.yArray = [
      575, 575, 575,
      542, 542, 542, 542,
      473, 473, 473, 473,
      440, 440, 440, 440, 440,
      371, 371, 371, 371, 371,
      336, 336, 336, 336, 336, 336,
      267, 267, 267, 267, 267, 267,
      234, 234, 234, 234, 234,
      165, 165, 165, 165, 165,
      130, 130, 130, 130,
      61, 61, 61, 61,
      28, 28, 28
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