import assert from 'assert';
import Player from '../player.js';
import Game from '../game.js';
import 'babel-polyfill'

describe("Game Tests", function(){

  var player1
  var player2
  var player3
  var player4
  var game

  beforeEach("Setup", function(){
    player1 = new Player({name: "John", colour: "blue"})
    player2 = new Player({name: "John", colour: "red"})
    player3 = new Player({name: "John", colour: "yellow"})
    player4 = new Player({name: "John", colour: "white"})
    game = new Game({player1: player1, player2: player2, player3: player3, player4: player4})
  })

  it("should have 4 players", function(){
    assert.equal(4, game.players.length)
  })

  it("should have 19 tiles", function(){
    assert.equal(19, game.tilesArray.length)
  })

  it("should have 72 possible roads", function(){
    assert.equal(72, game.roadsArray.length)
  })

  it("should have 9 possible ports", function(){
    assert.equal(9, game.portsArray.length)
  })

  it("can give resource card to player", function(){
    game.giveResourceCardToPlayer(player1, "sheep")
    assert.equal(1, player1.resourceCards.length)
    assert.equal("sheep", player1.resourceCards[0].type)
  })

  it("can give multiple resource cards to player", function(){
    game.giveResourceCardToPlayer(player1, "sheep")
    game.giveResourceCardToPlayer(player1, "rock")
    assert.equal(2, player1.resourceCards.length)
  })

  it("can remove half a player's cards if player has 2 cards", function(){
    game.giveResourceCardToPlayer(player1, "sheep")
    game.giveResourceCardToPlayer(player1, "rock")
    game.giveHalfCardsAway(player1)
    assert.equal(1, player1.resourceCards.length)
  })

  it("giveHalfCardsAway removes 1 card when player has 3 cards", function(){
    game.giveResourceCardToPlayer(player1, "sheep")
    game.giveResourceCardToPlayer(player1, "rock")
    game.giveResourceCardToPlayer(player1, "wood")
    game.giveHalfCardsAway(player1)
    assert.equal(2, player1.resourceCards.length)
  })

  it("giveHalfCardsAway removes 2 card when player has 4 cards", function(){
    game.giveResourceCardToPlayer(player1, "sheep")
    game.giveResourceCardToPlayer(player1, "rock")
    game.giveResourceCardToPlayer(player1, "wood")
    game.giveResourceCardToPlayer(player1, "wood")
    game.giveHalfCardsAway(player1)
    assert.equal(2, player1.resourceCards.length)
  })

  it("can give development card to player", function(){
    game.giveDevelopmentCardToPlayer(player1)
    assert.equal(1, player1.developmentCards.length)
  })

  it("can give multiple development cards to player", function(){
    game.giveDevelopmentCardToPlayer(player1)
    game.giveDevelopmentCardToPlayer(player1)
    assert.equal(2, player1.developmentCards.length)
  })

  it("let player build road if they don't have resources and freeRoadCount is greater than zero", function(){
    assert.equal(2, player1.freeRoadCount)
    assert.equal(true, game.letPlayerBuildRoad(player1))
  })

  it("freeRoadCount decreases when first road is built", function(){
    game.letPlayerBuildRoad(player1)
    assert.equal(1, player1.freeRoadCount)
  })

  it("roadsAvailable decreases when road is built", function(){
    game.letPlayerBuildRoad(player1)
    assert.equal(14, player1.roadsAvailable)
  })

  it("don't let player build road if they don't have resources", function(){
    player1.freeRoadCount = 0 
    assert.equal(0, player1.freeRoadCount)
    assert.equal(0, player1.resourceCards.length)
    assert.equal(false, game.letPlayerBuildRoad(player1))
  })

  it("let player build road if they have wood and clay", function(){
    player1.freeRoadCount = 0 
    game.giveResourceCardToPlayer(player1, "wood")    
    game.giveResourceCardToPlayer(player1, "clay")    
    assert.equal(true, game.letPlayerBuildRoad(player1))
  })

  it("freeSettlementCount decreases when first settlement is built", function(){
    game.letPlayerBuildSettlement(player1)
    assert.equal(1, player1.freeSettlementCount)
  })

  it("can only build two free settlements", function(){
    assert.equal(true, game.letPlayerBuildSettlement(player1))
    assert.equal(true, game.letPlayerBuildSettlement(player1))
    assert.equal(false, game.letPlayerBuildSettlement(player1))
  })

  it("don't let player build settlement if they don't have resources", function(){
    player1.freeSettlementCount = 0 
    assert.equal(0, player1.freeSettlementCount)
    assert.equal(0, player1.resourceCards.length)
    assert.equal(false, game.letPlayerBuildSettlement(player1))
  })

  it("settlementsAvailable decreases when settlement is built", function(){
    game.letPlayerBuildSettlement(player1)
    assert.equal(4, player1.settlementsAvailable)
  })

  it("let player build settlement if they have wood, clay, crop and sheep", function(){
    player1.freeSettlementCount = 0 
    game.giveResourceCardToPlayer(player1, "wood")    
    game.giveResourceCardToPlayer(player1, "clay")    
    game.giveResourceCardToPlayer(player1, "crop")    
    game.giveResourceCardToPlayer(player1, "sheep")    
    assert.equal(true, game.letPlayerBuildSettlement(player1))
  })

  it("resources are removed after building settlement", function(){
    player1.freeSettlementCount = 0 
    game.giveResourceCardToPlayer(player1, "wood")    
    game.giveResourceCardToPlayer(player1, "clay")    
    game.giveResourceCardToPlayer(player1, "crop")    
    game.giveResourceCardToPlayer(player1, "sheep")    
    game.letPlayerBuildSettlement(player1)
    assert.equal(0, player1.resourceCards.length)
  })

})