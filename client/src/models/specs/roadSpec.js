import assert from 'assert';
import Road from '../road.js';
import 'babel-polyfill'

describe("Road Tests", function(){

  var road;

  beforeEach("Setup", function(){
    road = new Road({coordinates: [345, 500], colour: "blue", angle: 0, index: 0})
  })

  it("should have coordinates", function(){
    assert.deepEqual([345, 500], road.coordinates)
  })

  it("should have angle", function(){
    assert.equal(0, road.angle)
  })

  it("should have colour", function(){
    assert.equal("blue", road.colour)
  })

  it("should have index", function(){
    assert.equal(0, road.index)
  })


})