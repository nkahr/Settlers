
import assert from 'assert';
import Bank from '../bank.js';
import ResourceCard from '../resourceCard.js';
import 'babel-polyfill'

describe("Bank Tests", function(){
  
  var bank;

  beforeEach("Setup", function(){
    bank = new Bank()
  })

  it("number of development cards should not be zero", function(){
    assert.notEqual(0, bank.developmentCards.length)
  })

  it("should be able to generate resource card", function(){
    const sheep = new ResourceCard("sheep")
    assert.deepEqual(sheep, bank.generateResourceCard("sheep"))
  })

  it("should setup 15 knights", function(){
    let knightsCount = 0
    bank.developmentCards.forEach((card) => {
      if (card.type === "knight") {
        knightsCount += 1
      }
    })
    assert.equal(15, knightsCount)
  })

  it("should decrease development cards amount when generates one", function(){
    bank.generateDevelopmentCard()
    assert.equal(23, bank.developmentCards.length)
  })

})