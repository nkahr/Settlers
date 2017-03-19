import ResourceCard from './resourceCard'

class Bank {
  constructor() {
    this.developmentCards = []
  }

  generateResourceCard(type) {
    const resCard = new ResourceCard(type)
    return resCard
  }
}

export default Bank