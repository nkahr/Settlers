import assert from 'assert';
import Port from '../port.js';
import 'babel-polyfill'

describe("Port Tests", function(){

  var port;

  beforeEach("Setup", function(){
    port = new Port({coordinates: [392, 598], type: "three_to_one", angle: 30})
  })

  it("should have coordinates", function(){
    assert.deepEqual([392, 598], port.coordinates)
  })

  it("should have type", function(){
    assert.deepEqual("three_to_one", port.type)
  })

  it("should have angle", function(){
    assert.deepEqual(30, port.angle)
  })

})