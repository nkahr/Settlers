import assert from 'assert';
import ResourceCard from '../ResourceCard.js';
import 'babel-polyfill'

describe("Resource card tests", function(){

  var card;

  beforeEach("Setup", function(){
    card = new ResourceCard("rock")
  })

  it("should have a type", function(){
    assert.equal("rock", card.type)
  })


})