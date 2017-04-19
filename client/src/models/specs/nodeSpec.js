import assert from 'assert';
import Node from '../node.js';
import Port from '../port.js';
import 'babel-polyfill'

describe("Node Tests", function(){

  var node;
  var port;

  beforeEach("Setup", function(){
    port = new Port({coordinates: [392, 598], type: "three_to_one", angle: 30})
    node = new Node({coordinates: [392, 598], port: port})
  })

  it("should have a port", function(){
    assert.equal(port, node.port)
  })

  it("should have coordinates", function(){
    assert.deepEqual([392, 598], node.coordinates)
  })

})