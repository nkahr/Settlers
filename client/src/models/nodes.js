import Node from './node'

class Nodes {
  constructor(options) {
    this.portTypesArray = options["portTypesArray"]
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

    const yInc = 20
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
      ///////////// 1 ///////////////////
      if (this.xArray[i] === (338 + xInc)  && this.yArray[i] === (542 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[0]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (397 + xInc) && this.yArray[i] === (575 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[0]
        })
        this.nodesArray.push(node)
      }
      ///////////// 2 ///////////////////
      else if (this.xArray[i] === (517 + xInc) && this.yArray[i] === (575 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[1]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (575 + xInc) && this.yArray[i] === (542 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[1]
        })
        this.nodesArray.push(node)
      }
      ///////////// 3 ///////////////////
      else if (this.xArray[i] === (698 + xInc) && this.yArray[i] === (473 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[2]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (757 + xInc) && this.yArray[i] === (440 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[2]
        })
        this.nodesArray.push(node)
      }
      ///////////// 4 ///////////////////
      else if (this.xArray[i] === (818 + xInc) && this.yArray[i] === (336 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[3]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (818 + xInc) && this.yArray[i] === (267 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[3]
        })
        this.nodesArray.push(node)
      }
      ///////////// 5 ///////////////////
      else if (this.xArray[i] === (757 + xInc) && this.yArray[i] === (165 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[4]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (698 + xInc) && this.yArray[i] === (130 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[4]
        })
        this.nodesArray.push(node)
      }
      ///////////// 6 ///////////////////
      else if (this.xArray[i] === (578 + xInc) && this.yArray[i] === (61 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[5]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (517 + xInc) && this.yArray[i] === (28 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[5]
        })
        this.nodesArray.push(node)
      }
      ///////////// 7 ///////////////////
      else if (this.xArray[i] === (397 + xInc) && this.yArray[i] === (28 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[6]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (338 + xInc) && this.yArray[i] === (61 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[6]
        })
        this.nodesArray.push(node)
      }
      ///////////// 8 ///////////////////
      else if (this.xArray[i] === (277 + xInc) && this.yArray[i] === (165 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[7]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (277 + xInc) && this.yArray[i] === (234 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[7]
        })
        this.nodesArray.push(node)
      }
      ///////////// 9 ///////////////////
      else if (this.xArray[i] === (277 + xInc) && this.yArray[i] === (371 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[8]
        })
        this.nodesArray.push(node)
      }
      else if (this.xArray[i] === (277 + xInc) && this.yArray[i] === (440 + yInc)) {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: this.portTypesArray[8]
        })
        this.nodesArray.push(node)
      }
      else {
        const node = new Node({
          coordinates: [ this.xArray[i], this.yArray[i] ],
          port: false
        })
        this.nodesArray.push(node)
      }
    }
    console.log('fresh nodesArray', this.nodesArray)
  }

}

export default Nodes