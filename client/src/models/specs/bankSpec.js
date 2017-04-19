
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

})