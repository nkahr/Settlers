import React from 'react'
import {render} from 'react-dom'
import Tile from './components/Tile'

window.onload = () => {
  render(
    <div>
      <h1> SQUATTER ISLAND </h1>
      <Tile></Tile>
    </div>,
    document.getElementById('app')
    );

  }
