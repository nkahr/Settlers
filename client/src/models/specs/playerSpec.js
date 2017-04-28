import assert from 'assert';
import Player from '../player.js';
import 'babel-polyfill'

describe("Player Tests", function(){

  var player;

  beforeEach("Setup", function(){
    player = new Player({name: "John", colour: "blue"})
  })

  it("should have a name", function(){
    assert.equal("John", player.name)
  })

  it("should have a colour", function(){
    assert.equal("blue", player.colour)
  })

  it("shouldn't have any resource cards", function(){
    assert.deepEqual([], player.resourceCards)
  })

  it("shouldn't have any development cards", function(){
    assert.deepEqual([], player.developmentCards)
  })

  it("score should be zero", function(){
    assert.equal(0, player.score)
  })

  it("should have 15 roads available", function(){
    assert.equal(15, player.roadsAvailable)
  })

  it("should have 5 settlements available", function(){
    assert.equal(5, player.settlementsAvailable)
  })

  it("should have 4 cities available", function(){
    assert.equal(4, player.citiesAvailable)
  })

  it("should start with army size 0", function(){
    assert.equal(0, player.armySize)
  })

  it("should start with false value of knight played", function(){
    assert.equal(false, player.knightPlayed)
  })

  it("should start with false value of biggest army", function(){
    assert.equal(false, player.hasBiggestArmy)
  })

  it("should start with longest road 0", function(){
    assert.equal(0, player.longestRoad)
  })
})