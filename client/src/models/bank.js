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

  generateDevelopmentCard() {
    const devCard = this.developmentCards[0]
    return devCard
  }

  setup() {
    for (let i = 0; i < 10; i++) {
      const newDevCard = new DevelopmentCard({type: "pointsCard"}) 
      this.developmentCards.push(newDevCard)
    }
  }
}

export default Bank