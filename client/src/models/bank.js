import ResourceCard from './resourceCard'
import DevelopmentCard from './developmentCard'

class Bank {
  constructor() {
    this.developmentCards = []
    this.setup()
  }

  generateResourceCard(type) {
    const resCard = new ResourceCard(type)
    return resCard
  }

  generateDevelopmentCard () {
    const length = this.developmentCards.length
    const randomIndex = Math.floor(Math.random() * length)  
    const devCard = this.developmentCards[randomIndex]
    return devCard
  }

  setup() {
    for (let i = 0; i < 10; i++) {
      const newDevCard = new DevelopmentCard({type: "pointsCard"}) 
      this.developmentCards.push(newDevCard)
    }
    for (let i = 0; i < 10; i++) {
      const newDevCard = new DevelopmentCard({type: "roadBuilding"}) 
      this.developmentCards.push(newDevCard)
    }
  }
}

export default Bank