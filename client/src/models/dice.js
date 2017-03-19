class Dice {
  constructor() {
  }

  rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1  
    const dice2 = Math.floor(Math.random() * 6) + 1  
    return dice1 + dice2 
  }
}

export default Dice