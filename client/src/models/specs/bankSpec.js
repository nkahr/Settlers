
import assert from 'assert';
import Bank from '../bank.js';
import 'babel-polyfill'

describe("Bank Tests", function(){

  var bank;

  beforeEach("Setup", function(){
    bank = new Bank()
  })

  it("number of development cards should not be zero", function(){
    assert.notEqual(0, bank.developmentCards.length)
  })

})